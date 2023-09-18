import React, { FC, useEffect, useState } from 'react';

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
const PageIndex = ({ currentIndex, handleFirst, pageCount }) => {
  const renderPageNumbers = () => {
    const pageNumbers: any = [];

    // Add ellipsis if necessary
    if (currentIndex > 3) {
      pageNumbers.push('...');
    }

    for (let i = Math.max(1, currentIndex - 2); i <= Math.min(pageCount, currentIndex + 2); i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if necessary
    if (currentIndex < pageCount - 2) {
      pageNumbers.push('...');
    }

    return pageNumbers.map((pageNumber: any) => (
      <>
        {pageNumber !== '...' ? (
          <span
            key={pageNumber}
            onClick={() => handleFirst(pageNumber)}
            className={`block-item ${pageNumber === currentIndex ? 'selected' : ''}`}
          >
            {pageNumber}
          </span>
        ) : (
          <span
            key={pageNumber}
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
const Pagination: FC<PageProps> = ({ paginationProps }) => {
  const {
    dropOptions = [10, 20, 50, 100, 200],
    currentPage = 1,
    total = 100,
    onRowsPerPage,
    rowsPerPage = 10,
    onPagination
  } = paginationProps;

  const [currentIndex, setCurrenIndex] = useState<number>(currentPage ?? 1);
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);

  const dropData = dropOptions ?? [10, 20, 50, 100, 200];
  const [pageCount, setPageCount] = useState(1);
  const handleRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setRowsPerPageState(value);
    onRowsPerPage?.(value, currentIndex);
  };
  const handleFirst = (index: number) => {
    setCurrenIndex(index);
    onPagination?.(index, currentIndex);
  };

  const handleLast = () => {
    const value = pageCount ?? 0;
    setCurrenIndex(value);
    onPagination?.(value, currentIndex);
  };

  useEffect(() => {
    const calculatedPageCount = Math.ceil(total / rowsPerPageState);
    setPageCount(calculatedPageCount);
  }, [total, rowsPerPageState]);

  const handlePrevious = () => {
    setCurrenIndex(currentIndex - 1);
    onPagination?.(currentIndex - 1, currentIndex);
  };
  const handleNext = () => {
    setCurrenIndex(currentIndex + 1);
    onPagination?.(currentIndex + 1, currentIndex);
  };
  return (
    <div
      className={'custom-pagination'}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div>
        <select onChange={e => handleRowsPerPage(e)} className="dropdown" value={rowsPerPageState}>
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
          <PageIndex currentIndex={currentIndex} handleFirst={handleFirst} pageCount={pageCount} />
        </div>
        <button
          className="icon-container"
          disabled={currentIndex >= pageCount - 1}
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
          disabled={currentIndex == pageCount}
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
