import React from 'react';
import { Whisper, Tooltip } from 'rsuite';
const tooltip = (titleL: string) => {
  return <Tooltip>{titleL}</Tooltip>;
};
const TooltipComponent: React.FC<any> = ({ title, children }) => {
  return (
    <Whisper
      placement="bottom"
      controlId="control-id-hover"
      trigger="hover"
      speaker={tooltip(title)}
    >
      {children}
    </Whisper>
  );
};

export default TooltipComponent;
