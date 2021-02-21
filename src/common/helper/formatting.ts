import {NumberFormats} from '../types';

/*
  convert numeric into user presentable formats
  currency, styled numerics, etcs
  @param numValue: number | string
  @param format: NumberFormats
*/
const ToNumberPresentation = (numValue: number | string, format: NumberFormats = 'N'): string => {
  return format === 'N' ? typeof numValue === 'number' ? numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : typeof numValue === 'number' ? numValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : Number(numValue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export {ToNumberPresentation}