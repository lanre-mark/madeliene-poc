import React from 'react';

import Autocomplete from '../autocomplete';
import {IHeaderForm} from '../../common/types';
import {useLocalStorageState} from '../../common/hooks';

import './header-form.css';

const HeaderForm: React.FunctionComponent<IHeaderForm> = (
    { 
      data = [],
      onSelect, 
    }
  ) => {

  const [restocklvl, setRestockLevel] = useLocalStorageState('restocklevel', 10);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestockLevel(e.target.value as any);
  }

  return (
    <div className="header-component">
      <h3>Madeliene Widgets!</h3>  
      <form>
        <label htmlFor="restocklevel">
          Restock Levels:
            <input
              type="number"
              className="restocklevel"
              name="restocklevel"
              data-testid="numeric-input"
              value={restocklvl}
              min={'1'}
              max={'1000'}
              onChange={handleInputChange}
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