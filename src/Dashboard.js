var React = require('react');
var Widget = require('./Widget');

var Dashboard = React.createClass({

  componentWillMount: function(){

    if(window.google && window.google.charts){
      google.charts.load('current', {'packages':['corechart','table','gauge']}); //should be put outside
      google.charts.setOnLoadCallback(this.refreshWidgets);
    }else{
      console.warn('Google Chart API not loaded, cannot use some type of widgets.');
    }
  },

  refreshWidgets: function(){
    this.setState({}); //this.setState({}) will trigger a re-render
  },

  handleClick: function(i, type, value) {
    //alert('You clicked the ' + (i+1) + 'th widget, type is ' + type + ', the value of selected section is ' + value + '.');
    if(this.props.onClick){
      this.props.onClick(i, type, value);
    }
  },

  render: function() {

    var dashboardStyle = {};

    //todo: design layout
    var widgets = this.props.schema.widgets.map((widget, i) => {

      var clazzName = "col-sm-" + widget.colSpan; //todo: validate colSpan

      return (
        <div className={clazzName}>
          <Widget widget={widget} onClick={this.handleClick.bind(this, i, widget.type)}></Widget>
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