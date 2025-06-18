import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

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
  wheelWrapperRef?: React.RefObject<HTMLDivElement>;
};

const VerticalMenuDropdown: React.FC<Props> = ({
  actionDropDown,
  handleMenuActions,
  rowData,
  tableBodyRef,
  rowIndex
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    const handleScroll = () => {
      setOpenMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    // Use capture phase to catch all scrolls

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);
  useEffect(() => {
    const handleStyleChange = () => {
      setOpenMenu(false); // Close the dropdown
    };

    const scrollbarHandle = document.querySelector('.rs-table-scrollbar-handle');
    if (!scrollbarHandle) return;

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          handleStyleChange();
        }
      }
    });

    observer.observe(scrollbarHandle, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => {
      observer.disconnect();
    };
  }, [openMenu]);

  const handleMenuItemClick = (slug: ActionProps) => {
    handleMenuActions?.(slug, rowData);
    slug.action?.(rowData);
    setOpenMenu(false);
  };

  const handleShowHideMenu = () => {
    return (
      actionDropDown?.filter(item => !item.hidden && !item?.hide?.(rowData, rowIndex))?.length ?? 0
    );
  };

  const toggleMenu = () => {
    if (!openMenu && menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const menuHeight =
        actionDropDown?.filter(item => !item.hidden && !item?.hide?.(rowData, rowIndex)).length *
        40; // 40px per menu item

      // Check if there's enough space below
      const spaceBelow = windowHeight - rect.bottom;

      if (spaceBelow >= menuHeight) {
        // Open below
        setPosition({
          top: rect.bottom + window.scrollY - rect.height,
          left: rect.left - 200
        });
      } else {
        // Open above
        setPosition({
          top: rect.top + window.scrollY - menuHeight,
          left: rect.left - 200
        });
      }
    }
    setTimeout(() => {
      setOpenMenu(prev => !prev);
    }, 200);
  };

  const portalTarget = document.getElementById('portal-root');
  const dropdownContent = (
    <div
      className="absolute z-50 min-w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 vertical-menu-dropdown-content"
      ref={menuRef}
      style={{ width: 200, top: position.top, left: position.left, position: 'absolute' }}
    >
      <div className="py-1">
        {actionDropDown?.map(item =>
          !item?.hidden && !item?.hide?.(rowData, rowIndex) ? (
            <div
              key={item.title}
              className="vertical-menu-item px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2 transition-colors"
              onClick={e => {
                e.preventDefault();
                item.action?.(item);
                handleMenuItemClick(item);
              }}
            >
              <TooltipComponent title={item.toolTip} tableBodyRef={tableBodyRef}>
                <div className="vertical-menu-icon-title flex items-center gap-2">
                  {item?.icon && <span className="vertical-menu-icon">{item.icon}</span>}
                  <span className="vertical-menu-title">{item.title}</span>
                </div>
              </TooltipComponent>
            </div>
          ) : null
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="inline-block vertical-menu-dropdown-wrapper">
        {handleShowHideMenu() > 0 && (
          <button
            className="vertical-menu-trigger-button p-2 rounded hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            ref={menuButtonRef}
          >
            <ThreeDotIcon />
          </button>
        )}
      </div>
      {openMenu && portalTarget && ReactDOM.createPortal(dropdownContent, portalTarget)}
    </>
  );
};

export default VerticalMenuDropdown;
