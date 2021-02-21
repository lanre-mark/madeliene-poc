import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Autocomplete data={['a', 'aab', 'b', 'c']}/>, div);
});