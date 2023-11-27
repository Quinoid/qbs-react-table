import React, { memo, useCallback } from 'react';

export interface SearchProps {
  placeholder: string;
  handleChange: (value: string) => void;
  searchValue: string | undefined;
  handleSearch: (value?: string) => void;
}
const SearchInput: React.FC<SearchProps> = ({
  placeholder,
  handleChange,
  searchValue,
  handleSearch
}) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    },
    [handleChange]
  );
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSearch(searchValue);
    },
    [handleSearch, searchValue]
  );

  const handleClear = useCallback(() => {
    handleChange('');
  }, [handleChange]);
  return (
    <div className="qbs-table-search-container" role="search">
      <form onSubmit={handleSubmit}>
        <input
          className="input textfield relative pl-1 w-full"
          placeholder={placeholder}
          value={searchValue ?? ''}
          onChange={handleInputChange}
          aria-label="Search"
        />
        <button
          className="search-button absolute left-1 bottom-1.5 bg-white text-grey-dark"
          onClick={() => handleSearch(searchValue)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        {searchValue && (
          <button
            className=" close-button absolute right-7 bottom-2 bg-white"
            onClick={handleClear}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};
export default memo(SearchInput);
