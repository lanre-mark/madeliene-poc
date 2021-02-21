import React, { useEffect, useState } from "react";
import "./App.css";
import {IWidget} from './common/types';
import Table from './components/table';

import Autocomplete from "./components/autocomplete";


function App() {
  const [parts, setParts] = useState<IWidget[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("http://localhost:8000/parts");
      const data = await resp.json();
      const myData: IWidget[] = data;
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
