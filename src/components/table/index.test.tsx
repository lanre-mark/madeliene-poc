import React from 'react';
import { render } from "@testing-library/react";
import Table from './index';

import {testData, notifyData} from '../../common/helper/test-data';


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

});