var React = require('react');

var TableView = React.createClass({
  
  render: function() {

    var style = {};

    return (
      <div style={style}>
        Table View; not implemented
      </div>
    );
  }

});

TableView.defaultProps = {
  data      : "default data"
};

module.exports = TableView;