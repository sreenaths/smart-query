import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { Connector, useConfigsContext } from "../service/configs";
import { ConnectorDBParams } from "../service/params";

const Container = styled.div`
  min-width: 300px;
  height: 110px;
  padding: 20px;
  padding-top: 60px;
  text-align: center;

  .title {
    position: absolute;
    top: -8px;
    text-align: left;
  }

  .db-dropdown {
    margin-top: 20px;
  }
`;

const DBSelector = () => {
  const configs = useConfigsContext();

  const { connectorId, databaseName } = useParams() as ConnectorDBParams;

  const navigate = useNavigate();
  const onChange = (connectorId: string, currentDatabase: string = "") => {
    const currentConnector: Connector = configs.connectors[connectorId];
    currentDatabase ||= currentConnector.databases[0];
    navigate(`/${connectorId}/${currentDatabase}`);
  };

  const connectorsArr = Object.values(configs.connectors);
  const currentConnector: Connector = configs.connectors[connectorId];
  return (
    <Container>
      <h4 className="title">Connector Settings</h4>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {connectorsArr.map(conn => (
          <Button key={conn.name}
              variant={connectorId === conn.id ? "contained" : "outlined"}
              onClick={() => onChange(conn.id)}>
            {conn.name}
          </Button>
        ))}
      </ButtonGroup>
      <FormControl fullWidth className="db-dropdown">
        <InputLabel>Database</InputLabel>
        <Select
          label="Database"
          size="small"
          disabled={!currentConnector}
          value={databaseName}
          onChange={e => onChange(connectorId, e.target.value)}
        >
          {currentConnector.databases.map(dbName => (
            <MenuItem value={dbName} key={dbName}>{dbName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

export default DBSelector;
