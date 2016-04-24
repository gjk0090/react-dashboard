var React = require('react');

var ColumnChart = React.createClass({
  
  componentDidMount: function(){
    //this.drawChart();
  },

  componentDidUpdate: function(){
    this.drawChart();
  },

  drawChart: function(){

    var data = google.visualization.arrayToDataTable(this.props.data.data);

    var options = this.props.data.options;

    var chart = new google.visualization.ColumnChart(
      document.getElementById("columnChart1")
    );

    chart.draw(data, options);
  },

  render: function() {

    var style = {
      width: "100%",
      height: "300px"
    };

    return (
      <div style={style} id="columnChart1">
      	Column Chart
      </div>
    );
  }

});

ColumnChart.defaultProps = {
  data      : "default data"
};

module.exports = ColumnChart;