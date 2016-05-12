var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var PieChart = require('../chartcomponents/PieChart');

var GithubAuthor = React.createClass({

  statics: {
    getTemplate: function() {
      return {colSpan:"6", type:"GithubAuthor", title:"Github Author", ajax:"get", params:[{name:"owner", type:"string", value:"angular", displayName:"project owner"}, {name:"project", type:"string", value:"angular", displayName:"project name"}]};
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

  render: function() {
    //alert(JSON.stringify(this.props.data));

    if(this.props.data.length == 0){
      return (
        <div>Sorry, failed to fetch data from server.</div>
      );
    }

    var data = {};
    angular.forEach(this.props.data, function(commit){
      var author = commit.commit.author.name;
      if (data[author]){
        data[author]++;
      } else {
        data[author] = 1;
      }
    });

    var seriesData = [];
    angular.forEach(data, function(count, author){
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
      <PieChart data={gc_data} options={gc_options} onClick={this.props.onClick}></PieChart>
    );
  }

});

GithubAuthor.defaultProps = {
  data      : [],
  onClick   : undefined
};

module.exports = GithubAuthor;
