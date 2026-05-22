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
  tableBodyRef: React.RefObject<HTMLDivElement | null>;
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
      const viewportPadding = 8;
      const menuGap = 4;
      const dropdownWidth = 200;
      const visibleItems =
        actionDropDown?.filter(item => !item.hidden && !item?.hide?.(rowData, rowIndex)) ?? [];
      const menuHeight = visibleItems.length * 40;

      const spaceBelow = window.innerHeight - rect.bottom;
      const openBelow = spaceBelow >= menuHeight + menuGap;

      // Anchor to trigger; prefer opening toward inline-start (left in LTR).
      let left = rect.right - dropdownWidth;

      if (left < viewportPadding) {
        left = rect.left;
      }
      if (left + dropdownWidth > window.innerWidth - viewportPadding) {
        left = Math.max(viewportPadding, rect.left - dropdownWidth);
      }
      if (left + dropdownWidth > window.innerWidth - viewportPadding) {
        left = window.innerWidth - viewportPadding - dropdownWidth;
      }

      setPosition({
        top: openBelow ? rect.bottom + menuGap : rect.top - menuHeight - menuGap,
        left,
      });
    }
    setTimeout(() => {
      setOpenMenu(prev => !prev);
    }, 200);
  };

  const portalTarget = document.getElementById('portal-root');
  const dropdownContent = (
    <div
      className="absolute z-[60] min-w-48 rounded-md vertical-menu-dropdown-content"
      ref={menuRef}
      style={{
        width: 200,
        top: position.top,
        left: position.left,
        position: 'fixed',
      }}
    >
      <div className="py-1">
        {actionDropDown?.map(item =>
          !item?.hidden && !item?.hide?.(rowData, rowIndex) ? (
            <div
              key={item.title}
              className="vertical-menu-item px-4 py-2 text-sm text-base-black hover:bg-gray-light-1 cursor-pointer flex items-center gap-2 transition-colors"
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
            className="vertical-menu-trigger-button p-2 rounded text-base-gray hover:bg-gray-light-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
