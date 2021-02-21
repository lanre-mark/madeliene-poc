import React from 'react'
import {COLUMN_NAME, COLUMN_PRICE, COLUMN_INSTOCK, SortColumn} from '../../common/types';
import {assertUnreachableTypes} from '../../common/helper';

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

export default TableHeader;