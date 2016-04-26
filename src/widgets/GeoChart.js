var React = require('react');

var GeoChart = React.createClass({

  componentWillMount: function(){
    this.setState({id : "geo_chart_"+Math.floor(Math.random() * 1000000)}); //id for google chart element
  },

  componentDidUpdate: function(){
    this.drawChart();
  },

  drawChart: function(){

    var data = google.visualization.arrayToDataTable(this.props.data.data);

    var options = this.props.data.options;

    var chart = new google.visualization.GeoChart(
      document.getElementById(this.state.id)
    );

    chart.draw(data, options);
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
        <div style={chartStyle} id={this.state.id}></div>
      </div>
    );
  }

});

GeoChart.defaultProps = {
  data      : {data:[], options:{}}
};

module.exports = GeoChart;