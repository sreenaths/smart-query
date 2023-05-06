import axios from "axios"

export interface QueryDetails {
  type: string;
  queryText: string;
  connectorId: string;
  databaseName: string;
}

interface QueryResponse {
  response: string;
  steps: string;
}

export const submitQuery = async (details: QueryDetails): Promise<QueryResponse | null> => {
  const resp = await axios.post('/api/query', {
    "query_text": details.queryText,
    "type": details.type,
    "connector_id": details.connectorId,
    "db_name": details.databaseName
  });
  return resp.data;
}
