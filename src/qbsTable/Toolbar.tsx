import React, { useCallback } from 'react';
import { QbsTableToolbarProps } from './commontypes';
import SearchInput from './SearchInput';
import { getRowDisplayRange } from './utilities/tablecalc';
import debounce from './debounce';

const ToolBar: React.FC<QbsTableToolbarProps> = ({
  title,
  pagination,
  paginationProps,
  search,
  onSearch,
  asyncSearch,
  handleSearchValue,
  searchValue
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
    <div className="toolbar">
      {title && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{title}</div>}
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
  );
};

export default ToolBar;
