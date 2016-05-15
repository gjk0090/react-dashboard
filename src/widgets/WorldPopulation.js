var React = require('react');
var cloneDeep = require('lodash/fp/cloneDeep');
var GoogleChart = require('../chartcomponents/GoogleChart');

var WorldPopulation = React.createClass({

  statics: {
    getTemplate: function() {
      return {
        colSpan:"6", 
        type:"WorldPopulation", 
        title:"World Population", 
        ajax:"none", 
        params:[]
      };
    }
  },

  getInitialState: function(){
    return {data:[]};
  },

  componentDidMount: function(){
  	var dataList = [];

  	$.when(
	  $.get("http://api.population.io/1.0/population/Brazil/today-and-tomorrow/", function(result) {
	    dataList.push(["Brazil", result.total_population[0].population]);
	  }),
	  $.get("http://api.population.io/1.0/population/China/today-and-tomorrow/", function(result) {
	    dataList.push(["China", result.total_population[0].population]);
	  }),
	  $.get("http://api.population.io/1.0/population/United%20States/today-and-tomorrow/", function(result) {
	    dataList.push(["United States", result.total_population[0].population]);
	  }),
	  $.get("http://api.population.io/1.0/population/Canada/today-and-tomorrow/", function(result) {
	    dataList.push(["Canada", result.total_population[0].population]);
	  }),
	  $.get("http://api.population.io/1.0/population/Russian%20Federation/today-and-tomorrow/", function(result) {
	    dataList.push(["RU", result.total_population[0].population]);
	  }),
	  $.get("http://api.population.io/1.0/population/Australia/today-and-tomorrow/", function(result) {
	    dataList.push(["Australia", result.total_population[0].population]);
	  }),
	  $.get("http://api.population.io/1.0/population/India/today-and-tomorrow/", function(result) {
	    dataList.push(["India", result.total_population[0].population]);
	  })
	).then(function() {
	  var gc_data = cloneDeep(dataList);
	  gc_data.unshift(["Country","Population"]);
	  this.setState({data: gc_data});
	}.bind(this));
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

    if(this.state.data.length == 0){
      return (
        <div>Sorry, failed to fetch data from server.</div>
      );
    }

    var gc_options={
		colorAxis: {colors: ["#BCF5A9", "#04B404"]}
    };

    return (
      <GoogleChart data={this.state.data} options={gc_options} chartFunction="GeoChart" onClick={this.onClick}></GoogleChart>
    );
  }

});

WorldPopulation.defaultProps = {
  data      : [],
  onClick   : undefined
};

module.exports = WorldPopulation;
