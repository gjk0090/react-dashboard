var React = require('react');
var ReactDOM = require('react-dom');
var Dashboard = require('../src/Dashboard');


// var handleChange = function(value){
//   $('#testinput').val(value);
// };

// $('#testinput').keyup(function(){
//     refreshDashboard();
// });

//todo: design schema
var schema = {
  style:{colNum:2},
  widgets:[
    {type:"PieChart", title:"title1", data:"testData1"},
    {type:"ColumnChart", title:"title2", data:"testData2"},
    {type:"TableView", title:"title3", data:"testData3"}
  ]
};

var refreshDashboard = function(){
  ReactDOM.render(
    <Dashboard message={$('#testinput').val()} schema={schema}></Dashboard>,
    document.getElementById('example')
  );
};

$(document).ready(function(){
  refreshDashboard();
});


//todo: make this example pure js (import ReactDOM, import this js, update webpack, import dist/ReactDashboard js, update readme)