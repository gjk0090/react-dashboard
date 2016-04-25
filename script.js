// This script is pure js, no need of NodeJS.

// var React = require('react');
// var ReactDOM = require('react-dom');
// var ReactDashboard = require('../dist/Dashboard');


// var handleChange = function(value){
//   $('#testinput').val(value);
// };

//todo: bind schema with Angular model and display on page

var schema = {
  style:{},
  widgets:[
    {colSpan:"6", type:"PieChart", title:"title1", url:"PieChart.json", data:"testData1"}, //url has higher priority than data
    {colSpan:"6", type:"ColumnChart", title:"title2", url:"ColumnChart.json", data:"testData2"},
    {colSpan:"5", type:"PieChart", title:"title3", url:"PieChart.json", data:"testData3"},
    {colSpan:"5", type:"ColumnChart", title:"title4", url:"ColumnChart.json", data:"testData4"},
    {colSpan:"2", type:"TableView", title:"title5", url:"remoteData.json", data:"testData5"}
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