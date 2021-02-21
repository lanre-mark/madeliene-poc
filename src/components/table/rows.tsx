import React from 'react'

import {IWidget} from '../../common/types';
import {ToNumberPresentation} from '../../common/helper';

const WidgetTableRow: React.FunctionComponent<any> = ({widget, ndx}: {widget: IWidget, ndx: number}): any => {
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

const TableRows: React.FunctionComponent<any> = ({widgets}: {widgets: IWidget[]}) => {
  return (
    <tbody>
      {widgets.map((widget: IWidget, index: number) => WidgetTableRow({widget, ndx: index})) }
    </tbody>
  )
}

export default TableRows;