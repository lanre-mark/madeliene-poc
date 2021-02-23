import React from 'react';
import shortid from 'shortid';

import {IIcon} from '../../../common/types';

const id = `price_down_${shortid.generate()}`;
const Icon: React.FunctionComponent<IIcon> = ({ fillColor, ...props }) => {
  return (
    <svg
      id={id}
      {...props}
      width="32px" 
      height="32px" 
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={`${fillColor || '#ffffff'}`}  id={`${id}_svg_1`} d="M 4 5 L 4 7 L 16 7 L 16 5 L 4 5 z M 22 5.5 L 21.279297 6.1894531 L 17 10.5 L 18.410156 11.910156 L 21 9.3105469 L 21 28 L 23 28 L 23 9.3105469 L 25.589844 11.910156 L 27 10.5 L 22.720703 6.1894531 L 22 5.5 z M 4 9 L 4 11 L 14 11 L 14 9 L 4 9 z M 4 13 L 4 15 L 12 15 L 12 13 L 4 13 z M 4 17 L 4 19 L 10 19 L 10 17 L 4 17 z M 4 21 L 4 23 L 8 23 L 8 21 L 4 21 z M 4 25 L 4 27 L 6 27 L 6 25 L 4 25 z"/>
    </svg>
  );
};

export default Icon;