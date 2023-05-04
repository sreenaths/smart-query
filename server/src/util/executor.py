from langchain.agents import create_sql_agent
from langchain.llms import OpenAI
from langchain.agents.agent_toolkits import SQLDatabaseToolkit

from core.config import configs, env

from .db import create_db

def create_llm():
    llm = configs["llm"].lower()
    if llm == "openai":
        return OpenAI(temperature=0,  openai_api_key=env["LLM_API_KEY"])
    raise Exception("Invalid llm configuration.")

llm = create_llm()

executor_cache = {}
def executor_factory(connector_id, db_name):
    cache_key = f'{connector_id}:{db_name}'

    if cache_key in executor_cache:
        return executor_cache[cache_key]

    db = create_db(connector_id, db_name)

    toolkit = SQLDatabaseToolkit(db=db, llm=llm)
    agent_executor = create_sql_agent(
        llm=llm,
        toolkit=toolkit,
        verbose=True
    )

    executor_cache[cache_key] = agent_executor
    return agent_executor
