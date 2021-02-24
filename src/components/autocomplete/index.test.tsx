import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from './index';

import {handleSelect} from '../../common/helper/test-data';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Autocomplete data={['a', 'aab', 'b', 'c']} onSelect={handleSelect}/>, div);
});