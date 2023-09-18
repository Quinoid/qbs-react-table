import React, { useState, useCallback, useEffect } from 'react';
import Cell from '../Cell';
import Column from '../Column';
import HeaderCell from '../HeaderCell';
import Table from '../Table';
import { QbsTableProps } from './commontypes';

const CHECKBOX_LINE_HEIGHT = '46px';
const COLUMN_WIDTH = 250;

const CheckCell: React.FC<any> = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
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
  onSelect
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

  return (
      <div className="m-10 border-2 border-cyan-900">
          <div></div>
      <Table
        height={750}
        data={data}
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
            <HeaderCell style={{ padding: 0 }}>
              <div style={{ lineHeight: CHECKBOX_LINE_HEIGHT }}>
                <input
                  type="checkbox"
                  onChange={handleCheckAll}
                  checked={checkedKeys.length === data.length}
                />
              </div>
            </HeaderCell>
            <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
          </Column>
        )}
        {columns?.map(({ title, field }: any) => (
          <Column key={title} sortable width={COLUMN_WIDTH} resizable>
            <HeaderCell className="w-full">{title}</HeaderCell>
            <Cell className="w-full" dataKey={field} />
          </Column>
        ))}
        {['', 'Edit'].map(action => (
          <Column key={action} fixed="right">
            <HeaderCell>{action || 'Action'}</HeaderCell>
            <Cell dataKey={action || 'Edit'}>{action}</Cell>
          </Column>
        ))}
      </Table>
    </div>
  );
};

export default QbsTable;
