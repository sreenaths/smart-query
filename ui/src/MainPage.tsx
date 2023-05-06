import React from 'react';
import styled from 'styled-components';

import PromptEditor from './components/PromptEditor';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppHeader from './components/AppHeader';
import DBSchema from './components/DBSchema';
import TabPanel from './components/TabPanel';

const Container = styled.div`
  .tab-panel {
    padding: 24px 0;
  }
  .tab-box {
    border-bottom: 1px solid silver;
    padding: 0 25px;
  }
  .right-tab {
    position: absolute;
    right: 0px;
  }
`;

const MainPage = () => {
  const [value, setValue] = React.useState('1');
  const handleTabChange = (_: any, newValue: string) => setValue(newValue);

  return (
    <>
      <AppHeader />
      <Container>
        <Box className="tab-box">
          <Tabs value={value} onChange={handleTabChange}>
            <Tab label="Ask" value="1" />
            <Tab label="Generate" value="2"/>
            <Tab label="Summarise" value="3"/>
            <Tab label="Schema" value="4" className='right-tab'/>
          </Tabs>
        </Box>

        <TabPanel currentValue={value} value="1">
          <PromptEditor type="ask" />
        </TabPanel>
        <TabPanel currentValue={value} value="2">
          <PromptEditor type="generate" />
        </TabPanel>
        <TabPanel currentValue={value} value="3">
          <PromptEditor type="summarise" />
        </TabPanel>
        <TabPanel currentValue={value} value="4">
          <DBSchema />
        </TabPanel>
      </Container>
    </>
  );
};

export default MainPage;
