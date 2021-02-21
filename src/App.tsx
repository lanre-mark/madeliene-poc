import React from "react";

import HeaderForm from './components/top-header/header-form';
import Table from './components/table';
import {useWidgetDataService} from './common/hooks';

import "./App.css";


function App() {

  const {
    status, 
    parts, 
  } = useWidgetDataService();

  return (
    <div className="App">
      {status === 'loading' && <div>Loading...</div>}
      {status === 'loaded' && 
        <>
        <HeaderForm data={parts.map((p) => p.name)}/>
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
