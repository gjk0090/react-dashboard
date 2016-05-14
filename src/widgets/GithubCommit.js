var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var forEach = require('lodash/forEach');
var GoogleChart = require('../chartcomponents/GoogleChart');

var GithubCommit = React.createClass({

  statics: {
    getTemplate: function() {
      return {
        colSpan:"6", 
        type:"GithubCommit", 
        title:"Github Commit", 
        ajax:"get", 
        params:[
          {name:"owner", type:"string", value:"facebook", displayName:"project owner"}, 
          {name:"project", type:"string", value:"react", displayName:"project name"}
        ]
      };
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
  
  onClick: function(selected, data){
    if(selected && (selected.row || selected.row==0)){
      var value = data.getValue(selected.row, 0) + ", " + data.getValue(selected.row, 1);
      this.props.onClick(value);      
    }
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
    forEach(this.props.data, function(commit){
      var day = commit.commit.author.date;
      day = day.substring(0, day.indexOf('T'));

      if (data[day]){
        data[day]++;
      } else {
        data[day] = 1;
      }
    });

    var seriesData = [];
    forEach(data, function(count, day){
      seriesData.push([day, count]);
    });

    seriesData.sort(function(a, b){
      return this.parseDate(a[0]) - this.parseDate(b[0]);
    }.bind(this));

    //alert(JSON.stringify(seriesData));

    seriesData.unshift(["Date","Commits"]);

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
      <GoogleChart data={gc_data} options={gc_options} chartFunction="ColumnChart" onClick={this.onClick}></GoogleChart>
    );
  }

});

GithubCommit.defaultProps = {
  data      : [],
  onClick   : undefined
};

module.exports = GithubCommit;
