var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var GoogleChartLoader = require('../GoogleChartLoader');

var Gauge = React.createClass({

  gc_id: null,
  chart: null,
  gc_data: null,
  gc_options: null,

  getInitialState: function(){
    this.gc_id = "gauge_"+Math.floor(Math.random() * 1000000);
    return null;
  },

  componentDidMount: function(){
    var self = this;
    GoogleChartLoader.init().then(function(){
      self.drawChart();
    });
  },
  
  componentDidUpdate: function(){
    if (GoogleChartLoader.is_loaded){
      this.drawChart();
    };
  },

  drawChart: function(){
    if(!this.chart){
      this.chart = new google.visualization.Gauge(document.getElementById(this.gc_id));
      google.visualization.events.addListener(this.chart, 'select', this.handleSelect);
    }

    if(!isArray(this.props.data.data) || isEmpty(this.props.data.data)){return;}

    this.gc_data = google.visualization.arrayToDataTable(this.props.data.data);
    this.gc_options = this.props.data.options;

    this.chart.draw(this.gc_data, this.gc_options);
  },

  handleSelect: function(){
    var chart = this.chart;
    var gc_data = this.gc_data;
    var selected = chart.getSelection()[0];
    if(selected && (selected.row || selected.row==0)){
      //var value = gc_data.getValue(selected.row, 0) + ", " + gc_data.getValue(selected.row, 1);
      //this.props.onClick(value);      
    }
  },

  render: function() {

    var chartWrapStyle = {};

    var chartStyle = {
        position: "absolute",
        width: "100%",
        height: "100%"
    };

    return (
      <div style={chartWrapStyle}>
        <div style={chartStyle} id={this.gc_id}>Sorry, Google Chart API is not properly loaded.</div>
      </div>
    );
  }

});

Gauge.defaultProps = {
  data      : {data:[], options:{}},
  onClick   : undefined
};

module.exports = Gauge;
