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
  },

  render: function() {

    var style = {
      width: "100%",
      height: "300px"
    };

    return (
      <div style={style} id={this.state.id}>
      	Column Chart
      </div>
    );
  }

});

ColumnChart.defaultProps = {
  data      : "default data"
};

module.exports = ColumnChart;