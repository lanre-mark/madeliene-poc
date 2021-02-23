import React from 'react';

import {ILoading} from '../common/types';

const Loading: React.FunctionComponent<ILoading> = ({ message = 'Loading...', children }) => (
  <h1>
    {message}...
    {children}
  </h1>
);
export default Loading;
