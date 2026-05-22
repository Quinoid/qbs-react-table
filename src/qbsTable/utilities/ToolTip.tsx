// import React, { useRef, useState } from 'react';

// const TooltipComponent: React.FC<any> = ({ title, children, tableBodyRef }) => {
//   const [dropdownPosition, setDropdownPosition] = useState('bottom-position');
//   const dropRef = useRef(null);
//   const menuButtonRef = useRef<HTMLElement>(null);
//   const adjustDropdownPosition = () => {
//     if (menuButtonRef.current && tableBodyRef?.current) {
//       const inputBoxRect = menuButtonRef.current?.getBoundingClientRect();
//       const tableRect = tableBodyRef.current.getBoundingClientRect();
//       // Calculate positions relative to the table
//       const spaceAbove = inputBoxRect.top - tableRect.top;
//       const spaceBelow = tableRect.bottom - inputBoxRect.bottom;

//       if (spaceAbove > spaceBelow) {
//         setDropdownPosition('top-position');
//       } else {
//         setDropdownPosition('bottom-position');
//       }
//     }
//   };

//   return (
//     <div className={`qbs-table-tooltip ${dropdownPosition == 'bottom-position' ? 'down' : 'up'} `}>
//       <span
//         ref={menuButtonRef}
//         style={{ display: 'flex' }}
//         onMouseEnter={() => adjustDropdownPosition()}
//       >
//         {children}
//       </span>
//       <span ref={dropRef} className={'tooltiptext'}>
//         {title}
//       </span>
//     </div>
//   );
// };

// export default TooltipComponent;
import React, { useRef, useState } from 'react';

const TooltipComponent: React.FC<any> = ({ title, children, tableBodyRef }) => {
  const [dropdownPosition, setDropdownPosition] = useState<'up' | 'down'>('down');
  const menuButtonRef = useRef<HTMLElement>(null);

  const adjustDropdownPosition = () => {
    if (menuButtonRef.current && tableBodyRef?.current) {
      const triggerRect = menuButtonRef.current.getBoundingClientRect();
      const tableRect = tableBodyRef.current.getBoundingClientRect();

      const spaceAbove = triggerRect.top - tableRect.top;
      const spaceBelow = tableRect.bottom - triggerRect.bottom;

      setDropdownPosition(spaceAbove > spaceBelow ? 'up' : 'down');
    }
  };

  return (
    <div
      className={`qbs-table-tooltip ${dropdownPosition}`}
      onMouseEnter={adjustDropdownPosition}
      onMouseLeave={() => {
        const tooltip = menuButtonRef?.current?.querySelector('.tooltiptext') as HTMLElement;
        if (tooltip) {
          tooltip.style.visibility = 'hidden';
          tooltip.style.opacity = '0';
        }
      }}
    >
      <span
        ref={menuButtonRef}
        style={{ display: 'flex' }}
        onMouseEnter={() => {
          adjustDropdownPosition();
          const tooltip = menuButtonRef?.current?.querySelector('.tooltiptext') as HTMLElement;
          if (tooltip) {
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
          }
        }}
      >
        {children}
        <span className="tooltiptext">{title}</span>
      </span>
    </div>
  );
};

export default TooltipComponent;
