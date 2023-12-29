import React, { useState, useRef } from 'react';

const TooltipComponent: React.FC<any> = ({ title, children }) => {
  const [dropdownPosition, setDropdownPosition] = useState('bottom-position');
  const dropRef = useRef(null);
  const menuButtonRef = useRef<HTMLElement>(null);
  const adjustDropdownPosition = () => {
    if (menuButtonRef.current && dropRef.current) {
      const inputBoxRect = menuButtonRef.current?.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const spaceAbove = inputBoxRect.top;
      const spaceBelow = viewportHeight - inputBoxRect.bottom;
      if (spaceAbove > spaceBelow) {
        setDropdownPosition('top-position');
      } else {
        setDropdownPosition('bottom-position');
      }
    }
  };

  return (
    <div className={`qbs-table-tooltip ${dropdownPosition == 'bottom-position' ? 'down' : 'up'} `}>
      <span
        ref={menuButtonRef}
        style={{ display: 'flex' }}
        onMouseEnter={() => adjustDropdownPosition()}
      >
        {children}
      </span>
      <span ref={dropRef} className={`tooltiptext`}>
        {title}
      </span>
    </div>
  );
};

export default TooltipComponent;
