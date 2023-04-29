import React from "react";

import styled from "styled-components";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Container = styled.div`
  padding: 20px 25px;

  textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 350px;

    resize: none;
    border-radius: 4px;
  }

  .tab-panel {
    padding: 24px 0;
  }

  .response-panel, .thought-process-panel {
    width: 100%;
    min-height: 50px;
    background-color: #EEE;
    border-radius: 4px;

    padding: 10px 15px;
    font-size: 1.2em;
    box-sizing: border-box;
  }
`;

const ButtonPanel = styled.div`
  padding-top: 10px;
  text-align: right;
`;

function PromptEditor() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container>
      <textarea className="prompt-editor"></textarea>
      <ButtonPanel>
        <Button variant="contained">Submit</Button>
      </ButtonPanel>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Response" value="1" />
            <Tab label="Thought Process" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" className="tab-panel">
          <pre className="response-panel">

          </pre>
        </TabPanel>
        <TabPanel value="2" className="tab-panel">
          <pre className="thought-process-panel">
            Thought Process
          </pre>
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default PromptEditor;
