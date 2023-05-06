import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { Accordion, AccordionDetails, AccordionSummary, LinearProgress, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { HandlerStatus, useStateHandler } from "../util/handler";
import { ConnectorDBParams } from "../service/params";
import { loadSchema } from "../service/db";

const Container = styled.div`
  padding: 0 25px;

  .Mui-expanded .MuiAccordionSummary-content p {
    font-weight: bold !important;
  }
`;

const Details = styled.pre`
  width: 100%;
  min-height: 50px;
  background-color: #EEE;
  border-radius: 4px;
  margin-top: 0;

  padding: 10px 15px;
  box-sizing: border-box;

  overflow-x: auto;
  white-space: pre-wrap;
`;

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
      <Typography variant="h5" component="h5">Tables</Typography><br />
      {tableSchemas?.map((schema, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{index + 1}. {schema.table_name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography><Details>{schema.details}</Details></Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default DBSchema;
