import falcon

from core.config import configs

from util.executor import executor_factory
from core.stdout import trap_stdout, get_stdout

class QueryResource:
    def on_post(self, req, resp):
        query_text = req.media["query_text"]
        connector_id = req.media["connector_id"]
        db_name = req.media["db_name"]

        trap = trap_stdout()
        executor = executor_factory(connector_id, db_name)
        response = executor.run(query_text)
        steps = get_stdout(trap)

        resp.media = {
            "response": response,
            "steps": steps
        }

app = falcon.App()
app.add_route('/api/query', QueryResource())
