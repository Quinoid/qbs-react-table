import React, { FC, useState, useEffect, useRef } from 'react';

type CustomSelectProps = {
  options: number[];
  selectedValue: number;
  onChange: (value: number) => void;
};

const CustomSelect: FC<CustomSelectProps> = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const adjustDropdownPosition = () => {
    if (inputRef.current) {
      const inputBoxRect = inputRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const spaceAbove = inputBoxRect.top;
      const spaceBelow = viewportHeight - inputBoxRect.bottom;

      if (spaceAbove > spaceBelow) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  };

  const handleToggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleSelect = (value: number) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      adjustDropdownPosition();
      window.addEventListener('resize', adjustDropdownPosition);
    } else {
      window.removeEventListener('resize', adjustDropdownPosition);
    }

    return () => {
      window.removeEventListener('resize', adjustDropdownPosition);
    };
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={ref}>
      <div className="custom-select-trigger" onClick={handleToggle} ref={inputRef}>
        {selectedValue}
      </div>
      {isOpen && (
        <ul className={`custom-select-options ${dropdownPosition}`}>
          {options.map(option => (
            <li
              key={option}
              className={`custom-select-option ${option === selectedValue ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
