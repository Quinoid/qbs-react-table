import React from 'react';
import { expectType } from 'ts-expect';
import Table, { TableInstance } from '../src/Table';
import Cell from '../src/Cell';

type Row = {
  id: number;
  name: string;
};

const data: Row[] = [
  {
    id: 1,
    name: 'First'
  },
  {
    id: 2,
    name: 'Second'
  }
];

<Table
  data={data}
  rowHeight={row => {
    expectType<Row | undefined>(row);

    return 44;
  }}
  rowClassName={row => {
    expectType<Row>(row);

    return '';
  }}
  renderTreeToggle={(button, row) => {
    expectType<Row | undefined>(row);

    return null;
  }}
  renderRowExpanded={row => {
    expectType<Row | undefined>(row);

    return null;
  }}
  renderRow={(node, row) => {
    expectType<Row | undefined>(row);

    return null;
  }}
  onRowClick={row => {
    expectType<Row>(row);
  }}
  onRowContextMenu={row => {
    expectType<Row>(row);
  }}
  onExpandChange={(expanded, row) => {
    expectType<Row>(row);
  }}
/>;

// It should be possible to call instance methods via ref
const ref = React.createRef<TableInstance<Row, string>>();

<Table ref={ref} />;

<Table ref={ref}>
  {({ Column, HeaderCell, Cell }) => (
    <>
      <Column>
        <HeaderCell>Id</HeaderCell>
        <Cell>{({ id }) => id}</Cell>
      </Column>
    </>
  )}
</Table>;

ref.current?.body;
ref.current?.root;
ref.current?.scrollLeft(100);
ref.current?.scrollTop(100);

interface InventoryItem {
  id: string;
  name: string;
}

const table = React.createRef<TableInstance<InventoryItem, string>>();

<Table<InventoryItem, string> ref={table}>
  {({ Column, HeaderCell, Cell }) => (
    <>
      <Column>
        <HeaderCell>Name</HeaderCell>
        <Cell>{row => row.name}</Cell>
      </Column>
      <Column>
        <HeaderCell>Type</HeaderCell>
        {/** @ts-expect-error Property 'type' does not exist on type 'InventoryItem' */}
        <Cell>{row => row.type}</Cell>
      </Column>
    </>
  )}
</Table>;

interface ImageCellProps<TKey extends string, TRow extends Record<TKey, string>> {
  rowData: TRow;
  dataKey: TKey;
  // ... any other props
}

export const ImageCell = <TKey extends string, TRow extends Record<TKey, string>>({
  rowData,
  dataKey,
  ...rest
}: ImageCellProps<TKey, TRow>) => (
  <Cell<TRow, TKey> {...rest}>
    <img src={rowData[dataKey]} width="50" />
  </Cell>
);
