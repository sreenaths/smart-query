import falcon

from util.executor import create_executor
from core.config import configs, env
from core.stdout import trap_stdout, get_stdout

executor = create_executor(configs, env)

class QueryResource:
    def on_post(self, req, resp):
        query = req.media["query_text"]

        trap = trap_stdout()
        response = executor.run(query)
        steps = get_stdout(trap)

        resp.media = {
            "response": response,
            "steps": steps
        }

app = falcon.App()
app.add_route('/api/query', QueryResource())
