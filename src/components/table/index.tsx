import React from 'react'

import {COLUMN_NAME, COLUMN_PRICE, COLUMN_INSTOCK, IWidget, SortAction, SortColumn} from '../../common/types';
import {assertUnreachableTypes} from '../../common/helper';
import {ToNumberPresentation} from '../../common/helper';

import './table.css'


const TableHeader: React.FunctionComponent<any> = ({sortaction}) => {

  const onHeaderClick = (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, type: SortColumn) => {
    switch (type) {
      case COLUMN_NAME:
        sortaction(COLUMN_NAME);
        break;
      case COLUMN_PRICE:
        sortaction(COLUMN_PRICE);
        break;
      case COLUMN_INSTOCK:
        sortaction(COLUMN_INSTOCK);
        break;
      default:
        assertUnreachableTypes(type, 'Unrecognized sort column');
    }
  };

  return  (
    <thead>
      <tr>
        <th>ID</th>
        <th onClick={(e) => onHeaderClick(e, COLUMN_NAME)}>Name</th>
        <th onClick={(e) => onHeaderClick(e, COLUMN_PRICE)}>Price</th>
        <th onClick={(e) => onHeaderClick(e, COLUMN_INSTOCK)}>Stock</th>
      </tr>
    </thead>
  )
}


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

const Table: React.FunctionComponent<any> = ({
  widgets,
  sortaction,
}: {
  widgets: IWidget[],
  sortaction: SortAction,
}) => {

  return (
    <>
      <div className='scrollctrl'>
        <table className='widgets'>
          {<TableHeader sortaction={sortaction}/>}
          {<TableRows widgets={widgets}/>}
        </table>
      </div>
    </>
  )
}

export default Table
