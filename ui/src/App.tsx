import React from 'react';
import styled from 'styled-components';

import AppHeader from './components/AppHeader';
import PromptEditor from './components/PromptEditor';

const Body = styled.div``;

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Body>
        <PromptEditor />
      </Body>
    </div>
  );
}

export default App;
