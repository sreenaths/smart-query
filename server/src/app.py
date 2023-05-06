import falcon

from core.config import configs

from util.db import get_schema
from util.executor import executor_factory
from core.stdout import trap_stdout, get_stdout

class QueryResource:
    def on_post(self, req, resp):
        query_text = req.media["query_text"]
        type = req.media["type"]
        connector_id = req.media["connector_id"]
        db_name = req.media["db_name"]

        trap = trap_stdout()
        executor = executor_factory(type, connector_id, db_name)
        response = executor.run(query_text)
        steps = get_stdout(trap)

        resp.media = {
            "response": response,
            "steps": steps
        }

class SchemaResource:
    def on_get(self, req, resp):
        schema = get_schema(req.params["connector_id"], req.params["db_name"])
        resp.media = {
            "schema": schema
        }

class ConfigsResource:
    def on_get(self, req, resp):
        resp.media = {
            "configs": configs
        }

app = falcon.App()
app.add_route('/api/query', QueryResource())
app.add_route('/api/schema', SchemaResource())
app.add_route('/api/configs', ConfigsResource())
