import React, { useState } from 'react';
import { QbsColumnProps } from '../commontypes';
import CardMenuDropdown from './CardMenuDropdown';
import { CustomTableCell } from './SwitchCardColumns';
import { handleCellFormat } from './handleFormatCell';
import { ArrowUpIcon } from './icons';

type Props = {
  columns: QbsColumnProps[];
  data: any;
  tableBodyRef: any;
  actionProps?: any;
  index?: number;
  handleMenuActions?: () => void;
};

const CardComponent: React.FC<Props> = ({
  columns,
  data,
  tableBodyRef,
  actionProps,
  index,
  handleMenuActions
}) => {
  const [viewMore, setViewMore] = useState(false);
  const initialDisplayCount = 5;

  const toggleViewMore = () => {
    setViewMore(!viewMore);
  };

  const displayedColumns = viewMore ? columns : columns.slice(0, initialDisplayCount);

  return (
    <div className="grid grid-cols-5 p-3 gap-3 border-2 border-grey shadow-sm rounded-lg relative qbs-card-container">
      {displayedColumns.map((col: QbsColumnProps, index: number) => (
        <div key={index} className="grid col-span-1 place-content-start text-sm qbs-card-column">
          <p className=" text-grey ">{col.title}</p>
          {col.customCell || col.link ? (
            <span
              className={`qbs-card-column-content mt-1 font-semibold ${
                !viewMore ? 'line-clamp-1' : ''
              }`}
            >
              <CustomTableCell
                dataKey={col.field}
                rowData={data}
                type={col.type}
                path={col.getPath}
                link={col.link}
                viewMore={viewMore}
                rowClick={col.rowClick}
                renderCell={col.renderCell}
              />
            </span>
          ) : (
            <p
              className={`mt-1 font-semibold qbs-card-column-content ${
                !viewMore ? 'line-clamp-1' : ''
              }`}
              key={index}
            >
              {handleCellFormat(data[col.field], col.type as string)}
            </p>
          )}
        </div>
      ))}
      <div
        className={`qbs-card-column-action absolute  text-blue-500 mt-2 right-2 ${
          columns.length > initialDisplayCount ? 'top-2' : 'top-4'
        }  text-xs`}
      >
        <div
          className={`flex  qbs-card-column-action-container
               flex-col   items-center gap-y-2
          `}
        >
          <div className="  text-blue-500 qbs-card-column-action-menu ">
            <CardMenuDropdown
              tableBodyRef={tableBodyRef}
              actionDropDown={actionProps}
              rowData={data}
              iconName="more"
              rowIndex={index}
              handleMenuActions={handleMenuActions}
            />
          </div>
          {columns.length > initialDisplayCount && (
            <button
              onClick={toggleViewMore}
              className=" qbs-card-column-action-menu-view-more justify-end text-blue-500 text-xs"
            >
              <ArrowUpIcon className={`${viewMore ? 'rotate-180' : ''} `} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
