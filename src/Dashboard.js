var React = require('react');
var Widget = require('./Widget');

var Dashboard = React.createClass({
  
  render: function() {

    var dashboardStyle = {};

    var colSpan = 12/this.props.schema.style.colNum;
    //todo: validate colSpan
    var clazzName = "col-xs-" + colSpan;

    var widgets = this.props.schema.widgets.map(widget => {
      return (
        <div className={clazzName}>
          <Widget widget={widget}></Widget>
        </div>
      );
    });

    return (
      <div className="row" style={dashboardStyle}>
        {widgets}
      </div>
    );
  }

});

Dashboard.defaultProps = {
  schema      : {style:{colNum:2}, widgets:[]}
};

module.exports = Dashboard;