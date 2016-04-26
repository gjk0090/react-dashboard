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
    {colSpan:"6", type:"PieChart", title:"title1", url:"testdata/PieChart.json", data:"testData1"}, //url has higher priority than data
    {colSpan:"6", type:"GeoChart", title:"title2", url:"testdata/GeoChart.json", data:"testData2"},
    {colSpan:"12", type:"ColumnChart", title:"title3", url:"testdata/ColumnChart.json", data:"testData3"},
    {colSpan:"4", type:"TableView", title:"title4", url:"testdata/TableView.json", data:"testData4"},
    {colSpan:"4", type:"ScatterChart", title:"title5", url:"testdata/ScatterChart.json", data:"testData5"},
    {colSpan:"4", type:"Gauge", title:"Gauge", url:"testdata/Gauge.json", data:"testData6"}
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