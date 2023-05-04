import React from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';

import MainPage from './MainPage';
import { useConfigsContext } from './service/configs';

const Redirector = () => {
  const configs = useConfigsContext();

  const { connectorId } = useParams();

  // Take first connector if not available in params
  const connector = connectorId ? configs.connectors[connectorId]: Object.values(configs.connectors)[0];
  if(!connector) {
    throw new Error("Invalid configuration: Connectors not found!");
  }

  // Take first DB if not available in params
  const firstDb = connector.databases[0];
  return (
    <Navigate to={`/${connector.id}/${firstDb}`} />
  );
};

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:connectorId/:databaseName" element={<MainPage />} />
        <Route path="/:connectorId" element={<Redirector />} />
        <Route path="/" element={<Redirector />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
