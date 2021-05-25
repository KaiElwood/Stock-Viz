import './App.css';
// import React, { Component } from 'react';
import MultiChart from "./views/multichart.js"
import SPY from './data/HistoricalPrices.csv';
import * as d3 from 'd3';

const D = {
  width: 600,
  height: 300,
  margin: { top: 30, right: 30, bottom: 30, left: 60 }
};

let inputData;

d3.csv(SPY, function(SPY) 
{ 
  console.log(SPY); 
  let newData = JSON.parse(JSON.stringify(SPY).replace(/\s(?=\w+":)/g, ""));
  newData.forEach(element => {
            let parseDate = d3.utcParse("%m/%d/%Y");
            let formatDate = d3.timeFormat("%b-%d")
            element.Date = new Date(formatDate(parseDate(element.Date)));
            element.Close = (element.Close.indexOf(" ") === -1) ? Number(element.Close) : Number(element.Close.substring(1));
        });
  inputData = newData; 
});



function App() {
  return (
    <MultiChart data={inputData} dimensions={D}/>
  );
}

export default App;
