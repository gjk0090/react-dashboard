var React = require('react');

var ColumnChart = React.createClass({
  
  render: function() {

    var style = {};

    return (
      <div style={style}>
      	Column Chart, 
      	{this.props.data}
      </div>
    );
  }

});

ColumnChart.defaultProps = {
  data      : "default data"
};

module.exports = ColumnChart;