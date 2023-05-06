import React, { useState } from "react";
import styled from "styled-components";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import { setClipboard } from "../util/clipboard";

const Container = styled.span`
  color: purple;
  font-weight: bold;
  font-style: italic;
`;

const CopyIcon = styled(ContentCopyIcon)`
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  top: 3px;
  cursor: pointer;
`;

interface Props {
  text: string;
}
const Copier = ({ text }: Props) => {
  const [tooltip, setTooltip] = useState("");

  const copyToClipboard = async () => {
    await setClipboard(text)
    setTooltip("Copied");
  };

  return (
    <Container>
      <Tooltip TransitionComponent={Zoom} title={tooltip} placement="top">
        <CopyIcon fontSize="inherit" onClick={copyToClipboard} onMouseLeave={() => setTooltip("")} />
      </Tooltip>
      {text.trim()}
    </Container>
  );
};

export default Copier;
