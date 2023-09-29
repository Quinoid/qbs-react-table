import React, { useState, useCallback, useEffect, useRef } from 'react';
import { QbsColumnProps } from '../commontypes';

interface ColumnToggleProps {
  columns: QbsColumnProps[];
  onToggle: (columnName: string) => void;
  onReorder: (columns: QbsColumnProps[]) => void;
}

const ColumnToggle: React.FC<ColumnToggleProps> = ({ columns, onToggle, onReorder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

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

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
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
      draggable
      className='qbs-table-container'
      onDragStart={e => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, index)}
    >
      <span className='qbs-table-columns-drag-icon'>&#x2630;</span>
      <label className='qbs-table-columns-label'>
        <input
          type="checkbox"
          checked={column.isVisible}
          onChange={() => handleToggle(column.title)}
        />
        {column.title}
      </label>
    </div>
  );

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Show/Hide Columns</button>
      {isOpen && (
        <div className='qbs-table-column-popup' ref={popupRef}>
          <div className='qbs-table-columns-container'>
            {columns.length > 10 ? (
              <>
                <div className='qbs-table-column'>
                  {columns
                    .slice(0, columns.length / 2)
                    .map((column, index) => renderColumn(column, index))}
                </div>
                <div className='qbs-table-column'>
                  {columns
                    .slice(columns.length / 2)
                    .map((column, index) => renderColumn(column, index + columns.length / 2))}
                </div>
              </>
            ) : (
              <div className='qbs-table-column'>
                {columns.map((column, index) => renderColumn(column, index))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnToggle;
