import React, { useEffect, useId, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { ThreeDotIcon } from './icons';
import TooltipComponent from './ToolTip';
import type { ActionProps } from '../commontypes';
import {
  closeOtherVerticalMenus,
  VERTICAL_MENU_CLOSE_OTHERS,
  type VerticalMenuCloseDetail,
} from './verticalMenuCoordinator';

type VerticalMenuDropdownProps = {
  actionDropDown?: readonly ActionProps[];
  handleMenuActions?: (actions: ActionProps, rowData: any) => void;
  rowData: any;
  tableBodyRef?: React.RefObject<HTMLDivElement>;
  rowIndex?: number;
};

const VerticalMenuDropdown: React.FC<VerticalMenuDropdownProps> = ({
  actionDropDown,
  handleMenuActions,
  rowData,
  tableBodyRef,
  rowIndex,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCloseOthers = (event: Event) => {
      const detail = (event as CustomEvent<VerticalMenuCloseDetail>).detail;
      if (detail?.exceptId !== menuId) {
        setOpenMenu(false);
      }
    };

    document.addEventListener(VERTICAL_MENU_CLOSE_OTHERS, handleCloseOthers);
    return () => document.removeEventListener(VERTICAL_MENU_CLOSE_OTHERS, handleCloseOthers);
  }, [menuId]);

  const updateMenuPosition = () => {
    if (!menuButtonRef.current) return;

    const rect = menuButtonRef.current.getBoundingClientRect();
    const viewportPadding = 8;
    const menuGap = 4;
    const visibleItems =
      actionDropDown?.filter(
        item =>
          !item.hidden && !(item.hide?.call(item, rowData, rowIndex) ?? false),
      ) ?? [];
    const menuWidth =
      menuRef.current && menuRef.current.offsetWidth > 0
        ? menuRef.current.offsetWidth
        : Math.max(120, visibleItems.length * 48);
    const menuHeight = visibleItems.length * 40;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openBelow = spaceBelow >= menuHeight + menuGap;

    const isRtl =
      (document.documentElement.getAttribute('dir') ||
        document.body.getAttribute('dir') ||
        getComputedStyle(document.documentElement).direction) === 'rtl';

    let left = isRtl ? rect.left : rect.left - menuWidth;
    if (!isRtl && left < viewportPadding) {
      left = rect.left;
    }
    if (left + menuWidth > window.innerWidth - viewportPadding) {
      left = Math.max(viewportPadding, rect.right - menuWidth);
    }

    setPosition({
      top: openBelow ? rect.bottom + menuGap : rect.top - menuHeight - menuGap,
      left,
    });
  };

  useEffect(() => {
    if (!openMenu) return;
    updateMenuPosition();
    const frame = requestAnimationFrame(() => updateMenuPosition());
    const resizeObserver =
      menuRef.current && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => updateMenuPosition())
        : null;
    if (resizeObserver && menuRef.current) {
      resizeObserver.observe(menuRef.current);
    }
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
    };
  }, [openMenu]);

  useEffect(() => {
    if (!openMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return;
      }
      setOpenMenu(false);
    };
    const handleScroll = () => setOpenMenu(false);

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [openMenu]);

  useEffect(() => {
    const scrollbarHandle = document.querySelector('.rs-table-scrollbar-handle');
    if (!scrollbarHandle) return;

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          setOpenMenu(false);
        }
      }
    });

    observer.observe(scrollbarHandle, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => observer.disconnect();
  }, [openMenu]);

  const handleMenuItemClick = (slug: ActionProps) => {
    handleMenuActions?.(slug, rowData);
    slug.action?.(rowData);
    setOpenMenu(false);
  };

  const visibleCount =
    actionDropDown?.filter(
      item => !item.hidden && !(item.hide?.call(item, rowData, rowIndex) ?? false),
    ).length ?? 0;

  const portalTarget =
    document.getElementById('portal-root') ?? document.body;

  const dropdownContent = (
    <div
      className="absolute z-[60] min-w-48 rounded-md vertical-menu-dropdown-content"
      ref={menuRef}
      style={{
        top: position.top,
        left: position.left,
        position: 'fixed',
        minWidth: 120,
        width: 'max-content',
      }}
    >
      <div className="py-1">
        {actionDropDown?.map(item =>
          !item.hidden && !(item.hide?.call(item, rowData, rowIndex) ?? false) ? (
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
                  {item.icon && <span className="vertical-menu-icon">{item.icon}</span>}
                  <span className="vertical-menu-title">{item.title}</span>
                </div>
              </TooltipComponent>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="inline-block vertical-menu-dropdown-wrapper">
        {visibleCount > 0 && (
          <button
            type="button"
            className="vertical-menu-trigger-button"
            onClick={event => {
              event.stopPropagation();
              if (openMenu) {
                setOpenMenu(false);
                return;
              }
              closeOtherVerticalMenus(menuId);
              updateMenuPosition();
              setOpenMenu(true);
            }}
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
