import falcon

from util.executor import create_executor
from core.config import configs, env

executor = create_executor(configs, env)

class QueryResource:
    def on_post(self, req, resp):
        query = req.media["query_text"]
        response = executor.run(query)
        resp.media = {
            "response": response
        }

app = falcon.App()
app.add_route('/api/query', QueryResource())
