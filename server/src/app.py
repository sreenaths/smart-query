from fastapi import FastAPI, Body
from fastapi import FastAPI
from fastapi.responses import JSONResponse

from core.config import configs

from util.db import get_schema
from util.executor import executor_factory
from core.stdout import trap_stdout, get_stdout

app = FastAPI()

@app.exception_handler(Exception)
async def validation_exception_handler(request, err):
    return JSONResponse(status_code=500, content={"error": f"{err.__traceback__}"})

@app.post('/api/query')
def on_query(payload: dict = Body(...)):
    query_text = payload["query_text"]
    type = payload["type"]
    connector_id = payload["connector_id"]
    db_name = payload["db_name"]

    trap = trap_stdout()
    executor = executor_factory(type, connector_id, db_name)
    response = executor.run(query_text)
    steps = get_stdout(trap)

    return {
        "response": response,
        "steps": steps
    }

@app.get('/api/schema')
def on_schema(connector_id, db_name):
    schema = get_schema(connector_id, db_name)
    return {
        "schema": schema
    }

@app.get('/api/configs')
def on_configs():
    return {
      "configs": configs
    }
