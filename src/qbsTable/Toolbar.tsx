import React from 'react';
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
  const handleSearch = (e?: string) => {
    debounce(() => {
      onSearch?.(e);
    }, 1000);
  };
  const handleChange = (e?: string) => {
    if (asyncSearch) {
      handleSearch(e);
    } else {
      handleSearchValue?.(e);
    }
  };
  return (
    <div className="toolbar">
      <div style={{ display: 'flex felx-end' }}>{title}</div>
      <div className="end-container">
        {pagination && (
          <div className='rows-count'>
            {getRowDisplayRange(
              paginationProps?.total as number,
              paginationProps?.rowsPerPage as number,
              paginationProps?.currentPage as number
            )}
          </div>
        )}
        <div>
          {search && (
            <SearchInput
              placeholder="Search"
              handleChange={e => handleChange(e)}
              handleSearch={e => handleSearch(e)}
              searchValue={searchValue}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ToolBar;
