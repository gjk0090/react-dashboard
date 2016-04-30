var React = require('react');

var TableView = React.createClass({

  getInitialState: function(){
    return {id : "table_view_"+Math.floor(Math.random() * 1000000)}; //id for google chart element
  },

  componentDidUpdate: function(){
    this.drawChart();
  },

  drawChart: function(){

    if(!window.google || !window.google.visualization){return;}

    var data = google.visualization.arrayToDataTable(this.props.data.data);

    var options = this.props.data.options;

    var chart = new google.visualization.Table(
      document.getElementById(this.state.id)
    );

    chart.draw(data, options);
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

TableView.defaultProps = {
  data      : {data:[], options:{}}
};

module.exports = TableView;