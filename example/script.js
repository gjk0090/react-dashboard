// This script uses pure js, no need of NodeJS.

// var React = require('react');
// var ReactDOM = require('react-dom');
// var ReactDashboard = require('../dist/Dashboard');


// var handleChange = function(value){
//   $('#testinput').val(value);
// };

var schema = {
  style:{colNum:2},
  widgets:[
    {type:"PieChart", title:"title1", data:"testData1"},
    {type:"ColumnChart", title:"title2", data:"testData2"},
    {type:"TableView", title:"title3", data:"testData3"}
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