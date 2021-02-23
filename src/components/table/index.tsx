import React from 'react'

import TableHeader from './headers';
import TableRows from './rows';

import {ITable} from '../../common/types';

import './table.css'

const Table: React.FunctionComponent<ITable> = ({
  widgets,
  notificationList,
  notifystatus,
  sortaction,
}) => {

  return (
    <>
      <div className='scrollctrl'>
        <table className='widgets'>
          {<TableHeader sortaction={sortaction}/>}
          {<TableRows widgets={widgets}  notificationList={notificationList} notifystatus={notifystatus}/>}
        </table>
      </div>
    </>
  )
}

export default Table
