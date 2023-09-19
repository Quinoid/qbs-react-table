import React from 'react';
import { QbsColumnProps } from './commontypes';
import Column from '../Column';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';
const COLUMN_WIDTH = 250;
const QbsTableColumn: React.FC<QbsColumnProps> = ({ title, field, resizable }) => {
  return (
    <Column key={title} sortable width={COLUMN_WIDTH} resizable={resizable}>
      <HeaderCell className="w-full">{title}</HeaderCell>
      <Cell className="w-full" dataKey={field} />
    </Column>
  );
};
export default QbsTableColumn;
