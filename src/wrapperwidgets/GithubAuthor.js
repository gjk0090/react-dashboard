var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var PieChart = require('../corewidgets/PieChart');

var GithubAuthor = React.createClass({

  statics: {
    getTemplate: function() {
      //return {colSpan:"6", type:"GithubAuthor", title:"Github Author", url:"testdata/PieChart.json", params:[{name:"project", type:"string", value:"abcabc", configurable:true}], changeParamName:false};
      return {colSpan:"6", type:"GithubAuthor", title:"Github Author", ajax:"get", params:[{name:"project", type:"string", value:"/gjk0090/ReactDashboard", displayName:"project path"}]};
    },
    prepareUrl: function(params){
      var url = "testdata/PieChart.json";
      //var url = "https://api.github.com/repos/gjk0090/ReactDashboard/commits";
      return url;
    },
    prepareParamsForPost: function(params){

    }
  },

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
  },
  
  componentDidUpdate: function(){
  },

  render: function() {

    //prepare valid data
    // angular.forEach(commits, function(commit){
    //   var day = commit.commit.author.date;
    //   day = day.substring(0, day.indexOf('T'));

    //   if (data[day]){
    //     data[day]++;
    //   } else {
    //     data[day] = 1;
    //   }
    // });

    // var seriesData = [];
    // angular.forEach(data, function(count, day){
    //   seriesData.push([parseDate(day), count]);
    // });
    // seriesData.sort(function(a, b){
    //   return a[0] - b[0];
    // });

    // if ( commits ){
    //   $scope.chartConfig = {
    //     chart: {
    //       type: 'spline'
    //     },
    //     title: {
    //       text: 'Github commit history'
    //     },
    //     xAxis: {
    //       type: 'datetime'
    //     },
    //     yAxis: {
    //       title: {
    //         text: 'Commits'
    //       },
    //       min: 0
    //     },
    //     series: [{
    //       name: config.path,
    //       data: seriesData
    //     }]
    //   };
    // }

    var gc_data = this.props.data.data;
    var gc_options = this.props.data.options;

    return (
      <PieChart data={gc_data} options={gc_options} onClick={this.props.onClick}></PieChart>
    );
  }

});

GithubAuthor.defaultProps = {
  data      : {data:[], options:{}},
  onClick   : undefined
};

module.exports = GithubAuthor;
