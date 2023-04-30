import falcon

from lib import data

class QuoteResource:
    def on_get(self, req, resp):
        """Handle GET requests."""
        resp.media = data

app = falcon.App()
app.add_route('/api/test', QuoteResource())
