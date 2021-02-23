import React from 'react';
import shortid from 'shortid';

import {IIcon} from '../../../common/types';

const id = `outofstock_${shortid.generate()}`;
const Icon: React.FunctionComponent<IIcon> = ({ title, desc, fillColor1, fillColor2, ...props }) => {
  return (
    <svg
      id={id}
      {...props}
      width="32" 
      height="32" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <title id={`${id}_Title`}>{title || ''}</title>
        <desc id={`${id}_Desc`}>{desc || ''}</desc>
        <rect fill="none" id={`${id}_canvas_background`} height="402" width="582" y="-1" x="-1"/>
        </g>
        <g>
        <title>{`${id}_Layer_1`}</title>
        <circle fill={`${fillColor1 || '#ffffff'}`} r="16" id="BG" cy="16" cx="16"/>
        <path fill={`${fillColor2 || '#d72828'}`} id={`${id}_Exclamatory_x5F_Sign`} d="m14.5,25l3,0l0,-3l-3,0l0,3zm0,-19l0,13l3,0l0,-13l-3,0z"/>
        </g>
    </svg>


  );
};

export default Icon;