import React from 'react';
import { render, waitFor } from "@testing-library/react";
import Toast from './index';

import {handleNotified, notifyData} from '../../common/helper/test-data';


describe('renders toasts without crashing', () => {
  it("basic elements", () => {
    
    const {getAllByText, getByText} = render(
      <Toast notificationList={notifyData.slice(0, 1)} notifyState={handleNotified}/>
    );
    getAllByText(/re-stock/i);
    expect(getAllByText(/re-stock/i)).toBeInstanceOf(Array);
    expect(getByText(/please re-stock/i)).toBeInTheDocument();

  });

  describe('waits for toast to disappear', () => {
    it('removes toats after dismiss time', async () => {
      const { getAllByText, getByText } = render(
        <Toast notificationList={notifyData.slice(0, 1)} notifyState={handleNotified} autoDelete={true} dismissTime={500} />
      );

      getAllByText(/re-stock/i);
      const restockValue = getByText(/please re-stock/i);
      await waitFor(() => {
        expect(restockValue).not.toBeInTheDocument();
      });
    });
  });

});