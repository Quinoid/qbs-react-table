import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Cell from '../Cell';
import { handleCellFormat } from './utilities/handleFormatCell';
import MenuDropDown from './utilities/menuDropDown';
import VerticalMenuDropdown from './utilities/VerticalDropDownMenu';

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
  ({
    rowData,
    handleMenuActions,
    dataTheme,
    actionProps,
    tableBodyRef,
    rowIndex,
    dropType,
    wheelWrapperRef
  }) => {
    return (
      <div>
        {dropType == 'vertical' ? (
          <VerticalMenuDropdown
            tableBodyRef={tableBodyRef}
            actionDropDown={actionProps}
            rowData={rowData}
            dataTheme={dataTheme}
            rowIndex={rowIndex}
            handleMenuActions={handleMenuActions}
            wheelWrapperRef={wheelWrapperRef}
          />
        ) : (
          <MenuDropDown
            tableBodyRef={tableBodyRef}
            actionDropDown={actionProps}
            rowData={rowData}
            dataTheme={dataTheme}
            rowIndex={rowIndex}
            handleMenuActions={handleMenuActions}
          />
        )}
      </div>
    );
  }
);
export const ExpandCell: React.FC<any> = React.memo(
  ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props}>
      <button
        onClick={() => {
          onChange(rowData);
        }}
      >
        {expandedRowKeys.some((key: any) => key === rowData[dataKey]) ? (
          <svg
            width="11"
            height="6"
            viewBox="0 0 11 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.792893 0.292893C1.18342 -0.097631 1.81658 -0.097631 2.20711 0.292893L5.5 3.58579L8.79289 0.292893C9.18342 -0.0976311 9.81658 -0.0976311 10.2071 0.292893C10.5976 0.683417 10.5976 1.31658 10.2071 1.70711L6.20711 5.70711C5.81658 6.09763 5.18342 6.09763 4.79289 5.70711L0.792893 1.70711C0.402369 1.31658 0.402369 0.683417 0.792893 0.292893Z"
              fill="#313131"
            />
          </svg>
        ) : (
          <svg
            width="7"
            height="10"
            viewBox="0 0 7 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.792894 9.70711C0.402369 9.31658 0.402369 8.68342 0.792894 8.29289L4.08579 5L0.792893 1.70711C0.402369 1.31658 0.402369 0.683418 0.792893 0.292894C1.18342 -0.0976312 1.81658 -0.0976312 2.20711 0.292894L6.20711 4.29289C6.59763 4.68342 6.59763 5.31658 6.20711 5.70711L2.20711 9.70711C1.81658 10.0976 1.18342 10.0976 0.792894 9.70711Z"
              fill="#313131"
            />
          </svg>
        )}
      </button>
    </Cell>
  )
);
export const CustomTableCell: React.FC<any> = React.memo(
  ({
    rowData,
    renderCell,
    toolTip,
    hideLink,
    dataKey,
    onChange,
    rowClick,
    type,
    path,
    link,
    ...props
  }) => {
    return (
      <Cell {...props} dataKey={dataKey}>
        {link && !path && !hideLink?.(rowData) ? (
          <a onClick={() => rowClick?.(rowData)} className="qbs-table-row-link">
            {renderCell ? renderCell(rowData)?.cell : handleCellFormat(rowData[dataKey], type)}
          </a>
        ) : path && !hideLink?.(rowData) ? (
          <Link to={path?.(rowData) ?? ''} className="qbs-table-row-link">
            {renderCell ? renderCell(rowData)?.cell : handleCellFormat(rowData[dataKey], type)}
          </Link>
        ) : renderCell ? (
          renderCell(rowData)?.cell
        ) : (
          handleCellFormat(rowData[dataKey], type)
        )}
      </Cell>
    );
  }
);
export const CustomRowStatus: React.FC<any> = React.memo(
  ({ rowData, getToolTip, dataKey, onChange, rowClick, getIcon, path, link, ...props }) => {
    const [dropdownPosition, setDropdownPosition] = useState('bottom-position');
    const dropRef = useRef(null);
    const menuButtonRef = useRef<HTMLElement>(null);
    const adjustDropdownPosition = () => {
      if (menuButtonRef.current && dropRef.current) {
        const inputBoxRect = menuButtonRef.current?.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const spaceAbove = inputBoxRect.top;
        const spaceBelow = viewportHeight - inputBoxRect.bottom;
        if ((spaceAbove > 90 && spaceBelow < 90) || (spaceAbove <= spaceBelow && spaceAbove > 90)) {
          setDropdownPosition('top-position');
        } else {
          setDropdownPosition('bottom-position');
        }
      }
    };

    return (
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
            {getToolTip?.(rowData)}
          </div>
        </div>
      </Cell>
    );
  }
);
