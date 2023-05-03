import React from 'react';

import LinearProgress from '@mui/material/LinearProgress';

import AppHeader from './components/AppHeader';
import MainTabs from './MainTabs';
import { HandlerStatus, useStateHandler } from './util/handler';
import { ConfigsContext, loadConfigs } from './service/configs';

function App() {
  const [configs, handler] = useStateHandler(null, loadConfigs, []);

  if(handler.status === HandlerStatus.IN_PROGRESS) {
    return (
      <LinearProgress />
    );
  }

  return (
    <ConfigsContext.Provider value={configs}>
      <section className="App">
        <AppHeader />
        <MainTabs />
      </section>
    </ConfigsContext.Provider>
  );
}

export default App;
