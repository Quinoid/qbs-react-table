import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Cell from '../Cell';
import Column from '../Column';
import ColumnGroup from '../ColumnGroup';
import HeaderCell from '../HeaderCell';
import Pagination from '../Pagination';
import Table from '../Table';
import { QbsTableProps, QbsColumnProps } from './commontypes';
import { ActionCell, CheckCell, CustomTableCell, ExpandCell } from './CustomTableCell';
import ToolBar from './Toolbar';

const CHECKBOX_LINE_HEIGHT = '46px';
const COLUMN_WIDTH = 250;

const QbsTable: React.FC<QbsTableProps> = ({
  handleColumnSort,
  data,
  columns: propColumn,
  sortColumn,
  sortType,
  selection = false,
  onSelect,
  title = 'My Table',
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
  height = 550,
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
  columnToggle,
  handleColumnToggle
}) => {
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState(propColumn);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const dataTheme = useMemo(() => localStorage.getItem('theme') ?? theme, [theme]);

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
  const handleCheckAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const keys = event.target.checked ? data.map(item => item.id) : [];
      setCheckedKeys(keys);
    },
    [data]
  );

  const handleCheck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = +event.target.value;
      const updatedKeys = event.target.checked
        ? [...checkedKeys, value]
        : checkedKeys.filter(key => key !== value);
      setCheckedKeys(updatedKeys);
    },
    [checkedKeys]
  );
  useEffect(() => {
    onSelect?.(checkedKeys);
  }, [checkedKeys, onSelect]);

  const handleToggle = useCallback((columnName: string) => {
    setColumns(cols =>
      cols.map(col => (col.title === columnName ? { ...col, isVisible: !col.isVisible } : col))
    );
  }, []);

  const handleColumnWidth = useCallback((newWidth?: number, dataKey?: any) => {
    if (newWidth === undefined || dataKey === undefined) return;
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.field === dataKey ? { ...column, colWidth: newWidth } : column
      )
    );
  }, []);

  const onReorder = useCallback((columns: QbsColumnProps[]) => {
    setColumns(columns);
  }, []);

  useEffect(() => {
    handleColumnToggle?.(columns);
  }, [columns, handleColumnToggle]);

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
    columns: columns
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
      const keyValue = dataRowKey as string;
      const key = rowData[keyValue];

      let nextExpandedRowKeys = new Set(expandedRowKeys);

      if (nextExpandedRowKeys.has(key)) {
        nextExpandedRowKeys.delete(key);
      } else {
        nextExpandedRowKeys.add(key);
      }

      setExpandedRowKeys?.(Array.from(nextExpandedRowKeys));
    },
    [dataRowKey, expandedRowKeys, setExpandedRowKeys]
  );

  const columnsRendered: React.ReactElement[] = useMemo(
    () =>
      (columns ?? []).map(
        ({
          title,
          field,
          resizable,
          sortable,
          colWidth,
          align,
          grouped,
          groupheader,
          fixed,
          children,
          customCell,
          renderCell,
          isVisible
        }) => (
          <>
            {!isVisible && (
              <>
                {grouped ? (
                  <ColumnGroup
                    header={groupheader}
                    fixed={fixed}
                    align={align}
                    verticalAlign="middle"
                    groupHeaderHeight={40}
                  >
                    <>
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
                          <HeaderCell dataTheme={dataTheme} className={` ${classes.headerClass}`}>
                            {child.title}
                          </HeaderCell>
                          {customCell ? (
                            <CustomTableCell
                              renderCell={child.renderCell}
                              dataKey="id"
                              dataTheme={dataTheme}
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
                    </>
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
                    <HeaderCell dataTheme={dataTheme} className={` ${classes.headerClass}`}>
                      {title}
                    </HeaderCell>
                    {customCell ? (
                      <CustomTableCell renderCell={renderCell} dataKey="id" dataTheme={dataTheme} />
                    ) : (
                      <Cell
                        dataKey={field}
                        dataTheme={dataTheme}
                        className={` ${classes.cellClass}`}
                      />
                    )}
                  </Column>
                )}
              </>
            )}
          </>
        )
      ),
    [columns, dataTheme]
  );
  return (
    <div className={`qbs-table ${classes.tableContainerClass}`} data-theme={dataTheme}>
      {toolbar && <ToolBar {...toolbarProps} />}
      <Table
        height={height}
        data={data}
        dataTheme={dataTheme}
        wordWrap={wordWrap}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        onRowClick={onRowClick}
        cellBordered={cellBordered}
        bordered={bordered}
        minHeight={minHeight}
        loading={loading}
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
            <HeaderCell className={` ${classes.headerlClass}`}>#</HeaderCell>
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
              dataTheme={dataTheme}
              className={` ${classes.headerlClass}`}
            >
              <div
                style={{ lineHeight: CHECKBOX_LINE_HEIGHT }}
                className={` ${classes.selectionCell}`}
              >
                <input
                  type="checkbox"
                  onChange={handleCheckAll}
                  className={`${classes.tableCheckBoxClass}`}
                  checked={checkedKeys.length === data.length}
                />
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
        {columnsRendered}

        {actionProps && actionProps?.length > 0 && (
          <Column width={40} fixed="right">
            <HeaderCell className={` ${classes.headerlClass}`} dataTheme={dataTheme}>
              {'Action'}
            </HeaderCell>
            <ActionCell
              actionProps={actionProps}
              className={`${classes.cellClass} ${classes.actionCellClass}`}
              handleMenuActions={handleMenuActions}
              dataTheme={dataTheme}
            />
          </Column>
        )}
      </Table>
      <div>{pagination && <Pagination paginationProps={paginationProps} />}</div>
    </div>
  );
};

export default QbsTable;
