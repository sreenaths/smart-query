#
# Tested with Python 3.6.15
#
# Requirements:
# pip install 'pyhive[hive]'
# pip install sqlalchemy
#

import sqlalchemy
from sqlalchemy.engine import create_engine

hive_server_host = "sree-demo-3.sree-demo.root.hwx.site"
engine = create_engine(f'hive://{hive_server_host}:10000/model_store')

conn = engine.connect()
ResultProxy  = conn.execute("SELECT * FROM customers LIMIT 3")

print(ResultProxy.fetchall())
