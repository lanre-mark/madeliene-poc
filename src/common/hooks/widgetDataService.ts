import { useEffect, useState } from 'react';
import { COLUMN_NAME, Direction, IWidget, PartsService, SortColumn, SortColumnDirection, SortDirection } from '../types';
import { getAllData } from '../../data';

const useWidgetDataService = () => {

  const [result, setResult] = useState<PartsService<IWidget[]>>({
    status: 'loading'
  });
  const [status, setStatus] = useState<string>(() => '');
  const [error, setError] = useState<Error | undefined>(() => undefined);
  const [parts, setParts] = useState<IWidget[]>(() => []);
  const [partnames, setPartnames] = useState<string[]>(() => []);

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
    
    const orderCtrl = sortDirections[column] === Direction.ASC ? Direction.DESC : sortDirections[column] === Direction.NONE ? direction : Direction.ASC ;

    // console.log(`Sorting ${column} header ib the ${orderCtrl} direction`);    

    const sortComparator = (a: IWidget , b: IWidget): number => {
      return orderCtrl === Direction.DESC ? 
        b[column].localeCompare(a[column], undefined, {numeric: column === COLUMN_NAME ? false : true}) :
        a[column].localeCompare(b[column], undefined, {numeric: column === COLUMN_NAME ? false : true});
    }

    const orderedData = parts.sort(sortComparator);

    setParts(orderedData);

    setSortDirections((prevState) => ({
      ...prevState, 
      [column]: prevState[column] === Direction.ASC ? Direction.DESC : Direction.ASC,
    }));

  }

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
        setStatus('loaded');
      })
      .catch(error => {
        setResult({ status: 'error', error });
        setError(error);
        setStatus('error');
        setPartnames([]);
      });
  }, []);

  return {error, parts, partnames, result, status, clearFilter, performFilter, sortWidgetsData };
};

export {useWidgetDataService};