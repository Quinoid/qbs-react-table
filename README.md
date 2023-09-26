# QbsTable Component

## Description

`QbsTable` is a versatile and customizable table component designed to display tabular data efficiently. It provides features like sorting, column grouping, and various cell customizations.

## Props

### `QbsTableProps`

| Prop                 | Type                                                                | Description                                                                |
| -------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| columns              | `readonly QbsColumnProps[]`                                         | Defines each column in the table.                                          |
| data                 | `readonly any[]`                                                    | Data objects to be displayed in the table rows.                            |
| actionProps          | `readonly ActionProps[]`                                            | Defines actions for each row.                                              |
| isTree               | `boolean`                                                           | Specifies if the table should render as a tree.                            |
| pagination           | `boolean`                                                           | Enables pagination for the table.                                          |
| paginationProps      | `PaginationProps`                                                   | Controls pagination properties.                                            |
| handleColumnSort     | `(sortColumn: string, sortType: string) => void`                    | Handles column sorting.                                                    |
| sortType             | `'desc' \| 'asc'`                                                   | Defines the sorting type.                                                  |
| sortColumn           | `string`                                                            | Defines the column being sorted.                                           |
| selection            | `boolean`                                                           | Enables row selection.                                                     |
| onSelect             | `(keys: any[]) => void`                                             | Called when rows are selected.                                             |
| title                | `string`                                                            | Specifies the table title.                                                 |
| search               | `boolean`                                                           | Enables search functionality.                                              |
| onSearch             | `(key?: string) => void`                                            | Called when a search is performed.                                         |
| asyncSearch          | `boolean`                                                           | If true, the search will be asynchronous.                                  |
| searchValue          | `string`                                                            | Represents the current value in the search input.                          |
| handleSearchValue    | `(value?: string) => void`                                          | Handles search input changes.                                              |
| theme                | `string`                                                            | Defines the theme applied to the table.                                    |
| onRowClick           | `(data: any) => void`                                               | Called when a row is clicked.                                              |
| cellBordered         | `boolean`                                                           | If true, each cell will have a border.                                     |
| bordered             | `boolean`                                                           | If true, the table will have a border.                                     |
| height               | `number`                                                            | Defines the table height.                                                  |
| minHeight            | `number`                                                            | Defines the minimum table height.                                          |
| maxHeight            | `number \| string`                                                  | Defines the maximum table height.                                          |
| wordWrap             | `boolean \| 'break-all' \| 'break-word' \| 'keep-all' \| undefined` | Defines the word wrap style for the content in a cell.                     |
| dataRowKey           | `string`                                                            | Defines the key field in the data.                                         |
| onExpandChange       | `(expanded: boolean, rowData: any) => void`                         | Called when a row expands or collapses.                                    |
| defaultExpandAllRows | `boolean`                                                           | If true, all rows will be expanded by default.                             |
| expandedRowKeys      | `readonly number[]`                                                 | Contains the array of expanded row keys.                                   |
| setExpandedRowKeys   | `(value: readonly number[]) => void`                                | Sets expanded row keys.                                                    |
| handleMenuActions    | `(actions: ActionProps, rowData: any) => void`                      | Handles menu actions.                                                      |
| handleRowExpanded    | `(rowData: any) => React.ReactNode`                                 | Renders expanded row content.                                              |
| shouldUpdateScroll   | `boolean`                                                           | If true, the table will update the scroll position on data or size change. |
| rowExpand            | `boolean`                                                           | Enables row expand functionality.                                          |
| primaryFilter        | `ReactElement \| ReactNode`                                         | Defines the primary filter component.                                      |
| advanceFilter        | `ReactElement \| ReactNode`                                         | Defines the advanced filter component.                                     |

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
|                   |

### Qbs-Table Styles

## QbsTable Component


# `QbsTable` Component

`QbsTable` is a versatile and customizable table component designed for multiple use cases. Below are the props it accepts:

### Props

#### `handleColumnSort: (sortColumn: any, sortType: any) => void`

A function to handle the column sorting. It receives `sortColumn` and `sortType` as parameters.

```jsx
<QbsTable handleColumnSort={(sortColumn, sortType) => console.log(sortColumn, sortType)} />
```

#### `data: any[]`

An array containing the data to be displayed in the table.

```jsx
<QbsTable data={[{ id: 1, name: 'John Doe' }]} />
```

#### `columns: Column[]`

An array defining the columns of the table.

```jsx
<QbsTable columns={[{ title: 'Name', field: 'name' }]} />
```

#### `sortColumn: string`

Defines the column that is currently sorted.

```jsx
<QbsTable sortColumn="name" />
```

#### `sortType: string`

Defines the current sort type.

```jsx
<QbsTable sortType="asc" />
```

#### `selection: boolean`

Enables or disables row selection using checkboxes.

```jsx
<QbsTable selection={true} />
```

#### `onSelect: (selectedKeys: number[]) => void`

Callback fired when a row is selected.

```jsx
<QbsTable onSelect={selectedKeys => console.log(selectedKeys)} />
```

#### `title: string`

Sets the title of the table.

```jsx
<QbsTable title="My Custom Table" />
```

#### `search: boolean`

Enables or disables the search functionality.

```jsx
<QbsTable search={true} />
```

#### `asyncSearch: boolean`

If true, activates asynchronous search.

```jsx
<QbsTable asyncSearch={true} />
```

#### `searchValue: string`

Controls the value of the search input.

```jsx
<QbsTable searchValue="John" />
```

#### `onSearch: (value: string) => void`

Callback fired when the search value changes.

```jsx
<QbsTable onSearch={value => console.log(value)} />
```

#### `handleSearchValue: (value: string) => void`

A function to handle the search value, usually used for controlled components.

```jsx
<QbsTable handleSearchValue={value => console.log(value)} />
```

#### `paginationProps: object`

Props to be passed to the `Pagination` component.

```jsx
<QbsTable paginationProps={{ total: 100, pageSize: 10 }} />
```

#### `pagination: boolean`

Enables or disables the pagination.

```jsx
<QbsTable pagination={true} />
```

#### `cellBordered: boolean`

If true, displays borders around cells.

```jsx
<QbsTable cellBordered={true} />
```

#### `bordered: boolean`

If true, displays a border around the table.

```jsx
<QbsTable bordered={true} />
```

#### `minHeight: number`

Sets the minimum height of the table.

```jsx
<QbsTable minHeight={300} />
```

#### `height: number`

Sets the height of the table.

```jsx
<QbsTable height={550} />
```

#### `onExpandChange: (rowData: any) => void`

Callback fired when the expanded state of a row is changed.

```jsx
<QbsTable onExpandChange={rowData => console.log(rowData)} />
```

#### `wordWrap: boolean`

If true, enables word wrapping in cells.

```jsx
<QbsTable wordWrap={true} />
```

#### `dataRowKey: string`

Defines the key from the data that will be used for row keys.

```jsx
<QbsTable dataRowKey="id" />
```

#### `defaultExpandAllRows: boolean`

If true, expands all rows by default.

```jsx
<QbsTable defaultExpandAllRows={true} />
```

#### `handleRowExpanded: (rowData: any) => ReactNode`

A function to handle the rendering of expanded rows. It should return a valid ReactNode.

```jsx
<QbsTable handleRowExpanded={rowData => <div>{rowData.name}</div>} />
```

#### `shouldUpdateScroll: boolean`

If true, updates the scroll position when needed.

```jsx
<QbsTable shouldUpdateScroll={true} />
```

#### `rowExpand: boolean`

If true, enables the row expand functionality.

```jsx
<QbsTable rowExpand={true} />
```

#### `actionProps: any[]`

An array of action props to be passed to the `ActionCell` component.

```jsx
<QbsTable actionProps={[{ title: 'Delete', onClick: rowData => console.log(rowData) }]} />
```

#### `theme: string`

Defines the theme of the table. It could be 'light' or 'dark'.

```jsx
<QbsTable theme="dark" />
```

#### `handleMenuActions: (action: any, rowData: any) => void`

A function to handle the actions from the action menu.

```jsx
<QbsTable handleMenuActions={(action, rowData) => console.log(action, rowData)} />
```

#### `onRowClick: (rowData: any) => void`

Callback fired when a row is clicked.

```jsx
<QbsTable onRowClick={rowData => console.log(rowData)} />
```

#### `expandedRowKeys: string[]`

An array of the keys of the currently expanded rows.

```jsx
<QbsTable expandedRowKeys={['1', '2']} />
```

#### `setExpandedRowKeys: (keys: string[]) => void`

A function to set the keys of the currently expanded rows.

```jsx
<QbsTable setExpandedRowKeys={keys => console.log(keys)} />
```

#### `primaryFilter: any`

Prop to handle primary filtering.

```jsx
<QbsTable primaryFilter={{ filterType: 'date', filterValue: '2023-01-01' }} />
```

#### `advancefilter: any`

Prop to handle advanced filtering.

```jsx
<QbsTable advancefilter={{ filterType: 'name', filterValue: 'John' }} />
```

#### `classes: object`

Object containing className strings.

```jsx
<QbsTable classes={{ headerClass: 'my-header-class', cellClass: 'my-cell-class' }} />
```

#### `toolbar: boolean`

If true, displays the toolbar.

```jsx
<QbsTable toolbar={true} />
```

### Example

Here is an example of how you might use the `QbsTable` component with various props:

```jsx
<QbsTable
  title="User Data"
  data={[
    { id: 1, name: 'Quinoid' },
    { id: 2, name: 'Quinoid1' }
  ]}
  columns={[{ title: 'Name', field: 'name' }]}
  sortColumn="name"
  sortType="asc"
  selection={true}
  onSelect={selectedKeys => console.log(selectedKeys)}
  search={true}
  onSearch={value => console.log(value)}
  pagination={true}
  paginationProps={{ total: 100, pageSize: 10 }}
  cellBordered={true}
  bordered={true}
  minHeight={300}
  height={550}
  onExpandChange={rowData => console.log(rowData)}
  wordWrap={true}
  dataRowKey="id"
  defaultExpandAllRows={true}
  handleRowExpanded={rowData => <div>{rowData.name}</div>}
  shouldUpdateScroll={true}
  rowExpand={true}
  actionProps={[{ title: 'Delete', onClick: rowData => console.log(rowData) }]}
  theme="dark"
  handleMenuActions={(action, rowData) => console.log(action, rowData)}
  onRowClick={rowData => console.log(rowData)}
  expandedRowKeys={['1', '2']}
  setExpandedRowKeys={keys => console.log(keys)}
  primaryFilter={{ filterType: 'date', filterValue: '2023-01-01' }}
  advancefilter={{ filterType: 'name', filterValue: 'John' }}
  classes={{ headerClass: 'my-header-class', cellClass: 'my-cell-class' }}
  toolbar={true}
/>
```

### Notes

- The `QbsTable` component should be used in accordance with the requirements of your application. Ensure that you pass the correct props for your desired functionality.
- Please ensure that you have handled the callback functions properly for your specific use cases, as mismanagement of state and props may lead to unexpected behavior of the component.

### `classes` Prop

The `classes` prop is an object where keys are the names of elements or parts of the `QbsTable` component, and values are the class names you want to apply. Below is the list of keys you can use:

- `headerClass`: Class applied to the header cells of the table. It affects both grouped and ungrouped headers.

- `cellClass`: Class applied to the data cells of the table.

- `tableContainerClass`: Class applied to the container wrapping the whole table, including the toolbar.

- `headerlClass`: Class applied to the specific header cells, especially when using features like row expansion and selection.

- `selectionCell`: Class applied to the container of the checkbox in the header when selection is enabled.

- `tableCheckBoxClass`: Class applied to the checkboxes in the rows and the header when selection is enabled.

- `actionCellClass`: Class applied to the action cells in the table when actions are provided.
 
- `toolbarClass`: Class applied to table toolbar

### Example Usage

```javascript
<QbsTable
  classes={{
    headerClass: 'my-header-class',
    cellClass: 'my-cell-class',
    tableContainerClass: 'my-table-container-class',
    headerlClass: 'my-headerl-class',
    selectionCell: 'my-selection-cell-class',
    tableCheckBoxClass: 'my-table-check-box-class',
    actionCellClass: 'my-action-cell-class'
  }}
  //... other props
/>
```

#### 1. **.qbs-table**

- Defines the main container for the table.

##### .qbs-table-toolbar

- **Height:** 58px.
- **Display:** Flex.
- Describes the toolbar located above the table containing various controls like filters and search.
- **Children:**
  - **.start-container:** Container aligning child elements to the start.
  - **.end-container:** Container aligning child elements to the end, contains `.rows-count` for displaying row count with padding 0px 10px.

##### .sub-qbs-table-toolbar

- **Display:** Flex.
- Styling for sub-toolbar located beneath the main toolbar.

##### .qbs-table-search-container

- **Position:** Relative.
- Container for search input and related buttons.
- **Children:**
  - **.input:** Minimal design search input, height: 32px, border-radius: 4px, min-width: 200px.
  - **.search-button and .close-button:** Positioned absolute and styled with a grey color and white background.

#### 2. **.qbs-table[data-theme='dark']**

- Applies when the table is in dark theme mode, changing background color to #333333 and font color to #ffffff.

#### 3. **.rs-table-cell-content[data-theme='dark']**

- Similar to .qbs-table[data-theme='dark'], but applied to table cell content in dark theme.

#### 4. **.qbs-table-menu-dropdown**

- **Position:** Relative.
- **Display:** Inline-block.
- Contains dropdown-related elements.

##### .qbs-table-dropbtn

- Button to trigger the dropdown, it's styled with a transparent background, black color font, and a cursor set to pointer.

##### .qbs-table-qbs-table-menu-dropdown-content

- Positioned absolute, contains dropdown items styled with a light (#f1f1f1) background color and black text.

#### 5. **.qbs-table-tooltip**

- **Position:** Relative.
- **Display:** Inline-block.
- **Cursor:** Pointer.
- Contains tooltip text which is hidden by default and visible on hover with a smooth opacity transition.

#### 6. **.rs-table-row**

- **Overflow:** Visible !important.
- Ensures the rows of the table are visible.

### Qbs-Table-Custom-Pagination Styles

#### 1. **.qbs-table-custom-pagination**

- **Display:** Flex.
- **Justify-Content:** Space-between.
- **Padding:** 10px.
- **Border:** 1px solid.
- **Min-Height:** 40px.
- **Align-Items:** Center.
- Describes the main container for custom pagination, ensuring items are spaced evenly and aligned centrally.

##### &-header

- **Border-Bottom:** 1px solid #eee.
- **Position:** Absolute.
- **Width:** 100%.
- Acts as the header for the pagination container with a solid bottom border.
  - **&-content:** Styled as a table cell, providing padding of 8px around the content.

##### .qbs-table-pagination-dropdown

- **Width:** Auto.
- **Border-Radius:** 6px.
- **Height:** 30px.
- **Display:** Flex.
- **Align-Items:** Center.
- **Justify-Content:** Center.
- Describes the dropdown within the pagination, allowing flex display with centered items.

##### .qbs-table-icon-container

- **Padding:** 5px.
- **Cursor:** Pointer.
- **Display:** Flex.
- **Justify-Items:** Center.
- **Align-Items:** Center.
- **Color:** Black.
- **Height:** 100%.
- **Background-Color:** Transparent.
- Stylish container for icons. It changes color to blue when hovered and to grey when disabled.

##### .qbs-table-pagination-right-block

- **Display:** Flex.
- **Align-Items:** Center.
- Acts as the right block container of the pagination section.
  - **.block-container:** Flex container that holds block items.
  - **.block-item:** Individual block items, stylized with a cursor pointer, centered alignment, and bordered. It changes the border and text color to blue when hovered or active.
  - **.selected:** Representing the selected item, enhancing the border and changing the color to blue.

## Installation

```sh
npm install qbs-react-grid
```
