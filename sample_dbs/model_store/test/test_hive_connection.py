#
# After activating the server, run this script to test Hive connection
#

from sqlalchemy import text
from sqlalchemy.engine import create_engine
from sqlalchemy.dialects import registry

registry.register("hs2", "dialects.sqlalchemy_hive", "HiveDialect")
registry.register("hs2.http", "dialects.sqlalchemy_hive", "HiveHTTPDialect")
registry.register("hs2.https", "dialects.sqlalchemy_hive", "HiveHTTPSDialect")

hive_server_host = "sree-demo-3.sree-demo.root.hwx.site"
engine = create_engine(f'hs2://{hive_server_host}:10000/model_store')

conn = engine.connect()
ResultProxy  = conn.execute(text("SELECT * FROM customers LIMIT 3"))

print(ResultProxy.fetchall())
