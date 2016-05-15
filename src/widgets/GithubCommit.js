var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var forEach = require('lodash/forEach');
var GoogleChart = require('../chartcomponents/GoogleChart');
var GithubAuthor = require('./GithubAuthor');
var Modal = require('react-bootstrap').Modal;

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
    return {showModal:false};
  },

  componentDidMount: function(){
  },
  
  componentDidUpdate: function(){
  },
  
  onClick: function(selected, data){
    if(selected && (selected.row || selected.row==0)){
      var value = data.getValue(selected.row, 0) + ", " + data.getValue(selected.row, 1);
      if(!!this.props.onClick){
        //this.props.onClick(value);
      }
      
      //get project from current params
      //build url with project and selected date (selected.row, 0)
      //https://api.github.com/repos/angular/angular/commits?since=2016-05-13&until=2016-05-14
      //sync ajax get data
      //validate and set to state
      //set modal header
      this.setState({showModal:true});      
    }
  }, 

  closeModal:function(){
    this.setState({showModal:false});
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
      var day = commit.commit.committer.date;
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
      <div>
      <GoogleChart data={gc_data} options={gc_options} chartFunction="ColumnChart" onClick={this.onClick}></GoogleChart>

      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{position: "relative",height:window.innerHeight/4}}>
            <GithubAuthor data={this.props.data} ></GithubAuthor>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" onClick={this.closeModal}>Close</button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }

});

GithubCommit.defaultProps = {
  data      : [],
  onClick   : undefined
};

module.exports = GithubCommit;
