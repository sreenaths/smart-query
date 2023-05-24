from fastapi import FastAPI, Body
from fastapi import FastAPI
from fastapi.responses import JSONResponse

from core.config import configs

from util.db import get_schema, run_sql
from util.executor import executor_factory
from core.stdout import trap_stdout, get_stdout

app = FastAPI()

@app.exception_handler(Exception)
async def validation_exception_handler(request, err):
    return JSONResponse(status_code=500, content={"error": str(err)})

@app.post('/api/query')
def on_query(payload: dict = Body(...)):
    query_text = payload["query_text"]
    action = payload["action"]
    connector_id = payload["connector_id"]
    db_name = payload["db_name"]

    trap = trap_stdout()
    executor = executor_factory(action, connector_id, db_name)
    try:
        response = executor.run(query_text)
        steps = get_stdout(trap)
        return {
            "response": response,
            "steps": steps
        }
    except Exception as err:
        steps = get_stdout(trap)
        return JSONResponse(status_code=500, content={
            "error": str(err),
            "steps": steps
        })

@app.get('/api/schema')
def on_schema(connector_id, db_name):
    schema = get_schema(connector_id, db_name)
    return {
        "schema": schema
    }

@app.post('/api/run')
def on_run(payload: dict = Body(...)):
    connector_id = payload["connector_id"]
    db_name = payload["db_name"]
    sql = payload["sql"]

    columns, rows = run_sql(connector_id, db_name, sql)
    return {
        "columns": columns,
        "rows": rows
    }

@app.get('/api/configs')
def on_configs():
    return {
      "configs": configs
    }
