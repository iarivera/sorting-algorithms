//import React, {Component} from "react";
import './App.css';
import { data } from './settings/data';
import Barchart from './barchart';


function App() {
  return (
    <div className="App">
      <Barchart data={data}></Barchart>
    </div>
  );
}

export default App;
