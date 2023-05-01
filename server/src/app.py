import falcon

from io import StringIO
import sys

from util.executor import create_executor
from core.config import configs, env

executor = create_executor(configs, env)

class QueryResource:
    def on_post(self, req, resp):
        query = req.media["query_text"]

        temp_out = StringIO()
        sys.stdout = temp_out

        response = executor.run(query)

        sys.stdout = sys.__stdout__
        thoughts = temp_out.getvalue().strip()

        resp.media = {
            "response": response,
            "thoughts": thoughts
        }

app = falcon.App()
app.add_route('/api/query', QueryResource())
