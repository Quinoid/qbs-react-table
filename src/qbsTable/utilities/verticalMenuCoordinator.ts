export const VERTICAL_MENU_CLOSE_OTHERS = 'qbs-vertical-menu-close-others';

export type VerticalMenuCloseDetail = {
  exceptId: string;
};

export const closeOtherVerticalMenus = (exceptId: string) => {
  if (typeof document === 'undefined') return;
  document.dispatchEvent(
    new CustomEvent<VerticalMenuCloseDetail>(VERTICAL_MENU_CLOSE_OTHERS, {
      detail: { exceptId },
    }),
  );
};
