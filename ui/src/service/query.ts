import axios from "axios"

interface QueryResponse {
  response: string;
  steps: string;
}
export const submitQuery = async (queryText: string): Promise<QueryResponse | null> => {
  if(!queryText) {
    return null;
  }

  const resp = await axios.post('/api/query', {
    "query_text": queryText,
    "connector_id": "impala",
    "db_name": "model_store"
  });
  return resp.data;
}
