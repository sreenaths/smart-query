import React from "react";
import styled from "styled-components";

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
  return (
    <Container>
      {lines.map(line => {
        const parts = line.split(":");
        const title = parts.shift() || "";
        const description = parts.join(":");
        return (
          <div className={getClassName(title)}>
            <strong>{title}:</strong>
            {description}
          </div>
        );
      })}
    </Container>
  );
};

export default ProcessSteps;
