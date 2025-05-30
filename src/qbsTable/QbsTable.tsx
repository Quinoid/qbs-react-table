import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Cell from '../Cell';
import Column from '../Column';
import ColumnGroup from '../ColumnGroup';
import HeaderCell from '../HeaderCell';
import Pagination from '../Pagination';
import Table from '../Table';
import useResponsiveStore from '../utils/useResponsiveStore';
import { QbsColumnProps, QbsTableProps } from './commontypes';
import {
  ActionCell,
  CheckCell,
  CustomRowStatus,
  CustomTableCell,
  ExpandCell
} from './CustomTableCell';
import ToolBar from './Toolbar';
import CardComponent from './utilities/CardComponent';
import CardLoader from './utilities/CardLoader';
import ColumToggle from './utilities/ColumShowHide';
import debounce from './utilities/debounce';
import { deepEqual } from './utilities/deepEqual';
import NoData from './utilities/empty';
import { SettingsIcon } from './utilities/icons';

// import 'qbs-react-table/dist/css/qbs-react-grid.css';

import '../../dist/css/qbs-react-grid.css';

const CHECKBOX_LINE_HEIGHT = '36px';
const COLUMN_WIDTH = 250;
const QbsTable: React.FC<QbsTableProps> = ({
  handleColumnSort,
  data,
  columns: propColumn,
  sortColumn,
  sortType,
  selection = false,
  onSelect,
  title = 'My Tabl',
  search = false,
  asyncSearch,
  searchValue,
  onSearch,
  handleSearchValue,
  paginationProps = {},
  pagination = false,
  cellBordered = false,
  bordered = false,
  minHeight,
  height = 630,
  onExpandChange,
  wordWrap,
  dataRowKey = 'id',
  defaultExpandAllRows,
  handleRowExpanded,
  shouldUpdateScroll = false,
  rowExpand = false,
  actionProps = [],
  theme,
  handleMenuActions,
  onRowClick,
  expandedRowKeys,
  setExpandedRowKeys,
  primaryFilter,
  advancefilter,
  classes = {},
  toolbar,
  columnToggle = true,
  handleColumnToggle,
  tableHeaderActions,
  isLoading,
  selectedRowActions,
  handleResetColumns,
  selectedRows,
  headerHeight = 40,
  tableBodyHeight,
  customRowStatus,
  searchPlaceholder,
  rowExpandedHeight = 317,
  renderSortIcon,
  tableKey = 'parent',
  renderEmpty,
  autoHeight,
  emptySubTitle,
  emptyTitle,
  tableView = true,
  enableTableToggle = false,
  cardColumLimit = 5,
  childDetailHeading = '',
  isCustomTableCardView = false,
  handleTableCardView,
  handleCustomCardLoader
}) => {
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState(propColumn);
  const [checkedKeys, setCheckedKeys] = useState<(number | string)[]>([]);
  const dataTheme = useMemo(() => localStorage.getItem('theme') ?? theme, [theme]);
  const [isOpen, setIsOpen] = useState(false);
  const prevColumns = useRef<any | null>(null);
  const [tableViewToggle, setTableViewToggle] = useState(tableView);
  const isMobile = useResponsiveStore();
  const tableBodyRef = useRef<HTMLDivElement>(null);
  const handleSortColumn = useCallback(
    (sortColumn: any, sortType: any) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        handleColumnSort?.(sortColumn, sortType);
      }, 500);
    },
    [handleColumnSort]
  );
  useEffect(() => {
    if (selectedRows) {
      setCheckedKeys(selectedRows ?? ([] as (number | string)[]));
    } else {
      setCheckedKeys([]);
    }
  }, [selectedRows]);

  const handleChecked = debounce((keys?: any) => {
    onSelect?.(keys);
  }, 500);

  const handleCheckAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const keys = event.target.checked ? data.map(item => item.id) : [];
      //  let updatedKeys = [...keys];
      //  if (checkedKeys) {
      //    updatedKeys = [...checkedKeys, ...updatedKeys];
      //  } TODO => previous bug fix removed this section
      const updatedKeys = [...keys];
      setCheckedKeys(updatedKeys);
      handleChecked(updatedKeys);
    },
    [data]
  );

  const handleCheck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value !== undefined) {
        const updatedKeys = event.target.checked
          ? [...checkedKeys, value]
          : checkedKeys.filter(key => key !== value);
        setCheckedKeys(updatedKeys);
        handleChecked(updatedKeys);
      }
    },

    [checkedKeys]
  );

  const handleToggle = useCallback(
    (columnName: string) => {
      let lastVisibleColumn: any = null;
      let visibleCount = 0;

      const updatedColumns = columns?.map(col => {
        // Toggle visibility for the matched column
        if (col.title === columnName) {
          col = { ...col, isVisible: !col.isVisible };
        }
        if (col.isVisible) {
          lastVisibleColumn = col;
          visibleCount++;
        }

        return col;
      });

      if (visibleCount > 0 && lastVisibleColumn) {
        updatedColumns.forEach(col => {
          if (col.field === lastVisibleColumn?.field && col.title === lastVisibleColumn.title) {
            col.resizable = false;
          } else {
            col.resizable = true;
          }
        });
      }

      setColumns(updatedColumns);
    },
    [columns]
  );

  const handleColumnWidth = useCallback((newWidth?: number, dataKey?: any) => {
    if (newWidth === undefined || dataKey === undefined) return;
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.field === dataKey ? { ...column, colWidth: newWidth } : column
      )
    );
  }, []);

  useEffect(() => {
    if (wordWrap === 'fit-content') {
      setColumns(prevColumns =>
        prevColumns.map(column =>
          column.field ? { ...column, colWidth: calculateWidth(column.field) } : column
        )
      );
    }
  }, [wordWrap]);

  const onReorder = useCallback((columns: QbsColumnProps[]) => {
    setColumns(columns);
  }, []);

  // useEffect(() => {
  // }, [columns]);

  const handleClear = ([]) => {
    setCheckedKeys([]);
    handleChecked([]);
  };
  const toolbarProps = {
    title: title,
    search: search,
    searchValue: searchValue,
    pagination: pagination,
    onSearch: onSearch,
    handleSearchValue: handleSearchValue,
    asyncSearch: asyncSearch,
    paginationProps: paginationProps,
    primaryFilter: primaryFilter,
    advancefilter: advancefilter,
    className: classes?.toolbarClass,
    handleToggle: handleToggle,
    onReorder: onReorder,
    columnToggle: columnToggle,
    columns: columns,
    checkedKeys: checkedKeys,
    tableHeaderActions: tableHeaderActions,
    selectedRowActions: selectedRowActions,
    onSelect: handleClear,
    handleColumnToggle: handleColumnToggle,
    dataLength: data?.length,
    searchPlaceholder: searchPlaceholder,
    setTableViewToggle: setTableViewToggle,
    tableViewToggle: tableViewToggle,
    enableTableToggle: enableTableToggle
  };
  const themeToggle = useMemo(() => document.getElementById('themeToggle') as HTMLInputElement, []);

  useEffect(() => {
    const handleThemeToggle = () => {
      if (themeToggle?.checked) {
        document.body.setAttribute('data-theme', 'dark');
      } else {
        document.body.removeAttribute('data-theme');
      }
    };

    const handleDOMContentLoaded = () => {
      if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (themeToggle) {
          themeToggle.checked = true;
        }
      }
    };

    themeToggle?.addEventListener('change', handleThemeToggle);
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    return () => {
      themeToggle?.removeEventListener('change', handleThemeToggle);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, [themeToggle]);

  const handleExpanded = useCallback(
    (rowData: any) => {
      console.log(rowData);
      const keyValue = dataRowKey as string;
      const key = rowData[keyValue];

      const nextExpandedRowKeys = new Set(expandedRowKeys);

      if (nextExpandedRowKeys.has(key)) {
        nextExpandedRowKeys.delete(key);
      } else {
        nextExpandedRowKeys.add(key);
      }

      setExpandedRowKeys?.(Array.from(nextExpandedRowKeys));
    },
    [dataRowKey, expandedRowKeys, setExpandedRowKeys]
  );

  const calculateWidth = (str: string, fontSize = 8, characterWidth = 1) => {
    const result = findLargestCell(str) * fontSize * characterWidth;
    return result > 60 ? result : 60;
  };

  function findLargestCell(columnTitle: string) {
    let largestCellLength = 0;
    data.forEach(row => {
      if (row[columnTitle] && String(row[columnTitle]).length > largestCellLength) {
        largestCellLength = String(row[columnTitle]).length;
      }
    });

    return largestCellLength;
  }
  const handleColumnsResizable = useCallback(() => {
    const filteredColumns = columns?.filter(item => item.isVisible);
    const length = filteredColumns?.length ?? 0;
    const lastVisibleColumn = filteredColumns[length - 1];
    const reColumns = columns?.map(item =>
      item?.field === lastVisibleColumn?.field ? { ...item, resizable: false } : item
    );
    setColumns(reColumns);
  }, [columns]);

  useEffect(() => {
    setColumns(propColumn);
  }, [propColumn]);

  useEffect(() => {
    if (!deepEqual(columns, prevColumns.current)) {
      handleColumnsResizable();
    }
    prevColumns.current = columns;
  }, [columns, handleColumnsResizable]);

  useEffect(() => {
    if (tableView) {
      setTableViewToggle(!isMobile);
    } else {
      setTableViewToggle(false);
    }
  }, [isMobile]);

  const findGrouped = () => {
    return columns?.find(item => item.grouped) ? true : false;
  };
  // const columnsRendered: React.ReactElement[] = useMemo(
  //   () =>
  //     (columns ?? []).map(
  //       ({
  //         title,
  //         field,
  //         resizable,
  //         sortable,
  //         colWidth,
  //         align,
  //         grouped,
  //         groupHeader,
  //         fixed,
  //         children,
  //         customCell,
  //         renderCell,
  //         isVisible,
  //         link,
  //         getPath,
  //         rowClick,
  //         sortKey,
  //         type,
  //         hideLink
  //       }) =>
  //         isVisible &&
  //         (grouped ? (
  //           <ColumnGroup
  //             header={groupHeader}
  //             fixed={fixed}
  //             align={align}
  //             verticalAlign="middle"
  //             groupHeaderHeight={40}
  //           >
  //             {children?.map(child => (
  //               <Column
  //                 key={child.title}
  //                 sortable={child.sortable}
  //                 width={child.colWidth ?? COLUMN_WIDTH}
  //                 resizable={child.resizable}
  //                 align={child.align}
  //                 onResize={handleColumnWidth}
  //                 fixed={child.fixed}
  //               >
  //                 <HeaderCell
  //                   dataTheme={dataTheme}
  //                   verticalAlign={'middle'}
  //                   className={` ${classes.headerClass}`}
  //                   sortKey={child.sortKey}
  //                   renderSortIcon={renderSortIcon}
  //                 >
  //                   {child.title}
  //                 </HeaderCell>
  //                 {child.customCell || child.link ? (
  //                   <CustomTableCell
  //                     renderCell={child.renderCell}
  //                     dataKey={child.field}
  //                     dataTheme={dataTheme}
  //                     type={child.type}
  //                     path={child.getPath}
  //                     link={child.link}
  //                   />
  //                 ) : (
  //                   <Cell
  //                     className={` ${classes.cellClass}`}
  //                     dataKey={child.field}
  //                     dataTheme={dataTheme}
  //                   />
  //                 )}
  //               </Column>
  //             ))}
  //           </ColumnGroup>
  //         ) : (
  //           <Column
  //             key={title}
  //             sortable={sortable}
  //             width={colWidth ?? COLUMN_WIDTH}
  //             resizable={resizable}
  //             align={align}
  //             fixed={fixed}
  //             onResize={handleColumnWidth}
  //           >
  //             <HeaderCell
  //               dataTheme={dataTheme}
  //               verticalAlign={findGrouped() ? 'middle' : undefined}
  //               className={` ${classes.headerClass}`}
  //               sortKey={sortKey}
  //               renderSortIcon={renderSortIcon}
  //             >
  //               {title}
  //             </HeaderCell>
  //             {customCell || link ? (
  //               <CustomTableCell
  //                 renderCell={renderCell}
  //                 dataKey={field}
  //                 rowClick={rowClick}
  //                 type={type}
  //                 hideLink={hideLink}
  //                 path={getPath}
  //                 dataTheme={dataTheme}
  //                 link={link}
  //               />
  //             ) : (
  //               <Cell dataKey={field} dataTheme={dataTheme} className={` ${classes.cellClass}`} />
  //             )}
  //           </Column>
  //         ))
  //     ),
  //   [columns, dataTheme]
  // );
  const columnsRendered: React.ReactElement[] = useMemo(
    () =>
      (columns ?? [])
        .map(
          ({
            title,
            field,
            resizable,
            sortable,
            colWidth,
            align,
            grouped,
            groupHeader,
            fixed,
            children,
            customCell,
            renderCell,
            isVisible,
            link,
            getPath,
            rowClick,
            sortKey,
            type,
            hideLink
          }) =>
            isVisible ? (
              grouped ? (
                <ColumnGroup
                  header={groupHeader}
                  fixed={fixed}
                  align={align}
                  verticalAlign="middle"
                  groupHeaderHeight={40}
                >
                  {children?.map(child => (
                    <Column
                      key={child.title}
                      sortable={child.sortable}
                      width={child.colWidth ?? COLUMN_WIDTH}
                      resizable={child.resizable}
                      align={child.align}
                      onResize={handleColumnWidth}
                      fixed={child.fixed}
                    >
                      <HeaderCell
                        dataTheme={dataTheme}
                        verticalAlign="middle"
                        className={` ${classes.headerClass}`}
                        sortKey={child.sortKey}
                        renderSortIcon={renderSortIcon}
                      >
                        {child.title}
                      </HeaderCell>
                      {child.customCell || child.link ? (
                        <CustomTableCell
                          renderCell={child.renderCell}
                          dataKey={child.field}
                          dataTheme={dataTheme}
                          type={child.type}
                          path={child.getPath}
                          link={child.link}
                        />
                      ) : (
                        <Cell
                          className={` ${classes.cellClass}`}
                          dataKey={child.field}
                          dataTheme={dataTheme}
                        />
                      )}
                    </Column>
                  ))}
                </ColumnGroup>
              ) : (
                <Column
                  key={title}
                  sortable={sortable}
                  width={colWidth ?? COLUMN_WIDTH}
                  resizable={resizable}
                  align={align}
                  fixed={fixed}
                  onResize={handleColumnWidth}
                >
                  <HeaderCell
                    dataTheme={dataTheme}
                    verticalAlign={findGrouped() ? 'middle' : undefined}
                    className={` ${classes.headerClass}`}
                    sortKey={sortKey}
                    renderSortIcon={renderSortIcon}
                  >
                    {title}
                  </HeaderCell>
                  {customCell || link ? (
                    <CustomTableCell
                      renderCell={renderCell}
                      dataKey={field}
                      rowClick={rowClick}
                      type={type}
                      hideLink={hideLink}
                      path={getPath}
                      dataTheme={dataTheme}
                      link={link}
                    />
                  ) : (
                    <Cell
                      dataKey={field}
                      dataTheme={dataTheme}
                      className={` ${classes.cellClass}`}
                    />
                  )}
                </Column>
              )
            ) : null // ✅ Fix: Return `null` instead of `false`
        )
        .filter(Boolean) as React.ReactElement[], // ✅ Fix: Type assertion to ReactElement[]
    [columns, dataTheme]
  );

  return (
    <div className={`qbs-table ${classes.tableContainerClass}`} data-theme={dataTheme}>
      {toolbar && <ToolBar {...toolbarProps} />}
      <div className="qbs-table-border-wrap">
        {tableViewToggle ? (
          <Table
            height={autoHeight ? undefined : height}
            key={tableKey}
            tableKey={tableKey}
            data={data}
            tableBodyRef={tableBodyRef as React.RefObject<HTMLDivElement>}
            dataTheme={dataTheme}
            wordWrap={wordWrap}
            autoHeight={autoHeight}
            sortColumn={sortColumn}
            style={{ position: 'relative' }}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            onRowClick={onRowClick}
            tableBodyHeight={tableBodyHeight}
            cellBordered={cellBordered}
            bordered={bordered}
            renderEmpty={(info: React.ReactNode) =>
              renderEmpty ? (
                renderEmpty(info)
              ) : (
                <NoData title={emptyTitle ?? 'No Data Found'} subtitle={emptySubTitle} />
              )
            }
            columns={columns}
            minHeight={minHeight}
            headerHeight={headerHeight}
            rowExpandedHeight={rowExpandedHeight}
            loading={isLoading ?? loading}
            showHeader
            defaultChecked
            expandedRowKeys={expandedRowKeys}
            onExpandChange={onExpandChange}
            rowKey={dataRowKey ?? 'id'}
            defaultExpandAllRows={defaultExpandAllRows}
            shouldUpdateScroll={shouldUpdateScroll}
            renderRowExpanded={rowData => {
              return handleRowExpanded?.(rowData);
            }}
          >
            {rowExpand && (
              <Column width={70} align="center" fixed="left">
                <HeaderCell
                  verticalAlign={findGrouped() ? 'middle' : undefined}
                  className={` ${classes.headerlClass}`}
                  renderSortIcon={renderSortIcon}
                >
                  #
                </HeaderCell>
                <ExpandCell
                  dataKey={dataRowKey}
                  expandedRowKeys={expandedRowKeys}
                  onChange={handleExpanded}
                />
              </Column>
            )}
            {selection && (
              <Column width={50} align="center" fixed="left">
                <HeaderCell
                  style={{ padding: 0 }}
                  verticalAlign={findGrouped() ? 'middle' : undefined}
                  dataTheme={dataTheme}
                  renderSortIcon={renderSortIcon}
                  className={`qbs-checkbox-border-none ${classes.headerlClass}`}
                >
                  <div
                    style={{ lineHeight: CHECKBOX_LINE_HEIGHT }}
                    className={`qbs-table-checkbox ${classes.selectionCell}`}
                  >
                    <input
                      type="checkbox"
                      onChange={handleCheckAll}
                      id={'checkbox-all'}
                      className={`qbs-table-checkbox-input ${classes.tableCheckBoxClass}`}
                      checked={
                        data?.length > 0 && data.every(item => checkedKeys?.includes(item.id))
                      }
                    />
                    <label htmlFor={'checkbox-all'}>
                      <svg
                        width="8"
                        height="6"
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 3.21739L2.89883 6L8 1.06994L6.89494 0L2.89883 3.86768L1.09728 2.14745L0 3.21739Z"
                          fill="white"
                        />
                      </svg>
                    </label>
                  </div>
                </HeaderCell>
                <CheckCell
                  dataKey="id"
                  checkedKeys={checkedKeys}
                  className={`${classes.tableCheckBoxClass}`}
                  onChange={handleCheck}
                  dataTheme={dataTheme}
                />
              </Column>
            )}
            {customRowStatus && Object.keys(customRowStatus)?.length > 0 && (
              <Column width={50} align="center" fixed="left">
                <HeaderCell
                  verticalAlign={findGrouped() ? 'middle' : undefined}
                  className={` ${classes.headerlClass}`}
                  renderSortIcon={renderSortIcon}
                >
                  {' '}
                </HeaderCell>
                <CustomRowStatus
                  getIcon={customRowStatus.getIcon}
                  dataKey={customRowStatus.field}
                  rowClick={customRowStatus.onClick}
                  path={customRowStatus.getPath}
                  link={customRowStatus.link}
                  getToolTip={customRowStatus.getToolTip}
                />
              </Column>
            )}
            {columnsRendered}
            {!actionProps ||
              (actionProps?.length === 0 && columnToggle && (
                <Column width={40} fixed="right">
                  <HeaderCell
                    verticalAlign={findGrouped() ? 'middle' : undefined}
                    className={` ${classes.headerlClass}`}
                    dataTheme={dataTheme}
                    renderSortIcon={renderSortIcon}
                  >
                    <ColumToggle
                      columns={columns}
                      onToggle={handleToggle}
                      onReorder={onReorder}
                      isOpen={isOpen}
                      tableHeight={height}
                      setIsOpen={setIsOpen}
                      handleResetColumns={handleResetColumns}
                      handleColumnToggle={handleColumnToggle}
                    />
                  </HeaderCell>
                  <Cell />
                </Column>
              ))}
            {actionProps && actionProps?.length > 0 && (
              <Column width={40} fixed="right">
                <HeaderCell
                  verticalAlign={findGrouped() ? 'middle' : undefined}
                  className={` ${classes.headerlClass}`}
                  dataTheme={dataTheme}
                  renderSortIcon={renderSortIcon}
                >
                  {!columnToggle ? (
                    <SettingsIcon />
                  ) : (
                    <ColumToggle
                      columns={columns}
                      onToggle={handleToggle}
                      tableHeight={height}
                      onReorder={onReorder}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      handleResetColumns={handleResetColumns}
                      handleColumnToggle={handleColumnToggle}
                    />
                  )}
                </HeaderCell>
                <ActionCell
                  tableBodyRef={tableBodyRef}
                  actionProps={actionProps}
                  className={`${classes.cellClass} ${classes.actionCellClass}`}
                  handleMenuActions={handleMenuActions}
                  dataTheme={dataTheme}
                />
              </Column>
            )}
          </Table>
        ) : (
          <div
            className={
              isCustomTableCardView && (data?.length === 0 || !data) && !isLoading
                ? 'qbs-card-empty-wrapper'
                : isCustomTableCardView
                ? 'qbs-card-wrapper'
                : ' p-2'
            }
            style={{
              overflow: !tableViewToggle ? 'auto' : '',
              maxHeight: !tableViewToggle ? height : '',
              minHeight: !tableViewToggle ? height : ''
            }}
          >
            {(data?.length === 0 || !data) && !isLoading && (
              <div className="flex flex-col gap-2 p-2 mt-6 card-empty-container">
                <NoData title={emptyTitle ?? 'No Data Found'} subtitle={emptySubTitle} />
              </div>
            )}
            {isLoading ? (
              handleCustomCardLoader ? (
                <>{handleCustomCardLoader()}</>
              ) : (
                <div className="flex flex-col gap-2 p-2">
                  <CardLoader />
                </div>
              )
            ) : (
              data.map((items: any) => (
                <div
                  className={isCustomTableCardView ? 'qbs-card-single' : 'flex flex-col gap-3 p-2'}
                  key={items?.id}
                >
                  {isCustomTableCardView ? (
                    handleTableCardView?.(items) ?? <></>
                  ) : (
                    <CardComponent
                      data={items}
                      cardColumLimit={cardColumLimit}
                      childDetailHeading={childDetailHeading}
                      columns={columns}
                      tableBodyRef={tableBodyRef}
                      actionProps={actionProps}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        )}
        <div>
          {pagination && data?.length > 0 && <Pagination paginationProps={paginationProps} />}
        </div>
      </div>
    </div>
  );
};

export default QbsTable;
