import {HTTPErrorType} from './error';
import {
  COLUMN_NAME, 
  COLUMN_PRICE, 
  COLUMN_INSTOCK, 
  PartsDataIdle, 
  PartsDataLoaded, 
  PartsDataLoading, 
  PartsServiceError, 
} from './type';

/*
  number formats for String transformation/representations
*/
export type NumberFormats = 'N' | 'C';


/*
  Widget interface
*/
export interface IWidget {
  id: number;
  name: string;
  price: string;
  instock: string;
}

export type PartsService<T> =
  | PartsDataIdle
  | PartsDataLoading
  | PartsDataLoaded<T>
  | PartsServiceError;

export { 
  COLUMN_NAME, 
  COLUMN_PRICE, 
  COLUMN_INSTOCK,
  HTTPErrorType 
}