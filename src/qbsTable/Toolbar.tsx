import React, { useCallback } from 'react';

import { QbsTableToolbarProps } from './commontypes';
import debounce from './utilities/debounce';
import SearchInput from './utilities/SearchInput';
import { getRowDisplayRange } from './utilities/tablecalc';

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
  checkedKeys
}) => {
  const debouncedOnSearch = useCallback(debounce(onSearch ?? (() => {}), 1000), [onSearch]);

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
      if (asyncSearch) {
        handleSearch(e);
      } else {
        handleSearchValue?.(e);
      }
    },
    [asyncSearch, handleSearch, handleSearchValue]
  );

  return (
    <div className="qbs-table-toolbar-container">
      <div className={`qbs-table-toolbar ${className}`}>
        <div className="start-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {search && (
            <SearchInput
              placeholder="Search"
              handleChange={handleChange}
              handleSearch={handleSearch}
              searchValue={searchValue}
            />
          )}
          <div className="qbs-table-primary-filter">{primaryFilter}</div>
        </div>

        <div className="end-container">{tableHeaderActions}</div>
      </div>
      {advancefilter && <div className="sub-qbs-table-toolbar">{advancefilter}</div>}
      <div
        className={`qbs-table-toolbar-sub-container ${
          checkedKeys && checkedKeys?.length > 0 ? 'selected-row' : ''
        }`}
      >
        {checkedKeys && checkedKeys?.length > 0 ? (
          <div className="qbs-table-toolbar-sub-container-start">
            <div className="selected-row">{`Selected Items(${checkedKeys?.length}) `}</div>
            <div>{selectedRowActions}</div>
          </div>
        ) : (
          <div>
            {pagination && paginationProps && (
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
    </div>
  );
};

export default ToolBar;
