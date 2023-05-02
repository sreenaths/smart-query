import React from 'react';
import styled from 'styled-components';

import PromptEditor from './components/PromptEditor';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Container = styled.div`
  .tab-panel {
    padding: 24px 0;
  }
  .erd-panel {
    text-align: center;
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

const MainTabs = () => {
  const [value, setValue] = React.useState('1');
  const handleTabChange = (_: any, newValue: string) => setValue(newValue);

  return (
    <Container>
      <TabContext value={value}>
        <Box className="tab-box">
          <TabList onChange={handleTabChange}>
            <Tab label="Ask" value="1" />
            <Tab label="Generate" value="2" disabled/>
            <Tab label="Summarise" value="3" disabled/>
            <Tab label="Database Erd" value="4" className='right-tab'/>
          </TabList>
        </Box>

        <TabPanel value="1" className="tab-panel">
          <PromptEditor />
        </TabPanel>
        <TabPanel value="4" className="tab-panel">
          <div className='erd-panel'>
            <img src="erd_image.png" alt="DB Erd" />
          </div>
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default MainTabs;
