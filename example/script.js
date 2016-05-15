var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope){
  
  $scope.schema = {
    title: "React Dashboard",
    style: {},
    widgets: [
      [
        {colSpan:"6", type:"GithubAuthor", title:"Github Author", ajax:"get", params:[{name:"owner", type:"string", value:"angular", displayName:"project owner"}, {name:"project", type:"string", value:"angular", displayName:"project name"}]},
        {colSpan:"6", type:"GithubCommit", title:"Github Commit", ajax:"get", params:[{name:"owner", type:"string", value:"facebook", displayName:"project owner"}, {name:"project", type:"string", value:"react", displayName:"project name"}]}
      ],
      [
        {colSpan:"6", type:"WorldPopulation", title:"World Population", ajax:"none", params:[]}
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

  //ReactDashboard.addWidgets({"RD":ReactDashboard,"RD2":"string2"});
  ReactDashboard.addWidget("CustomWidget", CustomWidget);

});