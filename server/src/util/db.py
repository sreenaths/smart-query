from langchain.sql_database import SQLDatabase

from sqlalchemy import text

from core.config import configs

import dialects.impala.sqlalchemy
from dialects.hive.sqlalchemy_hive import register_dialect
register_dialect()

def create_db(connector_id, db_name):
    connector_configs = configs["connectors"][connector_id]
    url = connector_configs["url"]

    sample_rows = configs["llm"].get("sample_rows", 3)
    return SQLDatabase.from_uri(f'{url}/{db_name}', sample_rows_in_table_info = sample_rows)

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

SQL_RESULT_LIMIT=10
def run_sql(connector_id, db_name, sql):
    db = create_db(connector_id, db_name)
    columns = []
    rows = []
    with db._engine.connect() as con:
        rs = con.execute(text(sql))
        columns = list(rs.keys())
        for row in rs.fetchmany(SQL_RESULT_LIMIT):
            rows.append(list(row))
    return columns, rows
