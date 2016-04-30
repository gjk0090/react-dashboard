var React = require('react');

var PieChart = React.createClass({

  getInitialState: function(){
    return {id : "pie_chart_"+Math.floor(Math.random() * 1000000)}; //id for google chart element //todo : id from parent?
  },

  componentWillReceiveProps: function(nextProps) {
    if(window.google && window.google.visualization && !this.state.chart){

      var chart = new google.visualization.PieChart(document.getElementById(this.state.id));
      this.setState({chart: chart});

      //todo : validate data
      var gc_data = google.visualization.arrayToDataTable(nextProps.data.data);
      this.setState({gc_data: gc_data});

      var options = nextProps.data.options;
      this.setState({options: options});
        
      google.visualization.events.addListener(chart, 'select', this.handleSelect.bind(this, chart, gc_data));
    }
  },

  componentDidUpdate: function(){
    if(window.google && window.google.visualization){
      this.state.chart.draw(this.state.gc_data, this.state.options);
    }
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