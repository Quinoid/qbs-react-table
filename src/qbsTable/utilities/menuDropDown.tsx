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
    slug.action?.(rowData);
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
            <>
              <a
                key={item.title}
                className={`p-2 leading-7 hover:bg-background `}
                onClick={e => {
                  e.preventDefault();
                  item.action?.(item);
                  handleMenuItemClick(item);
                }}
              >
                <div className={''}>
                  <div className="qbs-table-tooltip">
                    <TooltipComponent title="Delete">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.832 5.83333L15.1093 15.9521C15.047 16.8243 14.3212 17.5 13.4468 17.5H6.55056C5.67616 17.5 4.95043 16.8243 4.88813 15.9521L4.16536 5.83333M8.33203 9.16667V14.1667M11.6654 9.16667V14.1667M12.4987 5.83333V3.33333C12.4987 2.8731 12.1256 2.5 11.6654 2.5H8.33203C7.87179 2.5 7.4987 2.8731 7.4987 3.33333V5.83333M3.33203 5.83333H16.6654"
                            stroke="#313131"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </TooltipComponent>
                  </div>
                </div>
              </a>
              <a
                key={item.title}
                className={`p-2 leading-7 hover:bg-background `}
                onClick={e => {
                  e.preventDefault();
                  item.action?.(item);
                  handleMenuItemClick(item);
                }}
              >
                <div className={''}>
                  <div className="qbs-table-tooltip">
                    <TooltipComponent title="Send">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.2414 2.90846C16.4164 1.85013 18.1414 3.58346 17.0914 6.75846L14.7331 13.8335C13.1497 18.5918 10.5497 18.5918 8.96641 13.8335L8.26641 11.7335L6.16641 11.0335C1.40807 9.45013 1.40807 6.85846 6.16641 5.2668L13.2414 2.90846Z"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.42578 11.3745L11.4091 8.38281"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </TooltipComponent>
                  </div>
                </div>
              </a>
              <a
                key={item.title}
                className={`p-2 leading-7 hover:bg-background `}
                onClick={e => {
                  e.preventDefault();
                  item.action?.(item);
                  handleMenuItemClick(item);
                }}
              >
                <div className={''}>
                  <div className="qbs-table-tooltip">
                    <TooltipComponent title="Edit">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.16797 1.66602H7.5013C3.33464 1.66602 1.66797 3.33268 1.66797 7.49935V12.4993C1.66797 16.666 3.33464 18.3327 7.5013 18.3327H12.5013C16.668 18.3327 18.3346 16.666 18.3346 12.4993V10.8327"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.80088 9.08306C6.55088 9.33306 6.30088 9.82472 6.25088 10.1831L5.89254 12.6914C5.75921 13.5997 6.40088 14.2331 7.30921 14.1081L9.81754 13.7497C10.1675 13.6997 10.6592 13.4497 10.9175 13.1997L17.4842 6.63306C18.6175 5.49972 19.1509 4.18306 17.4842 2.51639C15.8175 0.849722 14.5009 1.38306 13.3675 2.51639L6.80088 9.08306Z"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.4258 3.45898C12.9841 5.45065 14.5424 7.00898 16.5424 7.57565"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </TooltipComponent>
                  </div>
                </div>
              </a>
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
