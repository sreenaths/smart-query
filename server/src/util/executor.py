from langchain.agents import create_sql_agent
from langchain.llms import OpenAI
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from pyformatting import optional_format

from .prompts import SUFFIX

from core.config import configs, env

from .db import create_db

def create_llm():
    llm = configs["llm"].lower()
    if llm == "openai":
        return OpenAI(temperature=0,  openai_api_key=env["LLM_API_KEY"])
    raise Exception("Invalid llm configuration.")

llm = create_llm()
def executor_factory(type, connector_id, db_name):
    db = create_db(connector_id, db_name)

    toolkit = SQLDatabaseToolkit(db=db, llm=llm)
    suffix = optional_format(SUFFIX[type], dialect=db.dialect, db_name=db_name)
    agent_executor = create_sql_agent(
        llm=llm,
        suffix=suffix,
        toolkit=toolkit,
        verbose=True
    )

    return agent_executor
