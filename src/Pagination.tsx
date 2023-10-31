import React, { FC, useEffect, useState } from 'react';

import { getRowDisplayRange } from './qbsTable/utilities/tablecalc';

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
const PageIndex = ({ currentPage, handleFirst, pageCount }) => {
  const renderPageNumbers = () => {
    const pageNumbers: any = [];

    // Add ellipsis if necessary
    if (currentPage > 3) {
      pageNumbers.push('...');
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(pageCount, currentPage + 2); i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if necessary
    if (currentPage < pageCount - 2) {
      pageNumbers.push('...');
    }

    return pageNumbers.map((pageNumber: any) => (
      <>
        {pageNumber !== '...' ? (
          <span
            key={pageNumber}
            onClick={() => handleFirst(pageNumber)}
            className={`block-item ${pageNumber === currentPage ? 'selected' : ''}`}
          >
            {pageNumber}
          </span>
        ) : (
          <span
            key={pageNumber}
            className={`block-item ${pageNumber === currentPage ? 'selected' : ''}`}
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

  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);

  const dropData = dropOptions ?? [10, 20, 50, 100, 200];
  const [pageCount, setPageCount] = useState(1);
  const handleRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setRowsPerPageState(value);
    onRowsPerPage?.(value, currentPage);
  };
  const handleFirst = (index: number) => {
    // setCurrenIndex(index);
    onPagination?.(index, currentPage);
  };

  const handleLast = () => {
    const value = pageCount ?? 0;
    // setCurrenIndex(value);
    onPagination?.(value, currentPage);
  };
  // useEffect(() => {
  //   setCurrenIndex(currentPage);
  // }, [currentPage]);

  useEffect(() => {
    const calculatedPageCount = Math.ceil(total / rowsPerPageState);
    setPageCount(calculatedPageCount);
  }, [total, rowsPerPageState]);

  const handlePrevious = () => {
    // setCurrenIndex(currentPage - 1);
    onPagination?.(currentPage - 1, currentPage);
  };
  const handleNext = () => {
    // setCurrenIndex(currentPage + 1);
    onPagination?.(currentPage + 1, currentPage);
  };

  return (
    <div
      className={'qbs-table-custom-pagination'}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div className="rows-count">
        {getRowDisplayRange(
          paginationProps.total ?? 0,
          paginationProps.rowsPerPage ?? 0,
          paginationProps.currentPage ?? 0
        )}
      </div>
      <div className="qbs-table-pagination-right-block">
        <button
          className="qbs-table-icon-container"
          disabled={currentPage == 1}
          onClick={() => handleFirst(1)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16667 15.8333L3.33334 9.99996L9.16667 4.16663M15.8333 15.8333L10 9.99996L15.8333 4.16663"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          className="qbs-table-icon-container"
          disabled={currentPage < 2}
          onClick={() => handlePrevious()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15.8334L6.66666 10L12.5 4.16669"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div className="block-container">
          <PageIndex
            key={currentPage}
            currentPage={currentPage}
            handleFirst={handleFirst}
            pageCount={pageCount}
          />
        </div>
        <button
          className="qbs-table-icon-container"
          disabled={currentPage >= pageCount - 1}
          onClick={() => handleNext()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 4.16669L13.3333 10L7.5 15.8334"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          className="qbs-table-icon-container"
          disabled={currentPage == pageCount}
          onClick={() => handleLast()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8333 4.16663L16.6667 9.99996L10.8333 15.8333M4.16666 4.16663L10 9.99996L4.16666 15.8333"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="qbs-table-pagination-flexBox">
        <span className="qbs-table-pagination-text">Items per page</span>
        <select
          onChange={e => handleRowsPerPage(e)}
          className="qbs-table-pagination-dropdown"
          value={rowsPerPageState}
        >
          {dropData?.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Pagination;
