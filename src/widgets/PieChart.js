var React = require('react');

var PieChart = React.createClass({

  componentDidMount: function(){
    //this.drawChart();
  },

  componentDidUpdate: function(){
    this.drawChart();
  },

  drawChart: function(){
    
    var data = google.visualization.arrayToDataTable(this.props.data.data);

    var options = this.props.data.options;

    var chart = new google.visualization.PieChart(
      document.getElementById("pieChart1") //todo: auto id
    );

    chart.draw(data, options);
  },

  render: function() {
    
    var style = {
      width: "100%",
      height: "300px" //todo: auto height
    };

    return (
      <div style={style} id="pieChart1">
        Pie Chart
      </div>
    );
  }

});

PieChart.defaultProps = {
  data      : {data:[], options:{}}
};

module.exports = PieChart;