import {act, renderHook} from "@testing-library/react-hooks";
import {useWidgetDataService} from './index';

import {testData} from '../helper/test-data';

describe('exposes the features and functionalities of useWdigetDataService hook', () => {
  it('returns proper initial states', () => {
    const {result: hookDataService} = renderHook(() => useWidgetDataService());

    expect(hookDataService.current.serviceResponse).toStrictEqual({ status: 'loading' });
    expect(hookDataService.current.notificationList).toEqual([]);
    expect(hookDataService.current.parts).toEqual([]);
    expect(hookDataService.current.partnames).toEqual([]);
    expect(hookDataService.current.status).toBe('loading');
    expect(hookDataService.current.error).toBeUndefined(); // toBeInstanceOf(Function);

    expect(hookDataService.current.clearFilter).toBeDefined();
    expect(hookDataService.current.clearFilter).toBeInstanceOf(Function);
    expect(hookDataService.current.performFilter).toBeDefined();
    expect(hookDataService.current.performFilter).toBeInstanceOf(Function);
    expect(hookDataService.current.setPartnames).toBeDefined();
    expect(hookDataService.current.setPartnames).toBeInstanceOf(Function);
    expect(hookDataService.current.setParts).toBeDefined();
    expect(hookDataService.current.setParts).toBeInstanceOf(Function);
    expect(hookDataService.current.setShowNotification).toBeDefined();
    expect(hookDataService.current.setShowNotification).toBeInstanceOf(Function);
    expect(hookDataService.current.sortWidgetsData).toBeInstanceOf(Function);
    expect(hookDataService.current.setShowNotification).toBeDefined();
    expect(hookDataService.current.setShowNotification).toBeInstanceOf(Function);
    expect(hookDataService.current.sortWidgetsData).toBeDefined();
    expect(hookDataService.current.sortWidgetsData).toBeInstanceOf(Function);

  })

  it('confirm status of data availability result', () => {
    const {result: hookDataService} = renderHook(() => useWidgetDataService());
    act(() => hookDataService.current.setServiceResponse({ status: 'loaded', parts: testData }));
    
    expect(hookDataService.current.serviceResponse.status).toEqual('loaded');
    expect(hookDataService.current.serviceResponse).toHaveProperty('parts');

  });

  it('confirm parts and partnames state', () => {
    const {result: hookDataService} = renderHook(() => useWidgetDataService());
    act(() => hookDataService.current.setParts(testData));
    act(() => hookDataService.current.setPartnames(testData.map(tst => tst.name)));
    
    expect(hookDataService.current.parts).toBeInstanceOf(Array);
    expect(hookDataService.current.partnames).toBeInstanceOf(Array);
    expect(hookDataService.current.parts).toEqual(testData);

  });

})