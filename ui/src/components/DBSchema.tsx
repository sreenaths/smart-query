import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import {
  Accordion, AccordionDetails, AccordionSummary, IconButton, LinearProgress,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { colorBrewer } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { HandlerStatus, useStateHandler } from "../util/handler";
import { ConnectorDBParams } from "../service/params";
import { loadSchema } from "../service/db";
import DataTable from "./DataTable";
import { Title } from "./commons";

const Container = styled.div`
  padding: 0 25px;
  position: relative;

  .refresh-button {
    position: absolute;
    top: -5px;
    right: 32px;
  }

  .MuiAccordionSummary-root {
    min-height: none;
    height: 10px;
  }

  .Mui-expanded .MuiAccordionSummary-content p {
    font-weight: bold !important;
  }

  .MuiAccordionDetails-root {
    padding-top: 0;
  }
`;

const highlighterStyled: React.CSSProperties = {
  border: "1px solid #DDD",
  borderRadius: "4px",
  padding: "10px",
  marginTop: 0
};

const DBSchema = () => {
  const { connectorId, databaseName } = useParams() as ConnectorDBParams;
  const [tableSchemas, handler] = useStateHandler(null,
      () => loadSchema(connectorId, databaseName), [connectorId, databaseName]);

  if(handler.status === HandlerStatus.IDLE || handler.status === HandlerStatus.IN_PROGRESS) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Title>Tables</Title>
      <IconButton color="primary" className="refresh-button" onClick={handler.call}>
        <RefreshOutlinedIcon />
      </IconButton>
      {tableSchemas?.map((schema, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{index + 1}. {schema.tableName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SyntaxHighlighter language="sql_more" style={colorBrewer} customStyle={highlighterStyled}>
              {schema.ddl}
            </SyntaxHighlighter>
            <DataTable columns={schema.columns} rows={schema.sampleData} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default DBSchema;
