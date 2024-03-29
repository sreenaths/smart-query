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
            <Tab label="Optimize" value="4" disabled/>
            <Tab label="Schema" value="100" className='right-tab'/>
          </Tabs>
        </Box>

        <TabPanel currentValue={value} value="1">
          <PromptEditor action="ask" />
        </TabPanel>
        <TabPanel currentValue={value} value="2">
          <PromptEditor action="generate" />
        </TabPanel>
        <TabPanel currentValue={value} value="3">
          <PromptEditor action="summarise" />
        </TabPanel>
        <TabPanel currentValue={value} value="4">
          <PromptEditor action="optimize" />
        </TabPanel>
        <TabPanel currentValue={value} value="100">
          <DBSchema />
        </TabPanel>
      </Container>
    </>
  );
};

export default MainPage;
