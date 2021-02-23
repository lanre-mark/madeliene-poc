import React from 'react'

import {ITableRows, IWidget, IWidgetTableRow} from '../../common/types';
import {ToNumberPresentation} from '../../common/helper';

const WidgetTableRow: React.FunctionComponent<IWidgetTableRow> = ({widget, ndx}): any => {
  return (
    <tr
        key={widget.id}
    >
      <td>{ndx + 1}</td>
      <td style={{textAlign: 'left'}}>{widget.name}</td>
      <td style={{textAlign: 'right'}}>{ToNumberPresentation(widget.price, 'C')}</td>
      <td style={{textAlign: 'center'}}>{ToNumberPresentation(widget.instock)}</td>
    </tr>
  )
}

const TableRows: React.FunctionComponent<ITableRows> = ({widgets}) => {
  return (
    <tbody>
      {widgets.map((widget: IWidget, index: number) => WidgetTableRow({widget, ndx: index})) }
    </tbody>
  )
}

export default TableRows;