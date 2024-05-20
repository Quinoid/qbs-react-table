import { useEffect, useRef, useState } from 'react';
import React from 'react';

import { ActionProps } from '../commontypes';
import { ThreeDotIcon } from './icons';
import TooltipComponent from './ToolTip';

type Props = {
  actionDropDown: ActionProps[];
  handleMenuActions?: (slug: ActionProps, rowData?: any) => void;
  rowData?: any;
  dataTheme?: string;
  tableBodyRef: React.RefObject<HTMLDivElement>;
  rowIndex?: number;
};

const MenuDropDown: React.FC<Props> = ({
  actionDropDown,
  handleMenuActions,
  rowData,
  tableBodyRef,
  rowIndex
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  // const [dropdownPosition, setDropdownPosition] = useState('bottom-position');
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

  // const toggleMenu = () => {
  //   setOpenMenu(!openMenu);
  // };

  const handleMenuItemClick = (slug: ActionProps) => {
    handleMenuActions?.(slug, rowData);
    slug.action?.(rowData);
    setOpenMenu(false);
  };
  const handleShowHideMenu = () => {
    const result = actionDropDown?.filter(
      (item: any) => !item.hidden && !item?.hide?.(rowData, rowIndex)
    );
    return result?.length ?? 0;
  };
  // const [menuPosition, setMenuPosition] = useState({
  //   top: 0,
  //   left: 0,
  //   bottom: 0,
  //   right: 0
  // });
  const toggleMenu = () => {
    // if (!openMenu && menuButtonRef.current) {
    //   const rect = menuButtonRef.current.getBoundingClientRect();
    //   const topSpace = rect.top;
    //   const bottomSpace = window.innerHeight - rect.bottom;
    //   const leftSpace = rect.left;
    //   const rightSpace = window.innerWidth - rect.right;

    //   const dropdownHeight = 200;
    //   const dropdownWidth = 200;

    //   let newPosition = 'bottom-right';

    //   if (bottomSpace < dropdownHeight && topSpace > dropdownHeight) {
    //     newPosition = 'top-right';
    //   }

    //   if (rightSpace < dropdownWidth && leftSpace > dropdownWidth) {
    //     newPosition = newPosition.replace('right', 'left');
    //   }

    //   if (topSpace < dropdownHeight && bottomSpace < dropdownHeight) {
    //     newPosition = leftSpace > rightSpace ? 'bottom-left' : 'bottom-right';
    //   }

    //   setDropdownPosition(newPosition);
    //   setMenuPosition({
    //     top: rect.top + window.scrollY,
    //     left: rect.left + window.scrollX,
    //     bottom: window.innerHeight - rect.bottom,
    //     right: window.innerWidth - rect.right
    //   });
    // }
    setTimeout(() => {
      setOpenMenu(!openMenu);
    }, 200);
  };
  // const buttonWidth = menuButtonRef.current ? menuButtonRef.current.offsetWidth : 0;
  return (
    <div className="qbs-table-menu-dropdown" ref={menuRef}>
      {handleShowHideMenu() > 0 && (
        <button className="qbs-table-dropbtn" onClick={toggleMenu} ref={menuButtonRef}>
          <ThreeDotIcon />
        </button>
      )}
      {openMenu && (
        <div
          className={'qbs-table-qbs-table-menu-dropdown-content'}
          ref={dropRef}
          // style={{
          //   top: dropdownPosition.startsWith('bottom') ? `${menuPosition.top + 20}px` : 'auto',
          //   bottom: dropdownPosition.startsWith('top') ? `${menuPosition.bottom + 20}px` : 'auto',
          //   left: dropdownPosition.endsWith('right') ? `${menuPosition.left + 10}px` : 'auto',
          //   right: dropdownPosition.endsWith('left')
          //     ? `${window.innerWidth - menuPosition.left - buttonWidth + 10}px`
          //     : 'auto'
          // }}
        >
          {actionDropDown?.map(item => (
            <>
              {!item?.hidden && !item?.hide?.(rowData, rowIndex) && (
                <a
                  key={item.title}
                  className={`p-2 leading-7 hover:bg-background `}
                  onClick={e => {
                    e.preventDefault();
                    item.action?.(item);
                    handleMenuItemClick(item);
                  }}
                >
                  <div className={'relative'}>
                    <div className="qbs-table-tooltip">
                      <TooltipComponent title={item.toolTip} tableBodyRef={tableBodyRef}>
                        <span>{item.icon}</span>
                      </TooltipComponent>
                    </div>
                  </div>
                </a>
              )}
            </>
          ))}
          <button className="qbs-table-dropbtn" onClick={toggleMenu} ref={menuButtonRef}>
            <ThreeDotIcon />
          </button>
        </div>
      )}
    </div>
  );
};
export default MenuDropDown;
