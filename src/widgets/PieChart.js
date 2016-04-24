var React = require('react');

var PieChart = React.createClass({
  
  render: function() {

    var style = {};

    return (
      <div style={style}>
        Pie Chart, 
      	{this.props.data}
      </div>
    );
  }

});

PieChart.defaultProps = {
  data      : "default data"
};

module.exports = PieChart;