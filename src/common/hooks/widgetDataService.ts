import { useEffect, useState } from 'react';
import { IWidget, PartsService } from '../types';
import { getAllData } from '../../data';

const useWidgetDataService = () => {

  const [result, setResult] = useState<PartsService<IWidget[]>>({
    status: 'loading'
  });
  const [status, setStatus] = useState<string>(() => '');
  const [error, setError] = useState<Error | undefined>(() => undefined);
  const [parts, setParts] = useState<IWidget[]>(() => []);

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
        setStatus('loaded');
      })
      .catch(error => {
        setResult({ status: 'error', error });
        setError(error);
        setStatus('error');
      });
  }, []);

  return {error, parts, result, status, clearFilter, performFilter };
};

export {useWidgetDataService};