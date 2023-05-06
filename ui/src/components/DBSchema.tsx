import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import {
  Accordion, AccordionDetails, AccordionSummary, IconButton, LinearProgress,
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { colorBrewer } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { HandlerStatus, useStateHandler } from "../util/handler";
import { ConnectorDBParams } from "../service/params";
import { loadSchema } from "../service/db";

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

  .sample-data-table {
    tr {
      &:last-child td, &:last-child th {
        border: none;
      }
    }
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
      <Typography variant="h5" component="h5">Tables</Typography><br />
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} className="sample-data-table">
                <TableHead>
                  <TableRow>
                    {schema.columns.map((columnName, i) => (
                      <TableCell key={i}>{columnName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schema.sampleData.map((row, index) => (
                    <TableRow key={index}>
                      {row.map((cell, i) => (
                        <TableCell key={i}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default DBSchema;
