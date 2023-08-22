import React, { useState, useEffect, FC } from 'react';
type PageProps = {
  paginationProps: {
    total?: number;
    rowsPerPage?: number;
    dropOptions?: number[];
    currentPage?: number;
    maxPage?: number;
    onRowsPerPage?: (row: number, page: number) => void;
    onPagination?: (row: number, page: number) => void;
  };
};
const Pagination: FC<PageProps> = ({ paginationProps }) => {
  const { dropOptions, currentPage, total, onRowsPerPage, rowsPerPage, onPagination } =
    paginationProps;
  const [rowsPage, seRowsPage] = useState<number>(rowsPerPage ?? 10);
  const [currentIndex, setCurrenIndex] = useState<number>(currentPage ?? 1);

  const dropData = dropOptions ?? [10, 20, 50, 100, 200];
  const [count, setCount] = useState(1);
  const handleRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    seRowsPage(value);
    onRowsPerPage && onRowsPerPage(value, currentIndex);
  };
  const handleFirst = (index: number) => {
    setCurrenIndex(index);
    onPagination && onPagination(index, currentIndex);
  };
  const handlePageIndex = () => {
    if (total) {
      const pageindex = Math.ceil(total / rowsPage);
      setCount(pageindex);
    }
  };
  const handleLast = () => {
    const value = count ?? 0;
    setCurrenIndex(value);
    onPagination && onPagination(value, currentIndex);
  };

  useEffect(() => {
    handlePageIndex();
  }, []);
  const PageIndex = () => {
    const renderPageNumbers = () => {
      const pageNumbers: any = [];

      // Add ellipsis if necessary
      if (currentIndex > 3) {
        pageNumbers.push('...');
      }

      for (let i = Math.max(1, currentIndex - 2); i <= Math.min(count, currentIndex + 2); i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if necessary
      if (currentIndex < count - 2) {
        pageNumbers.push('...');
      }

      return pageNumbers.map((pageNumber: any, index: number) => (
        <>
          {pageNumber !== '...' ? (
            <span
              key={index}
              onClick={() => handleFirst(pageNumber)}
              className={`block-item ${pageNumber === currentIndex ? 'selected' : ''}`}
            >
              {pageNumber}
            </span>
          ) : (
            <span
              key={index}
              className={`block-item ${pageNumber === currentIndex ? 'selected' : ''}`}
            >
              {pageNumber}
            </span>
          )}
        </>
      ));
    };

    return <>{renderPageNumbers()}</>;
  };
  const handlePrevious = () => {
    setCurrenIndex(currentIndex - 1);
    onPagination && onPagination(currentIndex - 1, currentIndex);
  };
  const handleNext = () => {
    setCurrenIndex(currentIndex + 1);
    onPagination && onPagination(currentIndex + 1, currentIndex);
  };
  return (
    <div
      className={'custom-pagination'}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div>
        <select onChange={e => handleRowsPerPage(e)} className="dropdown" value={rowsPage}>
          {dropData?.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="right-block">
        <button
          className="icon-container"
          disabled={currentIndex == 1}
          onClick={() => handleFirst(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="18"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="icon-container"
          disabled={currentIndex < 2}
          onClick={() => handlePrevious()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="18"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="block-container">
          <PageIndex />
        </div>
        <button
          className="icon-container"
          disabled={currentIndex >= count - 1}
          onClick={() => handleNext()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="18"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button
          className="icon-container"
          disabled={currentIndex == count}
          onClick={() => handleLast()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="18"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Pagination;
