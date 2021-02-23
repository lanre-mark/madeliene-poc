import React from 'react'

import {ITableRows, IWidget, IWidgetTableRow} from '../../common/types';
import {ToNumberPresentation} from '../../common/helper';

const WidgetTableRow: React.FunctionComponent<IWidgetTableRow> = ({widget, notificationList, notifystatus, ndx}): any => {
  let colourHint = {};
  if (notifystatus && notificationList) {
    if (notificationList.length > 0) {
      const notifyPart = notificationList.findIndex(e => e.id === widget.id.toString());
      if (notifyPart >= 0) {
        colourHint = {backgroundColor: notificationList[notifyPart].backgroundColor};
      }
    }
  }
  return (
    <tr
      key={widget.id}
      style={colourHint}
    >
      <td>{ndx + 1}</td>
      <td style={{textAlign: 'left'}}>{widget.name}</td>
      <td style={{textAlign: 'right'}}>{ToNumberPresentation(widget.price, 'C')}</td>
      <td style={{textAlign: 'center'}}>{ToNumberPresentation(widget.instock)}</td>
    </tr>
  )
}

const TableRows: React.FunctionComponent<ITableRows> = ({widgets, notificationList, notifystatus}) => {
  return (
    <tbody>
      {widgets.map((widget: IWidget, index: number) => WidgetTableRow({widget, notificationList, notifystatus, ndx: index})) }
    </tbody>
  )
}

export default TableRows;