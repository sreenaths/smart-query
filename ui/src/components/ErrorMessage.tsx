import React, { useState } from "react";

import styled from "styled-components";
import { FallbackProps } from "react-error-boundary";

import { Alert, AlertTitle, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledAlert = styled(Alert)`
  margin: 20px;

  .title {
    margin: 0px;
  }

  .body {
    max-height: 0;
    transition: max-height 0.15s ease-out;
    overflow: scroll;
  }

  .icon {
    transition: transform 0.15s ease-in-out;
  }

  .message {
    margin-left: 10px;
    font-size: .8em;
    font-weight: normal;
  }

  &.expanded {
    .body {
      max-height: 500px;
      transition: max-height 0.25s ease-in;
    }
    .icon {
      transform: rotateZ(180deg);
    }
  }
`;

const ErrorMessage = ({error}: FallbackProps) => {
  const [expanded, setExpanded] = useState(false);

  let title = error.name;
  let message = error.message;
  let description = String(error.stack || "");

  const action = (
    <IconButton color="inherit" size="small" onClick={() => setExpanded(!expanded)}>
      <ExpandMoreIcon className="icon" />
    </IconButton>
  );

  return (
    <StyledAlert severity="error" className={expanded ? 'expanded' : ''} action={action}>
      <AlertTitle className="title">
        {title}
        <span className="message">{message}</span>
      </AlertTitle>
      <div className="body">
        <pre>{description}</pre>
      </div>
    </StyledAlert>
  );
};

export default ErrorMessage;
