import React, { useCallback, useRef, useState } from 'react';

import useResponsiveStore from '../utils/useResponsiveStore';
import { QbsTableToolbarProps } from './commontypes';
import debounce from './utilities/debounce';
import { CardView, ContentView, DefaultView, ExpandIcon, TableView } from './utilities/icons';
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
  enableTableToggle = false,
  rowViewToggle = false,
  defaultRowView = true,
  fullWidthView = false,
  setTableFullView,
  setRowViewToggle
}) => {
  const debouncedOnSearch = useCallback(debounce(onSearch ?? (() => {}), 1000), [onSearch]);
  const [searchParam, setSearchParam] = useState<string | undefined>(searchValue);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
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
  const isMobile = useResponsiveStore();
  const handleFilterClick = () => {
    setIsOpen(!isOpen);
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
            {!isMobile && primaryFilter}
          </div>
        </div>

        <div className="end-container flex items-center">
          {isMobile && (primaryFilter || advancefilter) && (
            <span className="qbs-filter-icon cursor-pointer " onClick={handleFilterClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </span>
          )}
          {tableHeaderActions}
          <div className=" pr-1 cursor-pointer relative table_custom_ctions   ">
            {rowViewToggle && (
              <div className="flex gap-2 qbs-row-switch-cntainer">
                <div className="flex gap-2 table_cell_style">
                  <TooltipComponent tableBodyRef={toolbarRef} title={'Switch to Default View'}>
                    <div onClick={() => setRowViewToggle?.(true)}>
                      <DefaultView className={`${defaultRowView ? 'active' : ''}`} />
                    </div>
                  </TooltipComponent>
                  <TooltipComponent tableBodyRef={toolbarRef} title={'Switch to Compact View'}>
                    <div onClick={() => setRowViewToggle?.(false)}>
                      <ContentView className={`${!defaultRowView ? 'active' : ''}`} />
                    </div>
                  </TooltipComponent>
                </div>
                <div className=" table_full_width">
                  <TooltipComponent tableBodyRef={toolbarRef} title={'Switch to Full Screen'}>
                    <div onClick={() => setTableFullView?.(!fullWidthView)}>
                      <ExpandIcon className={`${fullWidthView ? 'active' : ''}`} />
                    </div>
                  </TooltipComponent>
                </div>
              </div>
            )}

            {enableTableToggle && !isMobile && (
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
      {isMobile && isOpen && (
        <div className="qbs-table-primary-filter flex flex-col gap-3 ">{primaryFilter}</div>
      )}
      {advancefilter && (
        <div className="sub-qbs-table-toolbar">
          {isMobile ? isOpen && advancefilter : advancefilter}
        </div>
      )}

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
