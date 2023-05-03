from langchain.agents import create_sql_agent
from langchain.llms import OpenAI
from langchain.sql_database import SQLDatabase
from langchain.agents.agent_toolkits import SQLDatabaseToolkit

from core.config import configs, env

from dialects.hive.sqlalchemy_hive import register_dialect
register_dialect()

import dialects.impala.sqlalchemy

def create_llm():
    llm = configs["llm"].lower()
    if llm == "openai":
        return OpenAI(temperature=0,  openai_api_key=env["LLM_API_KEY"])
    raise Exception("Invalid llm configuration.")

def create_db(dialect, db_name):
    dialect_configs = configs["dialects"][dialect]
    db_uri = dialect_configs["db_uri"]

    return SQLDatabase.from_uri(f'{db_uri}/{db_name}')

llm = create_llm()
executor_cache = {}
def executor_factory(dialect, db_name):
    cache_key = f'{dialect}:{db_name}'

    if cache_key in executor_cache:
        return executor_cache[cache_key]

    db = create_db(dialect, db_name)

    toolkit = SQLDatabaseToolkit(db=db, llm=llm)
    agent_executor = create_sql_agent(
        llm=llm,
        toolkit=toolkit,
        verbose=True
    )

    executor_cache[cache_key] = agent_executor
    return agent_executor
