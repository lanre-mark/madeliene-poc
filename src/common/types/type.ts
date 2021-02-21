export const COLUMN_NAME = 'name';
export const COLUMN_PRICE = 'price';
export const COLUMN_INSTOCK = 'instock';


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