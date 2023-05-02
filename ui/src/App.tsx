import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import AppHeader from './components/AppHeader';
import MainTabs from './MainTabs';
import ErrorMessage from './components/ErrorMessage';

function App() {
  return (
    <section className="App">
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <AppHeader />
        <MainTabs />
      </ErrorBoundary>
    </section>
  );
}

export default App;
