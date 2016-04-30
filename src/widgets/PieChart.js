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

    if(!chart){
      var chart = new google.visualization.PieChart(
        document.getElementById(this.state.id)
      );

      google.visualization.events.addListener(chart, 'select', this.handleSelect.bind(this, chart, data));
    }

    chart.draw(data, options);
  },

  handleSelect: function(chart, data){
    var value = data.getValue(chart.getSelection()[0].row,1);
    this.props.onClick(value);
    //alert(data.getValue(chart.getSelection()[0].row,1)); //if(undefined)
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
  data      : {data:[], options:{}},
  onClick   : undefined
};

module.exports = PieChart;