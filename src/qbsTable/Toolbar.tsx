import React, { useCallback, useRef, useState } from 'react';

import { QbsTableToolbarProps } from './commontypes';
import debounce from './utilities/debounce';
import { CardView, TableView } from './utilities/icons';
import SearchInput from './utilities/SearchInput';
import { getRowDisplayRange } from './utilities/tablecalc';
import TooltipComponent from './utilities/ToolTip';

const ToolBar: React.FC<QbsTableToolbarProps> = ({
  pagination,
  paginationProps = {},
  search,
  onSearch,
  asyncSearch,
  handleSearchValue,
  searchValue,
  primaryFilter,
  advancefilter,
  className,
  tableHeaderActions,
  selectedRowActions,
  checkedKeys,
  onSelect,
  dataLength,
  searchPlaceholder,
  tableViewToggle,
  setTableViewToggle,
  enableTableToggle = false
}) => {
  const debouncedOnSearch = useCallback(debounce(onSearch ?? (() => {}), 1000), [onSearch]);
  const [searchParam, setSearchParam] = useState<string | undefined>(searchValue);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const handleSearch = useCallback(
    (e?: string) => {
      if (debouncedOnSearch) {
        debouncedOnSearch(e);
      }
    },
    [debouncedOnSearch]
  );

  const handleChange = useCallback(
    (e?: string) => {
      setSearchParam(e);
      if (asyncSearch) {
        handleSearch(e);
      } else {
        handleSearchValue?.(e);
      }
    },
    [asyncSearch, handleSearch, handleSearchValue]
  );
  const handleHide = (actions: any) => {
    if (actions.hidden) {
      return false;
    } else if (actions.customHide == '>2') {
      return checkedKeys && checkedKeys?.length >= 2 ? true : false;
    } else {
      return true;
    }
  };
  return (
    <div className="qbs-table-toolbar-container" ref={toolbarRef}>
      <div className={`qbs-table-toolbar ${className}`}>
        <div className="start-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="qbs-table-primary-filter">
            {search && (
              <SearchInput
                placeholder={searchPlaceholder ?? 'Search'}
                handleChange={handleChange}
                handleSearch={handleSearch}
                searchValue={searchParam}
              />
            )}
            {primaryFilter}
          </div>
        </div>

        <div className="end-container flex items-center">
          {tableHeaderActions}
          <div className=" pr-1 cursor-pointer relative  ">
            {!enableTableToggle && (
              <div className="qbs-table-top-icons flex gap-2">
                <TooltipComponent tableBodyRef={toolbarRef} title={'Switch to Table View'}>
                  <div onClick={() => setTableViewToggle?.(true)}>
                    <TableView className={`${tableViewToggle ? 'active' : ''}`} />
                  </div>
                </TooltipComponent>

                <div className="border-r h-4 w-1"></div>

                <div onClick={() => setTableViewToggle?.(false)}>
                  <TooltipComponent tableBodyRef={toolbarRef} title={'Switch to Card View'}>
                    <CardView className={`${!tableViewToggle ? 'active' : ''}`} />
                  </TooltipComponent>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {advancefilter && <div className="sub-qbs-table-toolbar">{advancefilter}</div>}
      {((pagination && dataLength > 0) || (checkedKeys && checkedKeys?.length > 0)) && (
        <div
          className={`qbs-table-toolbar-sub-container ${
            checkedKeys && checkedKeys?.length > 0 ? 'selected-row' : ''
          }`}
        >
          {checkedKeys && checkedKeys?.length > 0 ? (
            <div className="qbs-table-toolbar-sub-container-start">
              <div className="selected-row">{`Selected Items(${checkedKeys?.length}) `}</div>
              <div className="selected-row-action">
                <button className="btn" onClick={() => onSelect?.([])}>
                  Clear
                </button>
                {selectedRowActions?.map((actions, index: number) => (
                  <>
                    {handleHide(actions) && (
                      <button
                        key={index.toString()}
                        className="btn"
                        disabled={actions.disabled}
                        onClick={() => actions?.action(checkedKeys)}
                      >
                        {actions.actionTitle}
                      </button>
                    )}
                  </>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {pagination && paginationProps && dataLength > 0 && (
                <div className="rows-count">
                  {getRowDisplayRange(
                    paginationProps.total ?? 0,
                    paginationProps.rowsPerPage ?? 0,
                    paginationProps.currentPage ?? 0
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToolBar;
