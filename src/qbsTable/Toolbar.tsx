import React, { useCallback } from 'react';

import { QbsTableToolbarProps } from './commontypes';
import debounce from './utilities/debounce';
import SearchInput from './utilities/SearchInput';
import { getRowDisplayRange } from './utilities/tablecalc';

const ToolBar: React.FC<QbsTableToolbarProps> = ({
  title,
  pagination,
  paginationProps = {},
  search,
  onSearch,
  asyncSearch,
  handleSearchValue,
  searchValue,
  primaryFilter,
  advancefilter,
  className
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
    <div>
      <div className={`qbs-table-toolbar ${className}`}>
        {title && (
          <div className="start-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {title}
            <div className="qbs-table-primary-filter">{primaryFilter}</div>
          </div>
        )}
        <div className="end-container">
          {pagination && paginationProps && (
            <div className="rows-count">
              {getRowDisplayRange(
                paginationProps.total ?? 0,
                paginationProps.rowsPerPage ?? 0,
                paginationProps.currentPage ?? 0
              )}
            </div>
          )}
          {search && (
            <SearchInput
              placeholder="Search"
              handleChange={handleChange}
              handleSearch={handleSearch}
              searchValue={searchValue}
            />
          )}
        </div>
      </div>
      <div className="sub-qbs-table-toolbar">{advancefilter}</div>
    </div>
  );
};

export default ToolBar;
