// This script is pure js, no need of NodeJS.

// var React = require('react');
// var ReactDOM = require('react-dom');
// var ReactDashboard = require('../dist/Dashboard');


// var handleChange = function(value){
//   $('#testinput').val(value);
// };

//todo: specify row for each widget
var schema = {
  style:{},
  widgets:[
    {colSpan:"6", type:"PieChart", title:"title1", url:"remoteData.json", data:"testData1"}, //url has higher priority than data
    {colSpan:"6", type:"ColumnChart", title:"title2", url:"remoteData.json", data:"testData2"},
    {colSpan:"3", type:"TableView", title:"title3", url:"remoteData.json", data:"testData3"},
    {colSpan:"4", type:"TableView", title:"title4", url:"remoteData.json", data:"testData4"},
    {colSpan:"5", type:"TableView", title:"title5", url:"remoteData.json", data:"testData5"}
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