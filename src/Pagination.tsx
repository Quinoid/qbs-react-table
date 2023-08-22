import React, { useState, FC } from 'react';
type PageProps = {
  paginationProps: {
    total?: number;
    rowsPerPage?: number;
    dropOptions?: number[];
    currentPage?: number;
    maxPage?: number;
    onRowsPerPage?: (value: number) => void;
  };
};
const Pagination: FC<PageProps> = ({ paginationProps }) => {
  //   const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
  //   const classes = merge(className, withClassPrefix());
  const { dropOptions, currentPage, total, onRowsPerPage, rowsPerPage } = paginationProps;
  const [rowsPage, seRowsPage] = useState<number>(rowsPerPage ?? 10);
  const dropData = dropOptions ?? [10, 20, 50, 100, 200];
  const handleRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    seRowsPage(value);
    onRowsPerPage && onRowsPerPage(value);
  };
  const handleFirst = () => {
    seRowsPage(1);
    onRowsPerPage && onRowsPerPage(1);
  };
  const handlePageIndex = () => {
    if (total) {
      const pageindex = Math.ceil(total / rowsPage);
      return pageindex;
    } else return 0;
  };
  const handleLast = () => {
    const value = handlePageIndex() ?? 0;
    seRowsPage(value);
    onRowsPerPage && onRowsPerPage(value);
  };
  console.log(handlePageIndex());
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
        <span className="icon-container" onClick={() => handleFirst()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="15"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="15"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        <div className="block-container">
          {[...Array(10)].map((_, index) => (
            <span key={index} className="block-item">
              {index + 1}
            </span>
          ))}
          <span className="block-item">1</span>
          <span className="block-item">2</span>
          <span className="block-item">3</span>
          <span className="block-item">4</span>
          <span className="block-item">5</span>
        </div>
        <span className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="15"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="icon-container" onClick={() => handleLast()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="15"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};
export default Pagination;
