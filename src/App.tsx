import React from "react";

import HeaderForm from './components/top-header/header-form';
import Table from './components/table';
import {useWidgetDataService} from './common/hooks';

import "./App.css";


function App() {

  const {
    status, 
    parts, 
    performFilter, 
    clearFilter, 
  } = useWidgetDataService();

  const onAutoSelection = (srch: string): void => {
    srch === '' ? clearFilter() : performFilter(srch);
  }

  return (
    <div className="App">
      {status === 'loading' && <div>Loading...</div>}
      {status === 'loaded' && 
        <>
        <HeaderForm data={parts.map((p) => p.name)} onSelect={onAutoSelection}/>
        <Table widgets={parts} />
        </>
      }
      {status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  );
}

export default App;
