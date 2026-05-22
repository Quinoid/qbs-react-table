import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

type TooltipComponentProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  tableBodyRef?: React.RefObject<HTMLDivElement | null>;
  /** When false, renders children only (no tooltip). */
  enabled?: boolean;
};

const VIEWPORT_PADDING = 8;
const TOOLTIP_GAP = 8;

const TooltipComponent: React.FC<TooltipComponentProps> = ({
  title,
  children,
  tableBodyRef,
  enabled = true,
}) => {
  const [visible, setVisible] = useState(false);
  const [positioned, setPositioned] = useState(false);
  const [placement, setPlacement] = useState<'up' | 'down'>('down');
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [arrowOffset, setArrowOffset] = useState(0);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const boundaryRect =
      tableBodyRef?.current?.getBoundingClientRect() ??
      trigger.closest('.qbs-table')?.getBoundingClientRect();

    const spaceAbove = boundaryRect
      ? triggerRect.top - boundaryRect.top
      : triggerRect.top;
    const spaceBelow = boundaryRect
      ? boundaryRect.bottom - triggerRect.bottom
      : window.innerHeight - triggerRect.bottom;

    const nextPlacement =
      spaceBelow >= tooltipRect.height + TOOLTIP_GAP || spaceBelow >= spaceAbove ? 'down' : 'up';

    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    let left = triggerCenter - tooltipRect.width / 2;

    if (left < VIEWPORT_PADDING) {
      left = VIEWPORT_PADDING;
    } else if (left + tooltipRect.width > window.innerWidth - VIEWPORT_PADDING) {
      left = window.innerWidth - VIEWPORT_PADDING - tooltipRect.width;
    }

    const top =
      nextPlacement === 'down'
        ? triggerRect.bottom + TOOLTIP_GAP
        : triggerRect.top - tooltipRect.height - TOOLTIP_GAP;

    setPlacement(nextPlacement);
    setCoords({ top, left });
    setArrowOffset(triggerCenter - left);
    setPositioned(true);
  }, [tableBodyRef]);

  const showTooltip = () => {
    setPositioned(false);
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
    setPositioned(false);
  };

  useLayoutEffect(() => {
    if (!visible) {
      return;
    }

    updatePosition();
    const frame = window.requestAnimationFrame(updatePosition);
    return () => window.cancelAnimationFrame(frame);
  }, [visible, title, updatePosition]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleReposition = () => updatePosition();
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [visible, updatePosition]);

  if (!title || enabled === false) {
    return <>{children}</>;
  }

  const portalRoot = typeof document !== 'undefined' ? document.body : null;

  return (
    <>
      <span
        ref={triggerRef}
        className="qbs-table-tooltip-trigger"
        style={{ display: 'inline-flex' }}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </span>
      {visible &&
        portalRoot &&
        ReactDOM.createPortal(
          <span
            ref={tooltipRef}
            role="tooltip"
            className={`qbs-table-tooltip-floating tooltiptext qbs-table-tooltip-floating--${placement} ${
              positioned ? 'is-positioned' : ''
            }`}
            style={
              {
                top: coords.top,
                left: coords.left,
                '--tooltip-arrow-offset': `${arrowOffset}px`,
              } as React.CSSProperties
            }
          >
            {title}
          </span>,
          portalRoot,
        )}
    </>
  );
};

export default TooltipComponent;
