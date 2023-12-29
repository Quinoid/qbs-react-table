import React, { useState, useRef } from 'react';

import Cell from '../Cell';
import { handleCellFormat } from './utilities/handleFormatCell';
import MenuDropDown from './utilities/menuDropDown';
import { Link } from 'react-router-dom';
const CHECKBOX_LINE_HEIGHT = '36px';
export const CheckCell: React.FC<any> = React.memo(
  ({ rowData, onChange, checkedKeys, dataKey, dataTheme, ...props }) => (
    <Cell {...props} style={{ padding: 0 }} dataTheme={dataTheme}>
      <div className="qbs-table-checkbox" style={{ lineHeight: CHECKBOX_LINE_HEIGHT }}>
        <input
          type="checkbox"
          className="qbs-table-checkbox-input"
          value={rowData[dataKey]}
          id={`checkbox-${rowData[dataKey]}`}
          onChange={onChange}
          checked={checkedKeys?.includes(rowData[dataKey])}
        />
        <label htmlFor={`checkbox-${rowData[dataKey]}`}>
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
            />
          </svg>
        </label>
      </div>
    </Cell>
  )
);
export const ActionCell: React.FC<any> = React.memo(
  ({ rowData, handleMenuActions, dataTheme, actionProps }) => (
    <div>
      <MenuDropDown
        actionDropDown={actionProps}
        rowData={rowData}
        dataTheme={dataTheme}
        handleMenuActions={handleMenuActions}
      />
    </div>
  )
);
export const ExpandCell: React.FC<any> = React.memo(
  ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props}>
      <button
        onClick={() => {
          onChange(rowData);
        }}
      >
        {expandedRowKeys.some((key: any) => key === rowData[dataKey]) ? '-' : '+'}
      </button>
    </Cell>
  )
);
export const CustomTableCell: React.FC<any> = React.memo(
  ({ rowData, renderCell, toolTip, dataKey, onChange, rowClick, type, path, link, ...props }) => {
    return (
      <>
        <Cell {...props} dataKey={dataKey}>
          {link && !path ? (
            <a onClick={() => rowClick?.(rowData)} className="qbs-table-row-link">
              {renderCell ? renderCell(rowData)?.cell : handleCellFormat(rowData[dataKey], type)}
            </a>
          ) : path ? (
            <Link to={path?.(rowData) ?? ''} className="qbs-table-row-link">
              {renderCell ? renderCell(rowData)?.cell : handleCellFormat(rowData[dataKey], type)}
            </Link>
          ) : (
            <>{renderCell ? renderCell(rowData)?.cell : handleCellFormat(rowData[dataKey], type)}</>
          )}
        </Cell>
      </>
    );
  }
);
export const CustomRowStatus: React.FC<any> = React.memo(
  ({ rowData, toolTip, dataKey, onChange, rowClick, getIcon, path, link, ...props }) => {
    const [dropdownPosition, setDropdownPosition] = useState('bottom-position');
    const dropRef = useRef(null);
    const menuButtonRef = useRef<HTMLElement>(null);
    const adjustDropdownPosition = () => {
      if (menuButtonRef.current && dropRef.current) {
        const inputBoxRect = menuButtonRef.current?.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const spaceAbove = inputBoxRect.top;
        const spaceBelow = viewportHeight - inputBoxRect.bottom;
        if (spaceAbove > spaceBelow) {
          setDropdownPosition('top-position');
        } else {
          setDropdownPosition('bottom-position');
        }
      }
    };

    return (
      <>
        <Cell
          {...props}
          dataKey={dataKey}
          style={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onMouseEnter={() => adjustDropdownPosition()}
        >
          <div className="row-status">
            {!path ? (
              <span
                ref={menuButtonRef}
                style={{ height: 24, width: 24, display: 'flex' }}
                onClick={() => rowClick?.(rowData)}
              >
                {getIcon?.(rowData)}
              </span>
            ) : (
              <Link
                style={{ height: 24, width: 24 }}
                to={path?.(rowData) ?? ''}
                className="qbs-table-row-link"
              >
                {getIcon?.(rowData)}
              </Link>
            )}
            <div
              ref={dropRef}
              className={`row-status-tooltip ${dropdownPosition}`}
              style={{ position: 'fixed' }}
            >
              {toolTip}
            </div>
          </div>
        </Cell>
      </>
    );
  }
);
