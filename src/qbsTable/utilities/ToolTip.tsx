import React, { useEffect, useState } from 'react';

const TooltipComponent: React.FC<any> = ({ title, children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  const handleScroll = () => {
    setIsScrollingUp(window.scrollY < scrollY);
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);
  return (
    <div className={`qbs-table-tooltip ${!isScrollingUp ? 'up' : 'down'}`}>
      <span>{children}</span>
      <span className="tooltiptext">{title}</span>
    </div>
  );
};

export default TooltipComponent;
