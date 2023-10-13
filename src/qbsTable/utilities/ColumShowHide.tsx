import React, { useCallback, useEffect, useRef, useState } from 'react';

import { QbsColumnProps } from '../commontypes';
import { SettingsIcon } from './icons';

interface ColumnToggleProps {
  columns: QbsColumnProps[];
  onToggle: (columnName: string) => void;
  onReorder: (columns: QbsColumnProps[]) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  handleResetColumns?: () => void;
}

const ColumnToggle: React.FC<ColumnToggleProps> = ({
  columns,
  onToggle,
  onReorder,
  isOpen,
  setIsOpen,
  handleResetColumns
}) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<number | null>();

  const handleToggle = useCallback(
    (columnName: string) => {
      onToggle(columnName);
    },
    [onToggle]
  );

  const onDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const onDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverPosition(index);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (draggedItem !== null) {
        const updatedColumns = [...columns];
        const draggedColumn = updatedColumns[draggedItem];
        updatedColumns.splice(draggedItem, 1);
        updatedColumns.splice(index, 0, draggedColumn);

        onReorder(updatedColumns);
        setDragOverPosition(null);
      }
      setDraggedItem(null);
    },
    [columns, draggedItem]
  );
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const renderColumn = (column: QbsColumnProps, index: number) => (
    <div
      key={column.title}
      draggable={!column.isVisible || column.fixed ? false : true}
      className="qbs-table-container"
      onDragStart={e => onDragStart(e, index)}
      onDragOver={e => onDragOver(e, index)}
      onDrop={e => onDrop(e, index)}
      style={{ border: index == dragOverPosition ? '1px dashed blue' : '' }}
    >
      <div className="qbs-table-checkbox qbs-table-custom-checkbox">
        <input
          type="checkbox"
          checked={column.isVisible}
          onChange={() => handleToggle(column.title)}
          className="qbs-table-checkbox-input"
          id={column.title}
        />
        <label htmlFor={column.title}>
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 3.21739L2.89883 6L8 1.06994L6.89494 0L2.89883 3.86768L1.09728 2.14745L0 3.21739Z"
              fill="white"
            ></path>
          </svg>
        </label>
      </div>
      <div className="qbs-table-popup-value">{column.title}</div>
      {column.isVisible && !column.fixed && (
        <span className="qbs-table-columns-drag-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.20898 2.05047C4.74187 2.22322 4.43921 2.6138 4.39879 3.09588C4.33861 3.81357 4.96751 4.44246 5.68519 4.38229C6.18026 4.3408 6.59243 4.00921 6.74267 3.53164C6.82103 3.2825 6.79574 2.93719 6.68125 2.6925C6.55895 2.43113 6.37419 2.24233 6.11569 2.11459C5.92365 2.01969 5.88078 2.00965 5.63395 2.00196C5.41672 1.99517 5.3325 2.00481 5.20898 2.05047ZM10.0416 2.04376C9.7 2.16569 9.46445 2.37622 9.31379 2.69422C9.23042 2.87016 9.22458 2.90286 9.22458 3.19315C9.22458 3.4899 9.22889 3.51259 9.32123 3.70051C9.69541 4.46214 10.6879 4.6208 11.2645 4.01115C11.8315 3.4116 11.6604 2.47093 10.918 2.10616C10.7441 2.02073 10.6936 2.0094 10.4529 2.00182C10.2481 1.99536 10.1488 2.00548 10.0416 2.04376ZM5.34893 6.82474C5.11292 6.87601 4.92872 6.97801 4.74901 7.15697C4.27637 7.62757 4.27637 8.36852 4.74901 8.8401C5.21569 9.30575 5.93107 9.31874 6.40536 8.87018C6.66595 8.62374 6.78644 8.34805 6.78644 7.99837C6.78644 7.651 6.66578 7.37282 6.41027 7.13118C6.22719 6.95803 6.07668 6.87885 5.83216 6.82702C5.61146 6.78023 5.55503 6.77998 5.34893 6.82474ZM10.1516 6.82829C9.9209 6.87849 9.7661 6.96147 9.58667 7.13118C9.33115 7.37282 9.21049 7.651 9.21049 7.99837C9.21049 8.34805 9.33098 8.62374 9.59157 8.87018C10.0659 9.31877 10.7812 9.30577 11.2479 8.8401C11.7206 8.36852 11.7206 7.62822 11.2479 7.15663C11.0647 6.97379 10.8553 6.86282 10.6076 6.81715C10.4048 6.77981 10.3707 6.78062 10.1516 6.82829ZM5.28951 11.6453C4.97314 11.737 4.66594 11.9881 4.52416 12.271C4.19001 12.9376 4.53174 13.7326 5.24943 13.9583C5.37001 13.9962 5.47168 14.0058 5.65873 13.9969C5.87526 13.9865 5.93484 13.9715 6.11704 13.8815C6.52155 13.6816 6.75995 13.3194 6.78131 12.8724C6.79558 12.5741 6.74746 12.3902 6.59238 12.1502C6.46455 11.9525 6.23962 11.7698 6.02016 11.6857C5.83188 11.6135 5.46864 11.5934 5.28951 11.6453ZM10.0849 11.6514C9.75841 11.7392 9.47967 11.9748 9.32098 12.2972C9.22892 12.4841 9.22458 12.5069 9.22458 12.8036C9.22458 13.0943 9.23033 13.1264 9.31435 13.3037C9.43911 13.5671 9.62317 13.7546 9.88296 13.883C10.0896 13.9851 10.1041 13.988 10.4075 13.988C10.706 13.988 10.7283 13.9838 10.9164 13.8914C11.6598 13.5261 11.8321 12.5858 11.2655 11.9867C10.9589 11.6624 10.5141 11.5361 10.0849 11.6514Z"
              fill="#999696"
            />
          </svg>
        </span>
      )}
    </div>
  );
  const handleAvailableColumns = () => {
    return columns.filter(item => !item.isVisible)?.length > 0 ? true : false;
  };
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <SettingsIcon />
      </button>
      {isOpen && (
        <div className="qbs-table-column-popup" ref={popupRef}>
          <div className="qbs-table-popup-item">
            <div className="qbs-table-popup-label">FIXED COLUMNS</div>
            <div className="qbs-table-columns-container">
              <div className="qbs-table-column">
                {columns.map((column, index) => (column.fixed ? renderColumn(column, index) : ''))}
              </div>
            </div>
          </div>
          <div className="qbs-table-divider"></div>
          <div className="qbs-table-popup-item">
            <div className="qbs-table-popup-label">VISIBLE COLUMNS</div>
            <div className="qbs-table-columns-container">
              <div className="qbs-table-column">
                {columns.map((column, index) =>
                  column.isVisible && !column.fixed ? renderColumn(column, index) : ''
                )}
              </div>
            </div>
          </div>
          {handleAvailableColumns() && (
            <>
              <div className="qbs-table-divider"></div>
              <div className="qbs-table-popup-item">
                <div className="qbs-table-popup-label">AVAILABLE COLUMNS</div>
                <div className="qbs-table-columns-container">
                  <div className="qbs-table-column">
                    {columns.map((column, index) =>
                      !column.isVisible && !column.fixed ? renderColumn(column, index) : ''
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {handleResetColumns && (
            <>
              <div className="qbs-table-divider"></div>
              <div className="qbs-table-popup-item">
                <a className="qbs-table-reset-link" href="#" onClick={() => handleResetColumns?.()}>
                  Reset to default
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ColumnToggle;
