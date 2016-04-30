var React = require('react');

var PieChart = React.createClass({

  getInitialState: function(){
    return {id : "pie_chart_"+Math.floor(Math.random() * 1000000)}; //id for google chart element //todo : id from parent?
  },

  componentDidUpdate: function(){
    this.drawChart();
  },

  drawChart: function(){

    //todo : validate data

    if(!google || !google.visualization){return;}

    var data = google.visualization.arrayToDataTable(this.props.data.data);

    var options = this.props.data.options;

    var chart = new google.visualization.PieChart(
      document.getElementById(this.state.id)
    );

    google.visualization.events.addListener(chart, 'select', function() {
      alert(JSON.stringify(chart.getSelection()));
      //alert(data.getValue(chart.getSelection()[0].row,1)); //if(undefined)
    });

    chart.draw(data, options);
  },

  render: function() {

    //auto height from http://jsfiddle.net/toddlevy/c59HH/
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

PieChart.defaultProps = {
  data      : {data:[], options:{}}
};

module.exports = PieChart;