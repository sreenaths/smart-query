import React, { ReactNode } from "react";

import styled from "styled-components";
import { useConfigsContext } from "../service/configs";

const Header = styled.header`
  background-color: #eee;
  border-bottom: 1px solid #ddd;

  padding: 5px 20px;

  display: flex;
  align-items: center;

  .logo {
    width: 25px;
    height: 25px;
    margin-right: 2px;
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

  .connected-text {
    position: absolute;
    right: 25px;
    font-size: 0.9em;
  }
`;

interface Props {
  controls?: ReactNode;
}
function AppHeader({ controls }: Props) {
  const configs = useConfigsContext();

  return (
    <Header>
      <img className='logo' src="icon.png" alt="Smart Query"/>
      <span className='logo-text'>Smart Query</span>
      <span className="connected-text">
        Connected to <strong>model_store</strong> database on <strong>Hive</strong>
        &nbsp;| Connectors: {Object.keys(configs.connectors).length}
      </span>
    </Header>
  );
}

export default AppHeader;
