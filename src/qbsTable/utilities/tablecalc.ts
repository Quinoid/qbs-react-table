export function getRowDisplayRange(totalRows: number, rowsPerPage: number, pageNumber: number) {
  const start = (pageNumber - 1) * rowsPerPage + 1;
  const end = Math.min(pageNumber * rowsPerPage, totalRows);

  return `${start ?? 0} to ${end ?? 0} of ${totalRows ?? 0}`;
}
