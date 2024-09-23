import { useEffect, useRef, useState } from 'react';
import React from 'react';

import { ActionProps } from '../commontypes';
import { ThreeDotIcon } from './icons';

type Props = {
  iconName: string;
  actionDropDown: ActionProps[];
  handleMenuActions?: (slug: ActionProps, rowData?: any) => void;
  rowData?: any;
  dataTheme?: string;
  tableBodyRef: React.RefObject<HTMLDivElement>;
  rowIndex?: number;
};

const CardMenuDropdown: React.FC<Props> = ({ actionDropDown, handleMenuActions, rowData }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuPositionStyles, setMenuPositionStyles] = useState<{
    top?: string;
    bottom?: string;
    right?: string;
  }>({});
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setOpenMenu(prevState => {
      if (!prevState && menuButtonRef.current) {
        const buttonRect = menuButtonRef.current.getBoundingClientRect();
        const dropdownHeight = 200; // Adjust this if your dropdown height varies
        const spaceBelow = window.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        console.log(spaceAbove, spaceBelow, dropdownHeight);
        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
          setMenuPositionStyles({
            bottom: '30px',
            right: '10px'
          });
        } else {
          setMenuPositionStyles({
            top: `${buttonRect.height}px`,
            right: '10px'
          });
        }
      }
      return !prevState;
    });
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  const handleMenuItemClick = (item: ActionProps) => {
    item.action?.(item);
    handleMenuActions?.(item, rowData);
    handleClose();
  };

  console.log(menuPositionStyles);
  return (
    <div className="dropdown text-black dark:text-white dark:bg-[#424242] bg-white" ref={menuRef}>
      <button className="dropdown-toggle" onClick={toggleMenu} ref={menuButtonRef}>
        <ThreeDotIcon />
      </button>
      {openMenu && (
        <div
          className=" qbs-card-dropdown rounded absolute right-0 mt-2 w-56 z-10 shadow-modalShadow bg-white dark:bg-[#424242] dark:text-white"
          style={menuPositionStyles}
        >
          <div className="qbs-card-dropdown-menu px-2 bg-white rounded w-full border border-grey-border shadow-menudropdown dark:bg-[#424242] dark:text-white">
            {actionDropDown?.map(
              item =>
                !item.hidden && (
                  <a
                    key={item.title}
                    href="#/"
                    className={'px-2  hover:bg-background '}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleMenuItemClick(item);
                    }}
                  >
                    <div
                      className={` qbs-card-dropdown-menu-item ${
                        item.isWarning ? 'text-error-light' : 'text-black dark:text-white'
                      } text-xxs flex items-center w-full tracking-[0.24px] font-medium `}
                    >
                      {item?.icon && <>{item.icon}</>}
                      <span className="pl-1.5">{item.title}</span>
                    </div>
                  </a>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardMenuDropdown;
