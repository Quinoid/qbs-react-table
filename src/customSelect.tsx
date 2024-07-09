import React, { FC, useState, useEffect, useRef } from 'react';

type CustomSelectProps = {
  options: number[];
  selectedValue: number;
  onChange: (value: number) => void;
};

const CustomSelect: FC<CustomSelectProps> = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const adjustDropdownPosition = () => {
    if (inputRef.current && dropRef.current) {
      const inputBoxRect = inputRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const spaceAbove = inputBoxRect.top;
      const spaceBelow = viewportHeight - inputBoxRect.bottom;
      console.log(spaceAbove, spaceBelow);
      if (spaceAbove > spaceBelow) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  };

  const handleToggle = () => setIsOpen(!isOpen);
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
    window.addEventListener('resize', adjustDropdownPosition);
    adjustDropdownPosition();

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
      <div className="custom-select-trigger" onClick={handleToggle}>
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
