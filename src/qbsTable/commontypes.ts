import React, { ReactElement, ReactNode } from 'react';

interface Content {
  cell: ReactNode | string;
  toolTip?: string;
}
export interface ColumnBase {
  title: string;
  field: string;
  sortable?: boolean;
  resizable?: boolean;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  colWidth?: number;
  renderCell?: (rowData: any) => Content;
  customCell?: boolean;
  isVisible?: boolean;
  link?: boolean;
  rowClick?: (rowData: any) => void;
  sortKey?: string;
  type?: string;
  getPath?: (data: any) => string;
  hideLink?: (data: any) => boolean;
}

export interface QbsColumnProps extends ColumnBase {
  grouped?: boolean;
  groupHeader?: string;
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
  hidden?: boolean;
  hide?: (data: any, index?: number) => boolean;
  isWarning?: boolean;
  label?: string;
  iconName?: string;
}

export interface QbsTableProps {
  tableKey?: string;
  autoHeight?: boolean;
  isLoading?: boolean;
  columns: QbsColumnProps[];
  data: readonly any[];
  actionProps?: readonly ActionProps[];
  isTree?: boolean;
  pagination?: boolean;
  paginationProps?: PaginationProps;
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
  wordWrap?: boolean | 'break-all' | 'break-word' | 'keep-all' | 'fit-content';
  dataRowKey?: string;
  onExpandChange?: (expanded: boolean, rowData: any) => void;
  defaultExpandAllRows?: boolean;
  expandedRowKeys?: readonly number[];
  setExpandedRowKeys?: (value: readonly number[]) => void;
  handleMenuActions?: (actions: ActionProps, rowData: any) => void;
  handleRowExpanded?: (rowData: any) => React.ReactNode;
  shouldUpdateScroll?: boolean;
  rowExpand?: boolean;
  primaryFilter?: ReactElement | ReactNode;
  advancefilter?: ReactElement | ReactNode;
  tableHeaderActions?: ReactElement | ReactNode;
  searchPlaceholder?: string;
  selectedRowActions?: {
    actionTitle?: string;
    action: (checked: (number | string)[]) => void;
    disabled?: boolean;
    hidden?: boolean;
    customHide?: string;
  }[];
  selectedRows?: (number | string)[];
  classes?: { [key: string]: any };
  toolbar?: boolean;
  columnToggle?: boolean;
  handleColumnToggle?: (columns: QbsColumnProps[]) => void;
  handleResetColumns?: () => void;
  headerHeight?: number;
  tableBodyHeight?: string;
  customRowStatus?: {
    getIcon?: (data: any) => ReactElement;
    onClick?: (rowData: any) => void;
    hidden?: boolean;
    getToolTip?: (rowData: any) => string | ReactElement;
    link?: boolean;
    field?: boolean;
    getPath?: (data: any) => string;
  };
  rowExpandedHeight?: number;
  renderSortIcon?: (sortType?: 'desc' | 'asc') => React.ReactNode;
  renderEmpty?: (info: React.ReactNode) => React.ReactNode;
  emptySubTitle?: string;
  emptyTitle?: string;
  enableTableToggle?: boolean;
  tableView?: boolean;
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
  primaryFilter?: ReactElement | ReactNode;
  className: any;
  columns: QbsColumnProps[];
  handleToggle: (conlumnName: string) => void;
  onReorder: (columns: QbsColumnProps[]) => void;
  advancefilter?: ReactElement | ReactNode;
  columnToggle?: boolean;
  checkedKeys?: (number | string)[];
  tableHeaderActions?: ReactElement | ReactNode;
  onSelect?: (keys: any[]) => void;
  handleColumnToggle?: (columns: QbsColumnProps[]) => void;
  dataLength: number;
  headerHeight?: number;
  searchPlaceholder?: string;
  tableView?: boolean;
  enableTableToggle?: boolean;
  tableViewToggle?: boolean;
  setTableViewToggle?: (value: boolean) => void;
  selectedRowActions?: {
    actionTitle?: string;
    action: (checked: (number | string)[]) => void;
    disabled?: boolean;
    hidden?: boolean;
    customHide?: string;
  }[];
}
