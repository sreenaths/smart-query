#
# After activating the server, run this script to test Hive connection
#

from sqlalchemy import text
from sqlalchemy.engine import create_engine

from dialects.sqlalchemy_hive import register_dialect
register_dialect()

# Change the following based on your tyest setup
db_dialect = "hive+hs2"
db_server_host = "sree-demo-3.sree-demo.root.hwx.site"
db_port = "10000"
db_name = "model_store"

engine = create_engine(f'{db_dialect}://{db_server_host}:{db_port}/{db_name}')
conn = engine.connect()
ResultProxy  = conn.execute(text("SELECT * FROM customers LIMIT 3"))

print(ResultProxy.fetchall())
