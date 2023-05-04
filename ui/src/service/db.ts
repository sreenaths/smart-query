import axios from "axios";

interface TableSchema {
  table_name: string;
  details: string;
}

type Schema = TableSchema[];

export const loadSchema = async (connectorId: string, databaseName: string): Promise<Schema> => {
  const resp = await axios.get('/api/schema', {
    params: {
      "connector_id": connectorId,
      "db_name": databaseName
    }
  });
  return resp.data.schema;
};
