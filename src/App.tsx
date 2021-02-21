import React, { useEffect, useState } from "react";
import "./App.css";
import Autocomplete from "./components/autocomplete";

interface PartType {
  id: number;
  name: string;
}

const Table = ({ parts }: { parts: PartType[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {parts.map((part) => {
          return (
            <tr>
              <td>{part.id}</td>
              <td>{part.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

function App() {
  const [parts, setParts] = useState<PartType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("http://localhost:8000/parts");
      const data = await resp.json();
      const myData: PartType[] = data;
      setParts(myData);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      Search: <Autocomplete data={parts.map((p) => p.name)} />
      <Table parts={parts} />
    </div>
  );
}

export default App;
