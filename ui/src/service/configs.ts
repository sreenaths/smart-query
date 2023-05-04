import { createContext, useContext } from "react";

import axios from "axios"
import { KV } from "../common/types";

export interface Connector {
  id: string;
  name: string;
  url: string;
  databases: string[];
}
export interface Configs {
  llm: string;
  connectors: KV<Connector>
}

export const ConfigsContext = createContext<Configs | null>(null);
export const useConfigsContext = () => useContext(ConfigsContext) as Configs;

export const loadConfigs = async (): Promise<Configs | null> => {
  const resp = await axios.get('/api/configs');
  return resp.data.configs;
}
