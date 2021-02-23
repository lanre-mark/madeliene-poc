import React from 'react';
import shortid from 'shortid';

import {IIcon} from '../../../common/types';

const id = `number_down_${shortid.generate()}`;
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
      <path fill={`${fillColor || '#ffffff'}`}  id={`${id}_svg_1`} d="M 8.5 5 C 6.578125 5 5 6.578125 5 8.5 L 5 9 L 7 9 L 7 8.5 C 7 7.625 7.625 7 8.5 7 L 9.5 7 C 10.375 7 11 7.625 11 8.5 C 11 8.957031 10.648438 9.480469 10.0625 9.84375 C 8.828125 10.601563 7.746094 11.085938 6.84375 11.59375 C 6.390625 11.847656 5.976563 12.089844 5.625 12.46875 C 5.273438 12.847656 5 13.417969 5 14 L 5 15 L 13 15 L 13 13 L 8.4375 13 C 9.171875 12.621094 10.019531 12.242188 11.125 11.5625 C 12.140625 10.925781 13 9.84375 13 8.5 C 13 6.578125 11.421875 5 9.5 5 Z M 22 5 L 22 23.6875 L 19.40625 21.09375 L 18 22.5 L 22.28125 26.8125 L 23 27.5 L 23.71875 26.8125 L 28 22.5 L 26.59375 21.09375 L 24 23.6875 L 24 5 Z M 8.59375 17 L 8.4375 17.78125 C 8.4375 17.78125 8.273438 18.355469 7.875 18.9375 C 7.476563 19.519531 6.980469 20 6 20 L 6 22 C 7.375 22 8.320313 21.324219 9 20.59375 L 9 27 L 11 27 L 11 17 Z"/>
    </svg>
  );
};

export default Icon;