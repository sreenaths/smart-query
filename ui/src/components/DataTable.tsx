import React from "react";
import styled from "styled-components";

import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from "@mui/material";

const Container = styled.div`
  .sample-data-table {
    tr {
      &:last-child td, &:last-child th {
        border: none;
      }
    }
  }
`;

interface Props {
  columns: string[];
  rows: string[][];
}
const DataTable = ({ columns, rows }: Props) => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} className="sample-data-table">
          <TableHead>
            <TableRow>
              {columns.map((columnName, i) => (
                <TableCell key={i}>{columnName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {row.map((cell, i) => (
                  <TableCell key={i}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DataTable;
