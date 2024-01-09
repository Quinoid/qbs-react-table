import React, { useContext } from 'react';
import { mergeRefs, useClassNames } from './utils';
import TableContext from './TableContext';
import { StandardProps } from './@types/common';
import { ROW_HEADER_HEIGHT, ROW_HEIGHT } from './constants';

export interface RowProps extends StandardProps {
  width?: number;
  height?: number;
  headerHeight?: number;
  top?: number;
  isHeaderRow?: boolean;
  rowRef?: any;
  rowSpan?: number;
  index?: number;
  dataLength?: number;
  handleParentCallBack?: (index: number) => void;
  zIndexValue?: number;
}

const Row = React.forwardRef((props: RowProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    classPrefix = 'row',
    height = ROW_HEIGHT,
    headerHeight = ROW_HEADER_HEIGHT,
    className,
    width,
    top,
    style,
    isHeaderRow,
    rowRef,
    children,
    rowSpan,
    index,
    dataLength,
    handleParentCallBack,
    zIndexValue,
    ...rest
  } = props;

  const { translateDOMPositionXY } = useContext(TableContext);
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ header: isHeaderRow, rowspan: rowSpan }));

  const styles = {
    minWidth: width,
    height: isHeaderRow ? headerHeight : height,
    ...style
  };
  const INDEX = index as number;
  translateDOMPositionXY?.(styles as CSSStyleDeclaration, 0, top);
  return (
    <div
      role="row"
      {...rest}
      ref={mergeRefs(rowRef, ref)}
      onMouseEnter={() => handleParentCallBack?.(INDEX)}
      className={classes}
      style={{ ...styles, zIndex: zIndexValue }}
    >
      {children}
    </div>
  );
});

Row.displayName = 'Table.Row';

export default Row;
