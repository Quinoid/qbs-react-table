import React, { ReactElement } from 'react';

enum Align {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export interface ColumnBase {
  title: string;
  field: string;
  sortable?: boolean;
  resizable?: boolean;
  fixed?: boolean;
  align?: Align;
  colWidth?: number;
  renderCell?: (rowData: any) => ReactElement;
  customCell?: boolean;
}

export interface QbsColumnProps extends ColumnBase {
  grouped?: boolean;
  groupheader?: string;
  children?: readonly ColumnBase[];
}

export interface PaginationProps {
  total?: number;
  rowsPerPage?: number;
  dropOptions?: number[];
  currentPage?: number;
  maxPage?: number;
  onRowsPerPage?: (row: number, page: number) => void;
  onPagination?: (row: number, page: number) => void;
}

export interface ActionProps {
  title?: string;
  action?: (row: any) => void;
  icon: React.ReactNode;
  toolTip?: string;
}

export interface QbsTableProps {
  columns: readonly QbsColumnProps[];
  data: readonly any[];
  actionProps?: readonly ActionProps[];
  isTree?: boolean;
  pagination?: boolean;
  paginationProps: PaginationProps;
  handleColumnSort?: (sortColumn: string, sortType: string) => void;
  sortType?: 'desc' | 'asc';
  sortColumn?: string;
  selection?: boolean;
  onSelect?: (keys: any[]) => void;
  title?: string;
  search?: boolean;
  onSearch?: (key?: string) => void;
  asyncSearch?: boolean;
  searchValue?: string;
  handleSearchValue?: (value?: string) => void;
  theme?: string;
  onRowClick?: (data: any) => void;
  cellBordered?: boolean;
  bordered?: boolean;
  height?: number;
  minHeight?: number;
  maxHeight?: number | string;
  wordWrap: boolean | 'break-all' | 'break-word' | 'keep-all' | undefined;
  dataRowKey?: string;
  onExpandChange?: (expanded: boolean, rowData: any) => void;
  defaultExpandAllRows?: boolean;
  expandedRowKeys: readonly number[];
  setExpandedRowKeys: (value: readonly number[]) => void;
  handleMenuActions?: (actions: ActionProps, rowData: any) => void;
  handleRowExpanded: (rowData: any) => React.ReactNode;
  shouldUpdateScroll?: boolean;
  rowExpand?: boolean;
}

export interface QbsTableToolbarProps {
  title?: string;
  search?: boolean;
  onSearch?: (key?: string) => void;
  asyncSearch?: boolean;
  searchValue?: string;
  handleSearchValue?: (value?: string) => void;
  pagination?: boolean;
  paginationProps?: PaginationProps;
}
