import React, { useRef, useState } from 'react';

const TooltipComponent: React.FC<any> = ({ title, children, tableBodyRef }) => {
  const [dropdownPosition, setDropdownPosition] = useState('bottom-position');
  const dropRef = useRef(null);
  const menuButtonRef = useRef<HTMLElement>(null);
  const adjustDropdownPosition = () => {
    if (menuButtonRef.current && tableBodyRef?.current) {
      const inputBoxRect = menuButtonRef.current?.getBoundingClientRect();
      const viewportHeight = tableBodyRef?.current?.offsetHeight ?? window.innerHeight;
      const tableRect = tableBodyRef.current.getBoundingClientRect();

      // Calculate positions relative to the table
      const spaceAbove = inputBoxRect.top - tableRect.top;
      const spaceBelow = tableRect.bottom - inputBoxRect.bottom;

      console.log(viewportHeight, spaceAbove, spaceBelow);
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
      <span ref={dropRef} className={`tooltiptext `}>
        {title}
      </span>
    </div>
  );
};

export default TooltipComponent;
