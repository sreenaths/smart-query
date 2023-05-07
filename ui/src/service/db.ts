import axios from "axios";

interface TableSchema {
  tableName: string;
  ddl: string;
  columns: string[];
  sampleData: string[][];
}

const extractTableSchema = (table: any) => {
  const tableName = table['table_name'];
  let [ddl, data] = table['details'].split("/*");

  data = data.split("\n").slice(2, -1);
  const columns = data.shift();

  return {
    tableName,
    ddl: ddl.trim(),
    columns: columns.split("\t"),
    sampleData: data.map((d: string) => d.split("\t"))
  };
};

export const loadSchema = async (connectorId: string, databaseName: string): Promise<TableSchema[]> => {
  const resp = await axios.get('/api/schema', {
    params: {
      "connector_id": connectorId,
      "db_name": databaseName
    }
  });

  return resp.data.schema.map(extractTableSchema);
};

interface SqlResult {
  columns: string[];
  rows: string[][];
}
export const runSql = async (connectorId: string, databaseName: string, sql: string): Promise<SqlResult> => {
  const resp = await axios.post('/api/run', {
    "connector_id": connectorId,
    "db_name": databaseName,
    "sql": sql
  });

  return resp.data;
};
