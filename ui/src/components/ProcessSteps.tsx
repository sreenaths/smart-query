import React from "react";
import styled from "styled-components";
import Copier from "./Copier";

const getClassName = (title: string): string => {
  title = title.substring(0, title.length-1).toLowerCase();
  title = title.replaceAll(" ", "-");
  return title ? `step-${title} is-titled` : "";
};

const Container = styled.div`
  .step-thought {
    border-bottom: 1px solid silver;
    padding-bottom: 5px;
    margin-bottom: 5px;

    font-style: italic;
    color: #0e5aa7;
  }

  .is-titled {
    margin-top: 2px;
  }
`;

enum Title {
  Action = "Action:",
  ActionInput = "Action Input:",
  Observation = "Observation:",
  Thought = "Thought:",
  FinalAnswer = "Final Answer:"
}

interface Props {
  steps: string;
}
const ProcessSteps = ({ steps }: Props) => {
  const lines = steps.split("\n");
  let isGeneratedSQL = false;
  return (
    <Container>
      {lines.map((line, index) => {
        let title = "";
        let description = "";

        if(line.startsWith(Title.Action)) {
          title = Title.Action;
          isGeneratedSQL = line.endsWith("query_sql_db");
        } else if(line.startsWith(Title.ActionInput)) {
          title = Title.ActionInput;
        } else if(line.startsWith(Title.Observation)) {
          title = Title.Observation;
        } else if(line.startsWith(Title.Thought)) {
          title = Title.Thought;
        } else if(line.startsWith(Title.FinalAnswer)) {
          title = Title.FinalAnswer;
        }

        if(title) {
          description = line.substring(title.length);
        } else {
          description = line;
        }

        const isSQL = isGeneratedSQL && title === Title.ActionInput;

        return (
          <div key={index} className={getClassName(title)}>
            {title && <strong>{title}</strong>}
            {isSQL ? <Copier text={description} /> : description}
          </div>
        );
      })}
    </Container>
  );
};

export default ProcessSteps;
