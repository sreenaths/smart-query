import falcon

from core.config import configs

from util.executor import executor_factory
from core.stdout import trap_stdout, get_stdout

class QueryResource:
    def on_post(self, req, resp):
        query = req.media["query_text"]
        dialect = req.media["dialect"]
        db_name = req.media["db_name"]

        trap = trap_stdout()
        executor = executor_factory(dialect, db_name)
        response = executor.run(query)
        steps = get_stdout(trap)

        resp.media = {
            "response": response,
            "steps": steps
        }

app = falcon.App()
app.add_route('/api/query', QueryResource())
