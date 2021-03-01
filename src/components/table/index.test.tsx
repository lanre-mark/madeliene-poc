import React from 'react';
import {act, renderHook} from "@testing-library/react-hooks";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Table from './index';

import {testData, notifyData} from '../../common/helper/test-data';
import useWidgetDataService from '../../common/hooks/widgetDataService';


describe('renders table without crashing', () => {
  it("renders table headers", () => {
    const { getByText } = render(
      <Table widgets={testData.slice(0, 1)} notificationList={notifyData.slice(0, 1)}
        notifystatus={true} sortaction={jest.fn(() => {})}
      />
      );
    expect(getByText(/name/i)).toBeInTheDocument();
    expect(getByText(/price/i)).toBeInTheDocument();
    expect(getByText(/stock/i)).toBeInTheDocument();
  });

  it("headers respond to click event to sort table", () => {
    const sortaction = jest.fn(() => {});

    const { getByText } = render(
      <Table widgets={testData} notificationList={notifyData.slice(0, 1)} //.slice(0, 1)
        notifystatus={true} sortaction={sortaction}
      />
      );

    const nameHhr = getByText(/price/i);
    userEvent.click(nameHhr);

    expect(sortaction).toBeCalled();

    expect(sortaction).toHaveBeenCalledTimes(1);

    userEvent.click(nameHhr);
    expect(sortaction).toHaveBeenCalledTimes(2);

    userEvent.click(getByText(/name/i));
    expect(sortaction).toHaveBeenCalledTimes(3);

    userEvent.click(getByText(/stock/i));
    expect(sortaction).toHaveBeenCalledTimes(4);

  })

  it("renders table rows", () => {
    const { getByText } = render(
      <Table widgets={testData.slice(0, 1)} notificationList={notifyData.slice(0, 1)} 
        notifystatus={true} sortaction={jest.fn(() => {})}
      />
      );
    expect(getByText(/industrial laser/i).textContent).toEqual('Industrial Laser');
    expect(getByText(/2,764/i).textContent).toEqual('2,764.00');
    expect(getByText(/7,8/i).textContent).toEqual('7,832');
    
  });

  it("perform header clicks with mock data to sort table", () => {

    const {result : customHook }= renderHook(() => useWidgetDataService());

    act(() => customHook.current.setServiceResponse({ status: 'loaded', parts: [...testData] }));
    act(() => customHook.current.setParts([...testData]));

    const { getByText, rerender } = render(
      <Table widgets={customHook.current.parts} notificationList={customHook.current.notificationList} 
        notifystatus={customHook.current.showNotification} sortaction={customHook.current.sortWidgetsData}
      />
    );

    let rows = screen.getAllByRole('row');
    expect(rows.length).toBe(6)
    expect(rows[1].textContent).toBe('1Industrial Laser2,764.007,832');
    expect(rows[3].textContent).toBe('3Snooper robotic dog8,932.003');
    
    const nameHhr = getByText(/price/i);
    userEvent.click(nameHhr);

    rerender(
      <Table widgets={customHook.current.parts} notificationList={customHook.current.notificationList} 
        notifystatus={customHook.current.showNotification} sortaction={customHook.current.sortWidgetsData}
      />
    );
    
    expect(getByText(/price/i)).toBeInTheDocument();

    rows = screen.getAllByRole('row');
    expect(rows.length).toBe(6)
    expect(rows[1].textContent).toBe('1Snooper robotic dog8,932.003');
    expect(rows[2].textContent).toBe('2Industrial Laser2,764.007,832');
  });

});