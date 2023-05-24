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
  const serverResponse: any | undefined = (error as any)?.response?.data;

  let title = serverResponse ? 'ServerError' : error.name;
  let message = error.message;

  if(serverResponse?.error) {
    message = serverResponse?.error;
  }

  let details: string[] = []

  if(serverResponse?.steps) {
    details.push(`Thought Process:\n${serverResponse?.steps}`);
  }

  if(error.stack) {
    details.push(`Stack:\n${error.stack}`);
  }

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
        <pre>{details.join("\n\n")}</pre>
      </div>
    </StyledAlert>
  );
};

export default ErrorMessage;
