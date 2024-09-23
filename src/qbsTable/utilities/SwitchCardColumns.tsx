import React from 'react';
import { Link } from 'react-router-dom';
import { handleCellFormat } from './handleFormatCell';

export const CustomTableCell: React.FC<any> = React.memo(
  ({ rowData, renderCell, hideLink, dataKey, rowClick, type, path, link, viewMore }) => {
    return (
      <>
        {link && !path && !hideLink?.(rowData) ? (
          <a
            onClick={() => rowClick?.(rowData)}
            className={`qbs-table-row-link ${!viewMore ? 'line-clamp-1' : ''}`}
          >
            {renderCell ? renderCell(rowData)?.cell : handleCellFormat(rowData[dataKey], type)}
          </a>
        ) : path && !hideLink?.(rowData) ? (
          <Link
            to={path?.(rowData) ?? ''}
            className={`qbs-table-row-link ${!viewMore ? 'line-clamp-1' : ''}`}
          >
            {renderCell ? renderCell(rowData)?.cell : handleCellFormat(rowData[dataKey], type)}
          </Link>
        ) : (
          <>{renderCell ? renderCell(rowData)?.cell : handleCellFormat(rowData[dataKey], type)}</>
        )}
      </>
    );
  }
);
