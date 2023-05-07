import React, { useState, KeyboardEventHandler } from "react";
import styled from "styled-components";

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import { HandlerStatus, useStateHandler } from "../util/handler";
import { submitQuery } from "../service/query";
import ProcessSteps from "./ProcessSteps";
import { useParams } from "react-router-dom";
import Copier from "./Copier";
import { Skeleton, Tabs } from "@mui/material";
import SqlRunner from "./SqlRunner";
import TabPanel from "./TabPanel";

const Container = styled.div`
  padding: 0px 25px 20px 25px;

  textarea.prompt-editor {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 350px;
    border-radius: 4px;
    padding: 10px;

    resize: none;
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

  .limit-label {
    font-size: 0.7em;
    font-style: italic;
    text-align: right;
    height: 0px;
  }
`;

const ButtonPanel = styled.div`
  padding-top: 10px;
  text-align: right;
`;

interface Props {
  action: string;
}
function PromptEditor({ action }: Props) {
  const [tab, setTab] = React.useState('1');
  const handleTabChange = (_: any, newValue: string) => setTab(newValue);

  const { connectorId, databaseName } = useParams();
  const [queryText, setQueryText] = useState("");
  const [resp, handler, setResponse] = useStateHandler(null, submitQuery);
  const isLoading = handler.status === HandlerStatus.IN_PROGRESS;

  const onSubmit = () => {
    if(!isLoading) {
      setResponse(null);
      if(connectorId && databaseName) {
        handler.call({
          queryText,
          action,
          connectorId,
          databaseName
        });
      }
    }
  };
  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if(e.code === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      onSubmit();
    }
  }

  const sqlGenerated = action === "generate" && resp;

  return (
    <Container>
      <textarea className="prompt-editor" value={queryText}
          onChange={e => setQueryText(e.target.value)} onKeyDown={onKeyDown}></textarea>
      <ButtonPanel>
        <LoadingButton variant="contained" loading={isLoading} disabled={queryText === ""} onClick={onSubmit}>
          Submit
        </LoadingButton>
      </ButtonPanel>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Response" value="1" />
          <Tab label="Thought Process" value="2"/>
        </Tabs>
      </Box>
      <TabPanel currentValue={tab} value="1">
        {isLoading ? <Skeleton variant="rounded" height={50} /> : (
          <>
            <pre className="response-panel">
              {sqlGenerated ? <Copier text={resp.response} /> : resp?.response}
            </pre>
            <div className="limit-label">* Row limit of 10 is enforced</div>
            {sqlGenerated && <SqlRunner sql={resp.response} />}
          </>
        )}
      </TabPanel>
      <TabPanel currentValue={tab} value="2">
        {isLoading ? <Skeleton variant="rounded" height={50} /> : (
          <pre className="thought-process-panel">
            {resp && <ProcessSteps steps={resp.steps}/>}
          </pre>
        )}
      </TabPanel>
    </Container>
  );
}

export default PromptEditor;
