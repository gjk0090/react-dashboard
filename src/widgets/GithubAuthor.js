var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var forEach = require('lodash/forEach');
var GoogleChart = require('../chartcomponents/GoogleChart');

var GithubAuthor = React.createClass({

  statics: {
    getTemplate: function() {
      return {
        colSpan:"6", 
        type:"GithubAuthor", 
        title:"Github Author", 
        ajax:"get", 
        params:[
          {name:"owner", type:"string", value:"angular", displayName:"project owner"}, 
          {name:"project", type:"string", value:"angular", displayName:"project name"}
        ]
      };
    },
    prepareUrl: function(params){
      //var url = "testdata/PieChart.json";
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
      if(!!this.props.onClick){
        this.props.onClick(value);      
      }
    }
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
      var author = commit.commit.author.name;
      if (data[author]){
        data[author]++;
      } else {
        data[author] = 1;
      }
    });

    var seriesData = [];
    forEach(data, function(count, author){
      seriesData.push([author, count]);
    });
    //alert(JSON.stringify(seriesData));

    seriesData.unshift(["Author","Commits"]);

    var gc_data = seriesData;
    var gc_options = {
      "title": "Author Commits",
      "chartArea": {
        "left": "10%",
        "top": "10%",
        "height": "90%",
        "width": "90%"
      }
    };

    return (
      <GoogleChart data={gc_data} options={gc_options} chartFunction="PieChart" onClick={this.onClick}></GoogleChart>
    );
  }

});

GithubAuthor.defaultProps = {
  data      : [],
  widget    : {colSpan:"6", type:"GithubAuthor", title:"Github Author", ajax:"get", params:[{name:"owner", type:"string", value:"angular", displayName:"project owner"},  {name:"project", type:"string", value:"angular", displayName:"project name"}]},
  onClick   : undefined
};

module.exports = GithubAuthor;
