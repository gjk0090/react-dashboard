var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope){
  
  $scope.schema = {
    title: "React Dashboard",
    style: {},
    widgets: [
      [
        {colSpan:"4", type:"PieChart", title:"Pie Chart", url:"testdata/PieChart.json", params:[{name:"paramA", type:"string", value:"abc", configurable:true}], data:"testData"}, //url has higher priority than data
        {colSpan:"4", type:"GeoChart", title:"Geo Chart", url:"testdata/GeoChart.json", params:[{name:"paramA", type:"string", value:"abc", configurable:true}], data:"testData"}
      ],
      [
        {colSpan:"4", type:"ColumnChart", title:"Column Chart", url:"testdata/ColumnChart.json", params:[{name:"paramA", type:"string", value:"abc", configurable:false}], data:"testData"}
      ],
      [
        {colSpan:"4", type:"TableView", title:"Table", url:"testdata/TableView.json", params:[{name:"paramA", type:"string", value:"abc", configurable:true},{name:"paramB", type:"string", value:"efg", configurable:true}], data:"testData"},
        {colSpan:"4", type:"ScatterChart", title:"Scatter Chart", url:"testdata/ScatterChart.json", params:[{name:"paramA", type:"string", value:"abc", configurable:true}], data:"testData"},
        {colSpan:"4", type:"Gauge", title:"Gauge", url:"testdata/Gauge.json", params:[{name:"paramA", type:"string", value:"abc", configurable:false},{name:"paramB", type:"string", value:"efg", configurable:true}], data:"testData"}
      ]
    ]
  };

  $scope.handleEdit = function(widgets){
    
    $scope.schema.widgets = widgets;
    $scope.$apply(); //for the dsplaying table

    //save new config to DB
  };

  $scope.handleClick = function(i, j, type, value){
    alert('You clicked the ' + (i+1) + 'th row, '+ (j+1) + 'th widget, type is ' + type + ', the value of selected section is ' + value + '.');
  };

  ReactDOM.render(React.createElement(ReactDashboard, {schema: $scope.schema, onClick: $scope.handleClick, onEdit: $scope.handleEdit}), document.getElementById('example'));

});