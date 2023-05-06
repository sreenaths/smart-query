import React, { useEffect, useState } from "react";

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
    <div role="tabpanel" hidden={value !== currentValue} className="tab-panel">
      {children}
    </div>
  ) : <></>;
}

export default TabPanel;
