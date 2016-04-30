var React = require('react');

var ColumnChart = React.createClass({
  
  componentWillMount: function(){
    this.setState({id : "column_chart_"+Math.floor(Math.random() * 1000000)}); //id for google chart element
  },

  componentDidUpdate: function(){
    this.drawChart();
  },

  drawChart: function(){

    var data = google.visualization.arrayToDataTable(this.props.data.data);

    var options = this.props.data.options;

    var chart = new google.visualization.ColumnChart(
      document.getElementById(this.state.id)
    );

    chart.draw(data, options);

    google.visualization.events.addListener(chart, 'select', function() {
      alert(JSON.stringify(chart.getSelection()));
      alert(JSON.stringify(data));
      //alert(data.getValue(chart.getSelection()[0].row,1));
    });

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

ColumnChart.defaultProps = {
  data      : "default data"
};

module.exports = ColumnChart;