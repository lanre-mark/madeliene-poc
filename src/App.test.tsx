import React from 'react';
import { render } from '@testing-library/react';
import {act, renderHook} from "@testing-library/react-hooks";
import App from './App';

import {testData, notifyData} from './common/helper/test-data';
import useWidgetDataService from './common/hooks/widgetDataService';

const mockedCustomHook = 
jest.mock('./common/hooks/widgetDataService', () => {
  return jest.fn(() => ({
    activeSortObjects: '',
    error: '', 
    notificationList: [], 
    parts: [], 
    partnames: [], 
    serviceResponse: {status: 'loaded', parts: []}, 
    showNotification: false, 
    status: 'error', 
    clearFilter: jest.fn(() => {}), 
    performFilter: jest.fn(() => {}), 
    setPartnames: jest.fn(() => {}),
    setParts: jest.fn(() => {}),
    setServiceResponse: jest.fn(() => {}),
    setShowNotification: jest.fn(() => {}), 
    setStatus: jest.fn(() => {}),
    sortWidgetsData: jest.fn(() => {}), 
  }));
});


// console.log(mockedCustomHook);


test('renders learn react link', () => {
  const {getByText} = render(<App />);
  const linkElement = getByText(/search/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders loading component', () => {
  const {result : customHook }= renderHook(() => useWidgetDataService());

  act(() => customHook.current.setServiceResponse({ status: 'loaded', parts: [...testData] }));
  act(() => customHook.current.setParts([...testData]));
  console.log(customHook.current.status);



});
