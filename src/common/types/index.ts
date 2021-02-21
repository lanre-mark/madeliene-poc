import {HTTPErrorType} from './error';
import {
  COLUMN_NAME, 
  COLUMN_PRICE, 
  COLUMN_INSTOCK,
  Direction,
  PartsDataIdle, 
  PartsDataLoaded, 
  PartsDataLoading, 
  PartsServiceError, 
} from './type';

/*
  number formats for String transformation/representations
*/
export type NumberFormats = 'N' | 'C';

export type SortColumn = typeof COLUMN_NAME | typeof COLUMN_PRICE | typeof COLUMN_INSTOCK;

export type SortDirection = Direction.DESC | Direction.ASC;

export interface SortColumnDirection {
  name: Direction,
  price: Direction,
  instock: Direction, 
}

/*
  Widget interface
*/
export interface IWidget {
  id: number;
  name: string;
  price: string;
  instock: string;
}

export interface SortAction {
  sortaction: (column: SortColumn, direction: SortDirection) => void;
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
  Direction,
  HTTPErrorType 
}