import { createContext, useContext } from "react";

import axios from "axios"

interface Connector {
  id: string;
  name: string;
  url: string;
  databases: string[];
}
interface Configs {
  llm: string;
  connectors: Connector[]
}

export const ConfigsContext = createContext<Configs | null>(null);
export const useConfigsContext = () => useContext(ConfigsContext) as Configs;

export const loadConfigs = async (): Promise<Configs | null> => {
  const resp = await axios.get('/api/configs');
  return resp.data.configs;
}
