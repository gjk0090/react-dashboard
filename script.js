// var React = require('react');
// var ReactDOM = require('react-dom');
// var ReactDashboard = require('../dist/Dashboard');


var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope){
  $scope.schema = {
    style:{},
    widgets:[
      {colSpan:"6", type:"PieChart", title:"Pie Chart", url:"testdata/PieChart.json", data:"testData"}, //url has higher priority than data
      {colSpan:"6", type:"GeoChart", title:"Geo Chart", url:"testdata/GeoChart.json", data:"testData"},
      {colSpan:"12", type:"ColumnChart", title:"Column Chart", url:"testdata/ColumnChart.json", data:"testData"},
      {colSpan:"4", type:"TableView", title:"Table", url:"testdata/TableView.json", data:"testData"},
      {colSpan:"4", type:"ScatterChart", title:"Scatter Chart", url:"testdata/ScatterChart.json", data:"testData"},
      {colSpan:"4", type:"Gauge", title:"Gauge", url:"testdata/Gauge.json", data:"testData"}
    ]
  };

  $scope.refreshDashboard = function(){
  // JSX
  // ReactDOM.render(
  //   <ReactDashboard schema={schema}></ReactDashboard>,
  //   document.getElementById('example')
  // );
    ReactDOM.render(React.createElement(ReactDashboard, {schema: $scope.schema}), document.getElementById('example'));
  };

  $scope.$watch('schema', function(newValue, oldValue) {
    $scope.refreshDashboard();
  }, true); //3rd parameter true, watch values in object 
});



// no AngularJS

// var schema = {
//   style:{},
//   widgets:[
//     {colSpan:"6", type:"PieChart", title:"Pie Chart", url:"testdata/PieChart.json", data:"testData"}, //url has higher priority than data
//     {colSpan:"6", type:"GeoChart", title:"Geo Chart", url:"testdata/GeoChart.json", data:"testData"},
//     {colSpan:"12", type:"ColumnChart", title:"Column Chart", url:"testdata/ColumnChart.json", data:"testData"},
//     {colSpan:"4", type:"TableView", title:"Table", url:"testdata/TableView.json", data:"testData"},
//     {colSpan:"4", type:"ScatterChart", title:"Scatter Chart", url:"testdata/ScatterChart.json", data:"testData"},
//     {colSpan:"4", type:"Gauge", title:"Gauge", url:"testdata/Gauge.json", data:"testData"}
//   ]
// };

// var refreshDashboard = function(){
//   // JSX
//   // ReactDOM.render(
//   //   <ReactDashboard schema={schema}></ReactDashboard>,
//   //   document.getElementById('example')
//   // );
//   ReactDOM.render(React.createElement(ReactDashboard, {schema: schema}), document.getElementById('example'));
// };

// $(document).ready(function(){
//   refreshDashboard();
// });