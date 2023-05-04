from langchain.sql_database import SQLDatabase

from core.config import configs

import dialects.impala.sqlalchemy
from dialects.hive.sqlalchemy_hive import register_dialect
register_dialect()

def create_db(connector_id, db_name):
    connector_configs = configs["connectors"][connector_id]
    url = connector_configs["url"]

    return SQLDatabase.from_uri(f'{url}/{db_name}')

def get_schema(connector_id, db_name):
    db = create_db(connector_id, db_name)
    table_names = db.get_usable_table_names()

    schema = []
    for table_name in table_names:
      try:
        details = db.get_table_info_no_throw([table_name]).strip()
      except Exception as e:
        details = f'Error: loading details of {table_name} failed.\n\n{e}'
        print(details)

      schema.append({
        "table_name": table_name,
        "details": details
      })
    return schema
