import React from "react";
import { useParams } from "react-router-dom";

import { Alert, LinearProgress } from "@mui/material";

import { HandlerStatus, useStateHandler } from "../util/handler";
import { runSql } from "../service/db";
import { ConnectorDBParams } from "../service/params";
import DataTable from "./DataTable";
import { Title } from "./commons";
import { ErrorMessage } from "./ErrorMessage";
import { AxiosError } from "axios";

interface Props {
  sql: string;
}
const SqlRunner = ({ sql }: Props) => {
  const { connectorId, databaseName } = useParams() as ConnectorDBParams;
  const [result, handler] = useStateHandler(null, () => runSql(connectorId, databaseName, sql), [sql], true);

  let content = <Alert severity="warning">This is a warning alert — check it out!</Alert>;
  if(handler.status === HandlerStatus.ERROR) {
    const err: AxiosError = handler.error as AxiosError;
    const errData: any = err.response?.data;
    content = <ErrorMessage error={{
      name: "Query Failed",
      message: "Failed to load sample data!",
      stack: errData.error
    }}/>
  } else if(handler.status === HandlerStatus.IN_PROGRESS) {
    content = <LinearProgress />;
  } else if (result) {
    content = <DataTable columns={result.columns} rows={result.rows} />
  }

  return (
    <>
      <Title>Query Response</Title>
      {content}
    </>
  );
};

export default SqlRunner;
