export type QbsColumnProps = {
  title: string;
  field: string;
  sortable?: boolean;
  resizable?: boolean;
  fixed?: boolean;
};
export type PaginationProps = {
  total?: number;
  rowsPerPage?: number;
  dropOptions?: number[];
  currentPage?: number;
  maxPage?: number;
  onRowsPerPage?: (row: number, page: number) => void;
  onPagination?: (row: number, page: number) => void;
};
export type QbsTableProps = {
  columns: QbsColumnProps[];
  data: any[];
  isTree?: boolean;
  pagination?: boolean;
  paginationProps?: PaginationProps;
  handleColumnSort?: (sortColumn: string, sortType: string) => void;
  sortType?: 'desc' | 'asc';
  sortColumn?: string;
  selection?: boolean;
  onSelect?: (keys: any[]) => void;
};
