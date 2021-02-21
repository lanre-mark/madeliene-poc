import {IWidget} from '../common/types';
import { requestData } from '../common/api';

/**
 *  API Data Type validator 
 * @param arg each row of the data from api
 */
function isIWidget(arg: any): arg is IWidget {
  return (typeof arg.id === 'number' && typeof arg.name === 'string' && typeof arg.price ==='string' && typeof arg.instock === 'string' )
}

/**
 * 
 * perform an assertion on data from API; exploring typescript defs
 * 
 * @param arg data from API
 * @param check validator function
 * @param datadesc description of data object
 * @param excludeOnError : exclude objects that fail type def or exclude entire data objects
 */
function assertDataIsTypedArray<T>(arg: any, check: (val: any) => val is T, datadesc: string, excludeOnError: boolean = false): asserts arg is T[] {
  // paramter type validation
  if (!Array.isArray(arg)) throw new Error(`Not an array: ${JSON.stringify(arg)}`)
  // paramter data content validation
  const validation = arg.some(item => !check(item));
  if (validation) {
    if (excludeOnError) {
      // this operation is a side effect that mutates arg.
      const raiseAwareness = arg.filter(item => !check(item));
      console.error(`Wrong ${datadesc}${raiseAwareness.length > 1 ? 's' : ''} found and excluded from source data: ${JSON.stringify(raiseAwareness)}`);
      arg = arg.filter(item => check(item));
    } else {
      throw new Error(`Wrong ${datadesc} found: ${JSON.stringify(arg)}`);
    }
    return arg;
  }
}

let cachedWidgetData: Promise<IWidget[]>;
export async function getAllData() {
  if (typeof cachedWidgetData === 'undefined')
    cachedWidgetData = requestData().then(rawData => {
      // this may perform a side effect if there is any row of data that is invalidated
      rawData = assertDataIsTypedArray(rawData, isIWidget, 'Widget', true);
      return rawData;
    });

  return await cachedWidgetData;
}
