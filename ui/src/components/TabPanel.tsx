import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px 0;
`;

interface Props {
  children?: React.ReactNode;
  value: string;
  currentValue: string;
}
function TabPanel({ children, value, currentValue }: Props) {
  const [openedOnce, setOpenedOnce] = useState(false);
  useEffect(() => {
    if (currentValue === value) {
      setOpenedOnce(true);
    }
  }, [value, currentValue]);

  return openedOnce ? (
    <Container role="tabpanel" hidden={value !== currentValue}>
      {children}
    </Container>
  ) : <></>;
}

export default TabPanel;
