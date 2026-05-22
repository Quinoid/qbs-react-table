export const COLUMN_TOGGLE_CLOSE_OTHERS = 'qbs-column-toggle-close-others';

export type ColumnToggleCloseDetail = {
  exceptId: string;
};

export const closeOtherColumnToggles = (exceptId: string) => {
  if (typeof document === 'undefined') return;
  document.dispatchEvent(
    new CustomEvent<ColumnToggleCloseDetail>(COLUMN_TOGGLE_CLOSE_OTHERS, {
      detail: { exceptId },
    }),
  );
};
