export function getRowDisplayRange(
  totalRows: number,
  rowsPerPage: number,
  pageNumber: number,
  formatRange: (start: number, end: number, total: number) => string = (start, end, total) =>
    `Showing ${start} to ${end} of ${total}`
) {
  const start = (pageNumber - 1) * rowsPerPage + 1;
  const end = Math.min(pageNumber * rowsPerPage, totalRows);

  return formatRange(start ?? 0, end ?? 0, totalRows ?? 0);
}
