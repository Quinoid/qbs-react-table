# QbsTable Component

## Description

`QbsTable` is a versatile and customizable table component designed to display tabular data efficiently. It provides features like sorting, column grouping, and various cell customizations.

## Props

### `QbsTableProps`

| Prop                 | Type                                             | Description                                                              |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------------------------ | -------------------------- | ---------- | ---------- | ------------------------------------------ |
| columns              | `readonly QbsColumnProps[]`                      | An array of objects defining each column in the table.                   |
| data                 | `readonly any[]`                                 | An array of data objects to be displayed in the table rows.              |
| actionProps          | `readonly ActionProps[]`                         | Defines actions for each row.                                            |
| isTree               | `boolean`                                        | Specifies whether the table should render as a tree.                     |
| pagination           | `boolean`                                        | Enable pagination for the table.                                         |
| paginationProps      | `PaginationProps`                                | Props to control pagination.                                             |
| handleColumnSort     | `(sortColumn: string, sortType: string) => void` | Handles column sorting.                                                  |
| sortType             | `'desc'                                          | 'asc'`                                                                   | Sorting type.              |
| sortColumn           | `string`                                         | Column being sorted.                                                     |
| selection            | `boolean`                                        | Enables row selection.                                                   |
| onSelect             | `(keys: any[]) => void`                          | Function called when rows are selected.                                  |
| title                | `string`                                         | Table title.                                                             |
| search               | `boolean`                                        | Enables search functionality.                                            |
| onSearch             | `(key?: string) => void`                         | Function called when a search is performed.                              |
| asyncSearch          | `boolean`                                        | If `true`, search will be asynchronous.                                  |
| searchValue          | `string`                                         | Current value in the search input.                                       |
| handleSearchValue    | `(value?: string) => void`                       | Function to handle search input changes.                                 |
| theme                | `string`                                         | Theme applied to the table.                                              |
| onRowClick           | `(data: any) => void`                            | Function called when a row is clicked.                                   |
| cellBordered         | `boolean`                                        | If `true`, each cell will have a border.                                 |
| bordered             | `boolean`                                        | If `true`, the table will have a border.                                 |
| height               | `number`                                         | Table height.                                                            |
| minHeight            | `number`                                         | Minimum table height.                                                    |
| maxHeight            | `number                                          | string`                                                                  | Maximum table height.      |
| wordWrap             | `boolean                                         | 'break-all'                                                              | 'break-word'               | 'keep-all' | undefined` | Word wrap style for the content in a cell. |
| dataRowKey           | `string`                                         | Key field in the data.                                                   |
| onExpandChange       | `(expanded: boolean, rowData: any) => void`      | Function called when row expands or collapses.                           |
| defaultExpandAllRows | `boolean`                                        | If `true`, all rows will be expanded by default.                         |
| expandedRowKeys      | `readonly number[]`                              | Array of expanded row keys.                                              |
| setExpandedRowKeys   | `(value: readonly number[]) => void`             | Function to set expanded row keys.                                       |
| handleMenuActions    | `(actions: ActionProps, rowData: any) => void`   | Function called to handle menu actions.                                  |
| handleRowExpanded    | `(rowData: any) => React.ReactNode`              | Renders expanded row content.                                            |
| shouldUpdateScroll   | `boolean`                                        | If `true`, the table will update scroll position on data or size change. |
| rowExpand            | `boolean`                                        | Enables row expand functionality.                                        |
| primaryFilter        | `ReactElement                                    | ReactNode`                                                               | Primary filter component.  |
| advanceFilter        | `ReactElement                                    | ReactNode`                                                               | Advanced filter component. |

### `QbsColumnProps`

| Prop        | Type                             | Description                                                                |
| ----------- | -------------------------------- | -------------------------------------------------------------------------- |
| title       | `string`                         | Title of the column.                                                       |
| field       | `string`                         | Field in the data that this column represents.                             |
| sortable    | `boolean`                        | Specifies if the column is sortable.                                       |
| resizable   | `boolean`                        | Specifies if the column is resizable.                                      |
| fixed       | `boolean`                        | If `true`, the column will be fixed on horizontal scrolling.               |
| align       | `Align`                          | Alignment of the column content. Supports `'center'`, `'left'`, `'right'`. |
| colWidth    | `number`                         | Width of the column.                                                       |
| renderCell  | `(rowData: any) => ReactElement` | Renders custom cell content.                                               |
| customCell  | `boolean`                        | If `true`, a custom cell will be rendered using `renderCell`.              |
| grouped     | `boolean`                        | If `true`, the column will be grouped with the `groupheader`.              |
| groupheader | `string`                         | The header of the grouped column.                                          |
| children    | `readonly ColumnBase[]`          | Child columns of the grouped column.                                       |

### `PaginationProps`

| Prop          | Type                                  | Description                                    |
| ------------- | ------------------------------------- | ---------------------------------------------- |
| total         | `number`                              | Total number of items.                         |
| rowsPerPage   | `number`                              | Number of rows per page.                       |
| dropOptions   | `number[]`                            | Drop-down options for rows per page.           |
| currentPage   | `number`                              | Current active page.                           |
| maxPage       | `number`                              | Maximum number of pages.                       |
| onRowsPerPage | `(row: number, page: number) => void` | Function called when rows per page is changed. |
| onPagination  | `(row: number, page: number) => void` | Function called when pagination is changed.    |

### `ActionProps`

| Prop    | Type                 | Description                                           |
| ------- | -------------------- | ----------------------------------------------------- |
| title   | `string`             | Title of the action.                                  |
| action  | `(row: any) => void` | Function to be executed when the action is triggered. |
| icon    | `React.ReactNode`    | Icon to be displayed for the action.                  |
| toolTip | `string`             | Tooltip text for the action.                          |

### `QbsTableToolbarProps`

| Prop              | Type                       | Description                                                  |
| ----------------- | -------------------------- | ------------------------------------------------------------ |
| title             | `string`                   | Title of the toolbar.                                        |
| search            | `boolean`                  | Enables search functionality in the toolbar.                 |
| onSearch          | `(key?: string) => void`   | Function called when a search is performed from the toolbar. |
| asyncSearch       | `boolean`                  | If `true`, search will be asynchronous.                      |
| searchValue       | `string`                   | Current value in the search input.                           |
| handleSearchValue | `(value?: string) => void` | Function to handle search                                    |

## Installation

```sh
npm install qbs-react-grid
```
