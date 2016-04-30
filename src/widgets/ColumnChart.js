var React = require('react');

var ColumnChart = React.createClass({

  getInitialState: function(){
    return {id : "column_chart_"+Math.floor(Math.random() * 1000000)}; //id for google chart element
  },

  componentDidUpdate: function(){
    this.drawChart();
  },

  drawChart: function(){

    if(!google || !google.visualization){return;}

    var data = google.visualization.arrayToDataTable(this.props.data.data);

    var options = this.props.data.options;

    if(!chart){
      var chart = new google.visualization.ColumnChart(
        document.getElementById(this.state.id)
      );

      google.visualization.events.addListener(chart, 'select', this.handleSelect.bind(this, chart, data));
    }

    chart.draw(data, options);
  },

  handleSelect: function(chart, data){
    var value = "temp";
    this.props.onClick(value);
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