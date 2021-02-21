import React, { useEffect, useState } from "react";
import "./App.css";
import {IWidget} from './common/types';
import Table from './components/table';

import { getAllData } from './data';

import Autocomplete from "./components/autocomplete";


function App() {
  const [parts, setParts] = useState<IWidget[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getAllData();
      const myData: IWidget[] = resp;
      setParts(myData);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      Search: <Autocomplete data={parts.map((p) => p.name)} />
      <Table widgets={parts} />
    </div>
  );
}

export default App;
