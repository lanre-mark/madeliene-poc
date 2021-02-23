import { useEffect, useState } from 'react';
import { 
  COLUMN_NAME, 
  Direction, 
  INotification, 
  IWidget, 
  PartsService, 
  SortColumn, 
  SortColumnDirection, 
  SortDirection 
} from '../types';
import { getAllData } from '../../data';
import {OutofstockIcon, RestockInfo} from '../../components/toast/icons';

import {useLocalStorageState} from './';

const useWidgetDataService = () => {

  const [restocklvl] = useLocalStorageState('restocklevel', 10);

  const [result, setResult] = useState<PartsService<IWidget[]>>({
    status: 'loading'
  });
  const [status, setStatus] = useState<string>(() => '');
  const [error, setError] = useState<Error | undefined>(() => undefined);
  const [parts, setParts] = useState<IWidget[]>(() => []);
  const [partnames, setPartnames] = useState<string[]>(() => []);
  const [notificationList, setNotificationList] = useState<INotification[]>(() => []);
  const [showNotification, setShowNotification] = useState<boolean>(() => false);

  // sort direction
  const [sortDirections, setSortDirections] = useState<SortColumnDirection>(() => ({
    name: Direction.NONE,
    price: Direction.NONE,
    instock: Direction.NONE,
  }));

  // perform sorting
  /**
   * 
   * @param column The data/table column to use for sorting the data
   * @param direction The direction to be used ASC or DESC in sorting
   */
  const sortWidgetsData = (column: SortColumn, direction: SortDirection = Direction.DESC ): void => {
    
    const orderCtrl = sortDirections[column] === Direction.ASC ? 
      Direction.DESC : sortDirections[column] === Direction.NONE ? 
      direction : Direction.ASC ;

    // console.log(`Sorting ${column} header ib the ${orderCtrl} direction`);    

    const sortComparator = (a: IWidget , b: IWidget): number => {
      return orderCtrl === Direction.DESC ? 
        b[column].localeCompare(a[column], undefined, 
          {numeric: column === COLUMN_NAME ? false : true}) :
        a[column].localeCompare(b[column], undefined, 
          {numeric: column === COLUMN_NAME ? false : true});
    }

    const orderedData = parts.sort(sortComparator);

    setParts(orderedData);

    setSortDirections((prevState) => ({
      ...prevState, 
      [column]: prevState[column] === Direction.ASC ? Direction.DESC : Direction.ASC,
    }));

  }

  const generateNotificationList = (): void => {
    // Use re stock level staticly here
    // but we can combine a bunch of algorithms
    //    using rate at which items are purchased
    //    number of days it takes to re-order and item
    //    and a percentage level
    //    to determine re-stock point
    if (result.status === 'loaded') {
      const notifyStock = result.parts.filter((prts: IWidget): boolean => {
        return parseFloat(prts.instock) <= restocklvl;
      }).map((widget: IWidget) => ({
        id: widget.id.toString(),
        title: parseFloat(widget.instock) === 0 ? 'Out of Stock' : 'Re-Stock',
        description: parseFloat(widget.instock) === 0 ? `You are out of ${widget.name.toLowerCase()}'s stock, please re-order now.` : `Please re-stock ${widget.name.toLowerCase()}, you have ${widget.instock} unit${parseFloat(widget.instock) <= 1 ? '' : 's'} left.`,
        backgroundColor: parseFloat(widget.instock) === 0 ? '#d9534f' : '#5cb85c',
        icon: parseFloat(widget.instock) === 0 ? OutofstockIcon : RestockInfo,
      }));
      setNotificationList(notifyStock);
      setShowNotification(true);
    }
  };

  useEffect(() => {
    // console.log('Re-Stock level has changed');
    generateNotificationList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restocklvl])

  /**
   * perform filtering
   * @param filterBy string to filter main data with
   */
  const performFilter = (filterBy: string): void => {
    if (result.status === 'loaded') {
      setStatus('loading');
      const filteredParts = result.parts.filter((prts: IWidget): boolean => {
        return prts.name.toLowerCase().includes(filterBy.toLowerCase());
      })
      setParts(filteredParts);
      setStatus('loaded');
    }
  }
  /**
   * Reset Filter to Initial Data state
   */
  const clearFilter = (): void => {
    if (result.status === 'loaded') {
      setParts(result.parts);
    }
  }

  useEffect(() => {
    getAllData()
      .then(response => {
        setResult({ status: 'loaded', parts: response });
        setParts(response);
        setPartnames(() => {
          return response && response.length > 0 ? response.map((p: IWidget) => p.name) : []
        });
        generateNotificationList();
        setStatus('loaded');
      })
      .catch(error => {
        setResult({ status: 'error', error });
        setError(error);
        setStatus('error');
        setPartnames([]);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    error, 
    notificationList, 
    parts, 
    partnames, 
    result, 
    showNotification, 
    status, 
    clearFilter, 
    performFilter, 
    setShowNotification, 
    sortWidgetsData 
  };
};

export default useWidgetDataService;