import React from "react";
import styled from "styled-components";
import Copier from "./Copier";

const getClassName = (title: string): string => `step-${title.toLowerCase().replace(" ", "-")}`;

const Container = styled.div`
  .step-thought {
    border-bottom: 1px solid silver;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
  .step-thought {
    font-style: italic;
    color: #0e5aa7;
  }
`;

interface Props {
  steps: string;
}
const ProcessSteps = ({ steps }: Props) => {
  const lines = steps.split("\n");
  let isGeneratedSQL = false;
  return (
    <Container>
      {lines.map((line, index) => {
        const parts = line.split(":");
        const title = parts.shift() || "";
        let description: any = parts.join(":");

        if(title === "Action") {
          isGeneratedSQL = description === " query_sql_db";
        } else if(title === "Action Input" && isGeneratedSQL) {
          description = (
            <Copier text={description} />
          );
        }

        return (
          <div key={index} className={getClassName(title)}>
            <strong>{title}:</strong>
            {description}
          </div>
        );
      })}
    </Container>
  );
};

export default ProcessSteps;
