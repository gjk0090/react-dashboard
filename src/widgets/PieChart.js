var React = require('react');

var PieChart = React.createClass({

  componentWillMount: function(){
    this.setState({id : "pie_chart_"+Math.floor(Math.random() * 1000000)}); //id for google chart element
  },

  componentDidUpdate: function(){
    this.drawChart();
  },

  drawChart: function(){

    var data = google.visualization.arrayToDataTable(this.props.data.data);

    var options = this.props.data.options;

    var chart = new google.visualization.PieChart(
      document.getElementById(this.state.id)
    );

    chart.draw(data, options);
  },

  render: function() {

    //auto height from http://jsfiddle.net/toddlevy/c59HH/
    var chartWrapStyle = {
        position: "relative",
        paddingBottom: "70%"
    };

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

PieChart.defaultProps = {
  data      : {data:[], options:{}}
};

module.exports = PieChart;