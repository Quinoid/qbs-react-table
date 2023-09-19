import React, { useState, useCallback, useEffect } from 'react';
import Cell from '../Cell';
import Column from '../Column';
import HeaderCell from '../HeaderCell';
import Table from '../Table';
import { QbsTableProps } from './commontypes';
import ToolBar from './Toolbar';
import Pagination from '../Pagination';
import MenuDropDown from './utilities/menuDropDown';
import { ThreeDotIcon } from './utilities/icons';
const CHECKBOX_LINE_HEIGHT = '46px';
const COLUMN_WIDTH = 250;

const CheckCell: React.FC<any> = ({
  rowData,
  onChange,
  checkedKeys,
  dataKey,
  dataTheme,
  ...props
}) => (
  <Cell {...props} style={{ padding: 0 }} dataTheme={dataTheme}>
    <div style={{ lineHeight: CHECKBOX_LINE_HEIGHT }}>
      <input
        type="checkbox"
        value={rowData[dataKey]}
        onChange={onChange}
        checked={checkedKeys.includes(rowData[dataKey])}
      />
    </div>
  </Cell>
);

const QbsTable: React.FC<QbsTableProps> = ({
  handleColumnSort,
  data,
  columns,
  sortColumn,
  sortType,
  selection = true,
  onSelect,
  title = 'My Table',
  search = true,
  asyncSearch,
  searchValue,
  onSearch,
  handleSearchValue,
  paginationProps,
  pagination = true,
  actionProps = [
    { title: 'name', icon: <ThreeDotIcon /> },
    { title: 'name', icon: <ThreeDotIcon /> },
    { title: 'name', icon: <ThreeDotIcon /> },
    { title: 'name', icon: <ThreeDotIcon /> }
  ],
  theme
}) => {
  const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);

  const handleSortColumn = (sortColumn: any, sortType: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleColumnSort?.(sortColumn, sortType);
    }, 500);
  };

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
  }, [checkedKeys]);

  const toolbarProps = {
    title: title,
    search: search,
    searchValue: searchValue,
    pagination: pagination,
    onSearch: onSearch,
    handleSearchValue: handleSearchValue,
    asyncSearch: asyncSearch,
    paginationProps: paginationProps
  };
  const themeToggle = document.getElementById('themeToggle') as HTMLInputElement;
  themeToggle?.addEventListener('change', function () {
    if (themeToggle?.checked) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      if (themeToggle) {
        themeToggle.checked = true;
      }
    }
  });
  const dataTheme = localStorage.getItem('theme') ?? theme;
  return (
    <div className="qbs-table" data-theme={dataTheme}>
      <label>
        <input type="checkbox" id="themeToggle" />
        Toggle Dark Mode
        <MenuDropDown actionDropDown={actionProps} />
      </label>
      <ToolBar {...toolbarProps} />
      <Table
        height={750}
        data={data}
        dataTheme={dataTheme}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        pagination
        renderRowExpanded={() => <div>Hi Expansion</div>}
        showHeader
        defaultChecked
        expandedRowKeys={[1, 2, 3]}
        onExpandChange={(value, objecAt) => console.log(value, objecAt)}
        rowKey={'name'}
      >
        {selection && (
          <Column width={50} align="center" fixed="left">
            <HeaderCell style={{ padding: 0 }} dataTheme={dataTheme}>
              <div style={{ lineHeight: CHECKBOX_LINE_HEIGHT }}>
                <input
                  type="checkbox"
                  onChange={handleCheckAll}
                  checked={checkedKeys.length === data.length}
                />
              </div>
            </HeaderCell>
            <CheckCell
              dataKey="id"
              checkedKeys={checkedKeys}
              onChange={handleCheck}
              dataTheme={dataTheme}
            />
          </Column>
        )}
        {columns?.map(({ title, field, resizable, colWidth }: any) => (
          <Column key={title} sortable width={colWidth ?? COLUMN_WIDTH} resizable={resizable}>
            <HeaderCell dataTheme={dataTheme} className="w-full">
              {title}
            </HeaderCell>
            <Cell className="w-full" dataKey={field} dataTheme={dataTheme} />
          </Column>
        ))}
        {actionProps && actionProps?.length > 0 && (
          <Column width={40} fixed="right">
            <HeaderCell dataTheme={dataTheme}>{'Action'}</HeaderCell>
            {/* <Cell dataTheme={dataTheme}> */}
            <div>
              <MenuDropDown actionDropDown={actionProps} />
            </div>
            {/* </Cell> */}
          </Column>
        )}
      </Table>
      <div>
        {pagination && (
          <Pagination paginationProps={{ total: 100, currentPage: 1, rowsPerPage: 10 }} />
        )}
      </div>
    </div>
  );
};

export default QbsTable;
