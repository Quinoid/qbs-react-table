import React from 'react';

import Cell from '../Cell';
import MenuDropDown from './utilities/menuDropDown';
const CHECKBOX_LINE_HEIGHT = '46px';
export const CheckCell: React.FC<any> = React.memo(
  ({ rowData, onChange, checkedKeys, dataKey, dataTheme, ...props }) => (
    <Cell {...props} style={{ padding: 0 }} dataTheme={dataTheme}>
      <div style={{ lineHeight: CHECKBOX_LINE_HEIGHT }}>
        <input
          type="checkbox"
          value={rowData[dataKey]}
          onChange={onChange}
          checked={checkedKeys.includes(rowData[dataKey])}
        />
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
  ({ rowData, renderCell, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props}>{renderCell(rowData)}</Cell>
  )
);
