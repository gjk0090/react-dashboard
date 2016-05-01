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

  handleClick: function(i, j, type, value) {
    //alert('You clicked the ' + (i+1) + 'th row, '+ (j+1) + 'th widget, type is ' + type + ', the value of selected section is ' + value + '.');
    if(this.props.onClick){
      this.props.onClick(i, j, type, value);
    }
  },

  render: function() {

    var dashboardStyle = {};
    var rowStyle = {
      //border: "1px dashed grey" //for edit mode
    };

    //todo: design layout
    var rows = this.props.schema.widgets.map((row, i) => {

      var widgets = row.map((widget, j) => {
        var clazzName = "col-sm-" + widget.colSpan; //todo: validate colSpan
        var widgetHeight = widget.colSpan == "12" ? window.innerHeight/3 : window.innerHeight/4;

        return (
          <div className={clazzName}>
            <Widget widget={widget} widgetHeight={widgetHeight} onClick={this.handleClick.bind(this, i, j, widget.type)}></Widget>
          </div>
        );
      });

      return (
        <div className="row" style={rowStyle}>
          {widgets}
        </div>
      );

    });

    return (
      <div style={dashboardStyle}>
        {rows}
      </div>
    );
  }

});

Dashboard.defaultProps = {
  schema      : {style:{colNum:2}, widgets:[]}
};

module.exports = Dashboard;