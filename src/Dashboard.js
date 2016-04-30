var React = require('react');
var Widget = require('./Widget');

var Dashboard = React.createClass({

  componentWillMount: function(){

    google.charts.load('current', {'packages':['corechart','table','gauge']}); //should be put outside
    google.charts.setOnLoadCallback(this.refreshWidgets);
  },

  refreshWidgets: function(){
    this.setState({}); //this.setState({}) will trigger a re-render
  },

  render: function() {

    var dashboardStyle = {};

    //todo: design layout
    var widgets = this.props.schema.widgets.map(widget => {

      var clazzName = "col-sm-" + widget.colSpan; //todo: validate colSpan

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