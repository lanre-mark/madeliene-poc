import React from 'react';

import Autocomplete from '../autocomplete';

import './header-form.css';

const HeaderForm: React.FunctionComponent<any> = (
  { 
    data = [],
    onSelect, 
  }: 
  { 
    data: any[], 
    onSelect: (srch: string) => void, //React.Dispatch<React.SetStateAction<{}>>
  }
) => {

  return (
    <div className="header-component">
      <h3>Monique Widgets!</h3>  
      <form>
        <label htmlFor="restocklevel">
          Restock Levels:
            <input
              type="number"
              className="restocklevel"
              name="restocklevel"
              min={'1'}
              max={'1000'}
            />
        </label>
        <div className='search-component'>
          Search:
            <Autocomplete data={data}  onSelect={onSelect} />
        </div>
      </form>
    </div>
  );
}

export default HeaderForm;