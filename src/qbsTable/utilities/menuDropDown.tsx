import { useEffect, useRef, useState } from 'react';
import React from 'react';

import { ActionProps } from '../commontypes';
import { ThreeDotIcon } from './icons';

type Props = {
  actionDropDown: ActionProps[];
  handleMenuActions?: (slug: ActionProps, rowData?: any) => void;
  rowData?: any;
  dataTheme?: string;
};

const MenuDropDown: React.FC<Props> = ({ actionDropDown, handleMenuActions, rowData }) => {
  const [openMenu, setOpenMenu] = useState(false);
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
    setOpenMenu(!openMenu);
  };

  const handleMenuItemClick = (slug: ActionProps) => {
    handleMenuActions?.(slug, rowData);
    setOpenMenu(false);
  };

  return (
    <div className="qbs-table-menu-dropdown" ref={menuRef}>
      <button className="qbs-table-dropbtn" onClick={toggleMenu} ref={menuButtonRef}>
        <ThreeDotIcon />
      </button>
      {openMenu && (
        <div className={'qbs-table-qbs-table-menu-dropdown-content'}>
          {actionDropDown?.map(item => (
            <a
              key={item.title}
              className={`p-2 leading-7 hover:bg-background `}
              onClick={e => {
                e.preventDefault();
                handleMenuItemClick(item);
              }}
            >
              <div className={''}>
                <div className="qbs-table-tooltip">
                  <span>{item.icon}</span>
                  <span className="tooltiptext">{item.toolTip}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default MenuDropDown;
