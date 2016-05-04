var React = require('react');

var PieChart = React.createClass({

  getInitialState: function(){
    return {id : "pie_chart_"+Math.floor(Math.random() * 1000000)}; //id for google chart element //todo : this.id
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.gc_ready){

      if(!this.state.chart){
        var chart = new google.visualization.PieChart(document.getElementById(this.state.id));
        this.setState({chart: chart});

        google.visualization.events.addListener(chart, 'select', this.handleSelect);
      }

      //todo : validate data
      var gc_data = google.visualization.arrayToDataTable(nextProps.data.data);
      this.setState({gc_data: gc_data});

      var options = nextProps.data.options;
      this.setState({options: options});
    }
  },

  componentDidUpdate: function(){
    if (!!this.state.chart){
      this.state.chart.draw(this.state.gc_data, this.state.options);
    }
  },

  handleSelect: function(){
    var chart = this.state.chart;
    var gc_data = this.state.gc_data;
    var selected = chart.getSelection()[0];
    if(selected && (selected.row || selected.row==0)){
      var value = gc_data.getValue(selected.row, 0) + ", " + gc_data.getValue(selected.row, 1);
      this.props.onClick(value);      
    }
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
        <div style={chartStyle} id={this.state.id}>Sorry, Google Chart is not properly loaded.</div>
      </div>
    );
  }

});

PieChart.defaultProps = {
  data      : {data:[], options:{}},
  gc_ready  : false,
  onClick   : undefined
};

module.exports = PieChart;