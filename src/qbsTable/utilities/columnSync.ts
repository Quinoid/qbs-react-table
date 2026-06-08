import type { QbsColumnProps } from '../commontypes';

export const COLUMN_RESIZE_COOLDOWN_MS = 800;

export function getTableColumnLayoutSignature(columns?: QbsColumnProps[] | null): string {
  if (!columns?.length) {
    return '';
  }

  return columns
    .map(
      (column, index) =>
        `${index}:${column.field}:${column.isVisible ?? true}:${column.colWidth ?? ''}`,
    )
    .join('|');
}

export function getTableColumnStructureSignature(columns?: QbsColumnProps[] | null): string {
  if (!columns?.length) {
    return '';
  }

  return columns
    .map((column, index) => `${index}:${column.field}:${column.isVisible ?? true}`)
    .join('|');
}

export function mergeColumnLayoutFromProps(
  prev: QbsColumnProps[],
  next: QbsColumnProps[] | undefined,
  cooldownUntil = 0,
): QbsColumnProps[] {
  if (!next?.length) {
    return prev;
  }

  const preferPrevWidth = Date.now() < cooldownUntil;

  let changed = false;
  const merged = (prev ?? []).map((column, index) => {
    const propCol =
      next[index]?.field === column.field
        ? next[index]
        : next.find(item => item.field === column.field);

    if (!propCol) {
      return column;
    }

    const colWidth = preferPrevWidth
      ? (column.colWidth ?? propCol.colWidth)
      : (propCol.colWidth ?? column.colWidth);
    const isVisible = propCol.isVisible ?? column.isVisible;

    if (colWidth === column.colWidth && isVisible === column.isVisible) {
      return column;
    }

    changed = true;
    return { ...column, colWidth, isVisible };
  });

  return changed ? merged : prev;
}

export function syncColumnsFromProps(
  prev: QbsColumnProps[],
  propColumn: QbsColumnProps[] | undefined,
  cooldownUntil: number,
): QbsColumnProps[] {
  if (!propColumn?.length) {
    return prev;
  }

  if (getTableColumnLayoutSignature(prev) === getTableColumnLayoutSignature(propColumn)) {
    return prev;
  }

  if (Date.now() < cooldownUntil) {
    return prev;
  }

  if (getTableColumnStructureSignature(prev) === getTableColumnStructureSignature(propColumn)) {
    return mergeColumnLayoutFromProps(prev, propColumn, cooldownUntil);
  }

  return propColumn;
}

export function shouldUpdateResizableFlags(
  current: QbsColumnProps[] | undefined,
  next: QbsColumnProps[] | undefined,
): boolean {
  return !!next?.some((column, index) => column.resizable !== current?.[index]?.resizable);
}

export function markColumnResizeCooldown(cooldownRef: { current: number }): void {
  cooldownRef.current = Date.now() + COLUMN_RESIZE_COOLDOWN_MS;
}
