from langchain.agents import create_sql_agent
from langchain.llms import OpenAI
from langchain.sql_database import SQLDatabase
from langchain.agents.agent_toolkits import SQLDatabaseToolkit

def create_llm(configs, env):
    llm = configs["llm"].lower()
    if llm == "openai":
        return OpenAI(temperature=0,  openai_api_key=env["LLM_API_KEY"])
    raise Exception("Invalid llm configuration.")

def create_executor(configs, env):
    llm = create_llm(configs, env)
    db = SQLDatabase.from_uri(configs["sql_db_uri"])

    toolkit = SQLDatabaseToolkit(db=db, llm=llm)
    agent_executor = create_sql_agent(
        llm=llm,
        toolkit=toolkit,
        verbose=True
    )

    return agent_executor
