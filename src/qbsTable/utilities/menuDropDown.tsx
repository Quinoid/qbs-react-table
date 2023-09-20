import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { ThreeDotIcon } from './icons';
import { actionProps } from '../commontypes';
type Props = {
  actionDropDown: actionProps[];
  handleMenuActions?: (slug: actionProps) => void;
};

const MenuDropDown: React.FC<Props> = ({ actionDropDown, handleMenuActions }) => {
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

  const handleMenuItemClick = (slug: actionProps) => {
    handleMenuActions?.(slug);
    setOpenMenu(false);
  };


  return (
    <div className="dropdown" ref={menuRef}>
      <button className="dropbtn" onClick={toggleMenu} ref={menuButtonRef}>
        <ThreeDotIcon />
      </button>
      {openMenu && (
        <div className={'dropdown-content'}>
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
                <div className="tooltip">
                  <span>{item.icon}</span>
                  <span className="tooltiptext">This is the tooltip content!</span>
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
