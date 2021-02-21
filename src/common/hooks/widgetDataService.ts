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

  return {result, status, error, parts };
};

export {useWidgetDataService};