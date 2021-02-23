import React from 'react'

import TableHeader from './headers';
import TableRows from './rows';

import {ITable} from '../../common/types';

import './table.css'

const Table: React.FunctionComponent<ITable> = ({
  widgets,
  sortaction,
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
