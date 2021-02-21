export const COLUMN_NAME = 'name';
export const COLUMN_PRICE = 'price';
export const COLUMN_INSTOCK = 'instock';

export enum Direction {
  DESC = 0,
  ASC = 1,
  NONE = 2,
}

export interface PartsDataIdle {
  status: 'idle';
}

export interface PartsDataLoading {
  status: 'loading';
}

export interface PartsDataLoaded<T> {
  status: 'loaded';
  parts: T;
}

export interface PartsServiceError {
  status: 'error';
  error: Error;
}