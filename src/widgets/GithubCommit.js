var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var ColumnChart = require('../chartcomponents/ColumnChart');

var GithubCommit = React.createClass({

  statics: {
    getTemplate: function() {
      return {colSpan:"6", type:"GithubCommit", title:"Github Commit", ajax:"get", params:[{name:"owner", type:"string", value:"angular", displayName:"project owner"}, {name:"project", type:"string", value:"angular", displayName:"project name"}]};
    },
    prepareUrl: function(params){

      var owner = "";
      var project = "";

      angular.forEach(params, function(param){
        if(param.name == "owner"){owner = param.value;}
        if(param.name == "project"){project = param.value;}
      });

      var url = "https://api.github.com/repos/"+owner+"/"+project+"/commits";
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

  parseDate: function (input) {
      var parts = input.split('-');
      return Date.UTC(parts[0], parts[1]-1, parts[2]);
  },

  render: function() {
    //alert(JSON.stringify(this.props.data));

    if(this.props.data.length == 0){
      return (
        <div>Sorry, failed to fetch data from server.</div>
      );
    }

    var data = {};
    angular.forEach(this.props.data, function(commit){
      var day = commit.commit.author.date;
      day = day.substring(0, day.indexOf('T'));

      if (data[day]){
        data[day]++;
      } else {
        data[day] = 1;
      }
    });

    var seriesData = [];
    angular.forEach(data, function(count, day){
      seriesData.push([day, count]);
    });

    seriesData.sort(function(a, b){
      return this.parseDate(a[0]) - this.parseDate(b[0]);
    }.bind(this));

    //alert(JSON.stringify(seriesData));

    seriesData.unshift(["Day","Commits"]);

    var gc_data = seriesData;
    var gc_options = {
        "title": "Commit History",
        "colors": ["#9575cd", "#33ac71"],
        "hAxis": {
          "title": "Day",
        },
        "vAxis": {
          "title": "Commits"
        },
        legend: {position: 'none'},
        "animation":{
          "duration": 1000,
          "easing": "out",
          "startup": true
        }
      };

    return (
      <ColumnChart data={gc_data} options={gc_options} onClick={this.props.onClick}></ColumnChart>
    );
  }

});

GithubCommit.defaultProps = {
  data      : [],
  onClick   : undefined
};

module.exports = GithubCommit;
