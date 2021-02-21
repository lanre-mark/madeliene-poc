import React from "react";

import Autocomplete from "./components/autocomplete";
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
        Search: <Autocomplete data={parts.map((p) => p.name)} />
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
