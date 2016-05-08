var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');

var ColumnChart = React.createClass({

  statics: {
    getTemplate: function() {
      return {colSpan:"4", type:"ColumnChart", title:"Column Chart", url:"testdata/ColumnChart.json", params:[{name:"paramA", type:"string", value:"abc", configurable:false}], data:"testData"};
    }
  },

  gc_id: null,
  chart: null,
  gc_data: null,
  gc_options: null,

  getInitialState: function(){
    this.gc_id = "column_chart_"+Math.floor(Math.random() * 1000000);
    return null;
  },

  componentDidMount: function(){
    var self = this;
    ReactDashboard.GoogleChartLoader.init().then(function(){
      self.drawChart();
    });
  },
  
  componentDidUpdate: function(){
    if (ReactDashboard.GoogleChartLoader.is_loaded){
      this.drawChart();
    };
  },

  drawChart: function(){
    if(!this.chart){
      this.chart = new google.visualization.ColumnChart(document.getElementById(this.gc_id));
      google.visualization.events.addListener(this.chart, 'select', this.handleSelect);
    }

    if(!isArray(this.props.data.data) || isEmpty(this.props.data.data)){return;}

    this.gc_data = google.visualization.arrayToDataTable(this.props.data.data);
    this.gc_options = {
      title: "Motivation and Energy Level Throughout the Day",
      colors: ["#9575cd", "#33ac71"],
      hAxis: {
        title: "Time of Day",
        format: "h:mm a",
        viewWindow: {
          min: [7, 30, 0],
          max: [17, 30, 0]
        }
      },
      vAxis: {
        title: "Rating (scale of 1-10)"
      },
      animation:{
        duration: 1000,
        easing: "out",
        startup: true
      }
    };

    this.chart.draw(this.gc_data, this.gc_options);
  },

  handleSelect: function(){
    var chart = this.chart;
    var gc_data = this.gc_data;
    var selected = chart.getSelection()[0];
    if(selected && (selected.row || selected.row==0) && (selected.column || selected.column==0)){
      var value = gc_data.getValue(selected.row, 0) + ", " + gc_data.getValue(selected.row, 1);
      this.props.onClick(value);      
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

ColumnChart.defaultProps = {
  data      : {data:[], options:{}},
  onClick   : undefined
};

module.exports = ColumnChart;
