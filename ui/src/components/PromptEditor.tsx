import React, { useState, KeyboardEventHandler } from "react";
import styled from "styled-components";

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LinearProgress from '@mui/material/LinearProgress';

import { HandlerStatus, useStateHandler } from "../util/handler";
import { submitQuery } from "../service/query";
import ProcessSteps from "./ProcessSteps";
import { useParams } from "react-router-dom";
import Copier from "./Copier";
import { Skeleton } from "@mui/material";

const Container = styled.div`
  padding: 20px 25px;

  textarea.prompt-editor {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 350px;
    border-radius: 4px;
    padding: 10px;

    resize: none;
  }

  .tab-panel {
    padding: 24px 0;
  }

  .response-panel, .thought-process-panel {
    width: 100%;
    min-height: 50px;
    background-color: #EEE;
    border-radius: 4px;
    margin: 0;

    padding: 15px;
    font-size: 1.2em;
    box-sizing: border-box;

    overflow-x: auto;
    white-space: pre-wrap;
  }

  .processing-anim {
    line-height: 30px;
  }
`;

const ButtonPanel = styled.div`
  padding-top: 10px;
  text-align: right;
`;

interface Props {
  type: string;
}
function PromptEditor({ type }: Props) {
  const [value, setValue] = React.useState('1');
  const handleTabChange = (_: any, newValue: string) => setValue(newValue);

  const { connectorId, databaseName } = useParams();
  const [queryText, setQueryText] = useState("");
  const [resp, handler, setResponse] = useStateHandler(null, submitQuery);

  const onSubmit = () => {
    setResponse(null);
    if(connectorId && databaseName) {
      handler.call({
        queryText,
        type,
        connectorId,
        databaseName
      });
    }
  };
  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if(e.code === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      onSubmit();
    }
  }

  const isLoading = handler.status === HandlerStatus.IN_PROGRESS;
  return (
    <Container>
      <textarea className="prompt-editor" value={queryText}
          onChange={e => setQueryText(e.target.value)} onKeyDown={onKeyDown}></textarea>
      <ButtonPanel>
        <LoadingButton variant="contained" loading={isLoading} disabled={queryText === ""} onClick={onSubmit}>
          Submit
        </LoadingButton>
      </ButtonPanel>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Response" value="1" />
            <Tab label="Thought Process" value="2"/>
          </TabList>
        </Box>
        <TabPanel value="1" className="tab-panel">
          {isLoading ? <Skeleton variant="rounded" height={50} /> : (
            <pre className="response-panel">
              {(type === "generate" && resp) ? <Copier text={resp?.response} /> : resp?.response}
            </pre>
          )}
        </TabPanel>
        <TabPanel value="2" className="tab-panel">
          {isLoading ? <Skeleton variant="rounded" height={50} /> : (
            <pre className="thought-process-panel">
              {resp && <ProcessSteps steps={resp.steps}/>}
            </pre>
          )}
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default PromptEditor;
