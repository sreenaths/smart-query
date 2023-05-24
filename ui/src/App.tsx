import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import LinearProgress from '@mui/material/LinearProgress';

import { HandlerStatus, useStateHandler } from './util/handler';
import { ConfigsContext, loadConfigs } from './service/configs';
import AppRoutes from './AppRoutes';
import { ErrorMessageFallback } from './components/ErrorMessage';

function App() {
  const [configs, handler] = useStateHandler(null, loadConfigs, []);

  if(handler.status === HandlerStatus.IDLE || handler.status === HandlerStatus.IN_PROGRESS) {
    return (
      <LinearProgress />
    );
  } else if (!configs) {
    throw new Error("Invalid configurations. Please check the server logs.");
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorMessageFallback}>
      <ConfigsContext.Provider value={configs}>
        <section className="App">
          <AppRoutes />
        </section>
      </ConfigsContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
