// This script is pure js, no need of NodeJS.

// var React = require('react');
// var ReactDOM = require('react-dom');
// var ReactDashboard = require('../dist/Dashboard');


// var handleChange = function(value){
//   $('#testinput').val(value);
// };

var schema = {
  style:{},
  widgets:[
    {colSpan:"6", type:"PieChart", title:"Pie Chart", url:"PieChart.json", data:"testData"}, //url has higher priority than data
    {colSpan:"6", type:"GeoChart", title:"Geo Chart", url:"GeoChart.json", data:"testData"},
    {colSpan:"12", type:"ColumnChart", title:"Column Chart", url:"ColumnChart.json", data:"testData"},
    {colSpan:"4", type:"TableView", title:"Table", url:"TableView.json", data:"testData"},
    {colSpan:"4", type:"ScatterChart", title:"Scatter Chart", url:"ScatterChart.json", data:"testData"},
    {colSpan:"4", type:"Gauge", title:"Gauge", url:"Gauge.json", data:"testData"}
  ]
};

var refreshDashboard = function(){
  // JSX
  // ReactDOM.render(
  //   <ReactDashboard schema={schema}></ReactDashboard>,
  //   document.getElementById('example')
  // );
  ReactDOM.render(React.createElement(ReactDashboard, {schema: schema}), document.getElementById('example'));
};

$(document).ready(function(){
  refreshDashboard();
});
