import React, { ReactNode } from "react";
import styled from "styled-components";

import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Popover } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { Connector, useConfigsContext } from "../service/configs";
import DBSelector from "./DBSelector";
import { useParams } from "react-router-dom";
import { ConnectorDBParams } from "../service/params";

const Header = styled.header`
  background-color: #eee;
  border-bottom: 1px solid #ddd;

  padding: 5px 20px;

  display: flex;
  align-items: center;

  .logo {
    width: 18px;
    height: 18px;
    margin: 0 5px;
  }

  white-space: nowrap;

  .logo-text {
    display: inline-block;
    color: #222;
    font-size: 18px;
  }

  .beta-text {
    display: inline-block;
    color: #222;
    font-size: 10px;
    margin: 6px 0 0 3px;
  }

  .controls-block {
    display: inline-block;
    margin-left: auto;
  }

  .right-box {
    position: absolute;
    right: 25px;
    font-size: 0.9em;

    .connector-text {
      vertical-align: middle;
    }

    .settings-icon {
      font-size: 20px;
    }
  }
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

interface Props {
  controls?: ReactNode;
}
function AppHeader({ controls }: Props) {
  const configs = useConfigsContext();

  const { connectorId, databaseName } = useParams() as ConnectorDBParams;
  const currentConnector: Connector = configs.connectors[connectorId];

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  return (
    <Header>
      <img className='logo' src="icon.png" alt="Smart Query"/>
      <span className='logo-text'>Smart Query</span>
      <span className="right-box">
        <span className="connector-text">
          Connected to <strong>{databaseName}</strong> database on <strong>{currentConnector.name}</strong>
        </span>
        <IconButton color="primary" onClick={e => setAnchorEl(e.currentTarget)}>
          <SettingsIcon className="settings-icon" />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <CloseButton className="close-button" onClick={() => setAnchorEl(null)} />
          <DBSelector />
        </Popover>
      </span>
    </Header>
  );
}

export default AppHeader;
