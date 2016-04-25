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
    
    var style = {
      width: "100%",
      height: "300px" //todo: auto height
    };

    return (
      <div style={style} id={this.state.id}>
        Pie Chart
      </div>
    );
  }

});

PieChart.defaultProps = {
  data      : {data:[], options:{}}
};

module.exports = PieChart;