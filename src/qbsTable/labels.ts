export interface QbsTableLabels {
  search?: string;
  searchAriaLabel?: string;
  clear?: string;
  selectedItems?: string;
  switchToDefaultView?: string;
  switchToRelaxedView?: string;
  switchToFullScreen?: string;
  switchToTableView?: string;
  switchToCardView?: string;
  noDataFound?: string;
  showingRange?: (start: number, end: number, total: number) => string;
  itemsPerPage?: string;
  fixedColumns?: string;
  visibleColumns?: string;
  availableColumns?: string;
  resetToDefault?: string;
  save?: string;
  viewMore?: string;
  viewLess?: string;
  actions?: string;
}

export const DEFAULT_QBS_TABLE_LABELS: Required<
  Omit<QbsTableLabels, 'showingRange'>
> & {
  showingRange: (start: number, end: number, total: number) => string;
} = {
  search: 'Search',
  searchAriaLabel: 'Search',
  clear: 'Clear',
  selectedItems: 'Selected Items',
  switchToDefaultView: 'Switch to Default View',
  switchToRelaxedView: 'Switch to Relaxed View',
  switchToFullScreen: 'Switch to Full Screen',
  switchToTableView: 'Switch to Table View',
  switchToCardView: 'Switch to Card View',
  noDataFound: 'No Data Found',
  showingRange: (start, end, total) => `Showing ${start} to ${end} of ${total}`,
  itemsPerPage: 'Items per page',
  fixedColumns: 'FIXED COLUMNS',
  visibleColumns: 'VISIBLE COLUMNS',
  availableColumns: 'AVAILABLE COLUMNS',
  resetToDefault: 'Reset to default',
  save: 'Save',
  viewMore: 'View More',
  viewLess: 'View Less',
  actions: 'Actions'
};

export const mergeLabels = (labels?: QbsTableLabels) => ({
  ...DEFAULT_QBS_TABLE_LABELS,
  ...labels,
  showingRange: labels?.showingRange ?? DEFAULT_QBS_TABLE_LABELS.showingRange
});

export const formatSelectedItems = (selectedItemsLabel: string, count: number) =>
  `${selectedItemsLabel}(${count}) `;
