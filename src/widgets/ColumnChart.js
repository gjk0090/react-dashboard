var React = require('react');

var ColumnChart = React.createClass({

  getInitialState: function(){
    return {id : "column_chart_"+Math.floor(Math.random() * 1000000)}; //id for google chart element //todo : id from parent?
  },

  componentWillReceiveProps: function(nextProps) {
    if(window.google && window.google.visualization){

      if(!this.state.chart){
        var chart = new google.visualization.ColumnChart(document.getElementById(this.state.id));
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
    if(window.google && window.google.visualization){
      this.state.chart.draw(this.state.gc_data, this.state.options);
    }
  },

  handleSelect: function(){
    var chart = this.state.chart;
    var gc_data = this.state.gc_data;
    var selected = chart.getSelection()[0];
    if(selected && (selected.row || selected.row==0) && (selected.column || selected.column==0)){
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
        <div style={chartStyle} id={this.state.id}></div>
      </div>
    );
  }

});

ColumnChart.defaultProps = {
  data      : {data:[], options:{}},
  onClick   : undefined
};

module.exports = ColumnChart;