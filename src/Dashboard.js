var React = require('react');
var Widget = require('./Widget');

var Dashboard = React.createClass({

  getInitialState: function() {
    return {widgets: this.props.schema.widgets};
  },

  componentWillMount: function(){

    if(window.google && window.google.charts){
      google.charts.load('current', {'packages':['corechart','table','gauge']}); //should be put outside
      google.charts.setOnLoadCallback(this.refreshWidgets);
    }else{
      console.warn('Google Chart API not loaded, some widgets will not work.');
    }
  },

  refreshWidgets: function(){
    this.setState({}); //this.setState({}) will trigger a re-render
  },

  handleClick: function(i, j, type, value) {
    if(this.props.onClick){
      this.props.onClick(i, j, type, value);
    }else{
      alert('You clicked the ' + (i+1) + 'th row, '+ (j+1) + 'th widget, type is ' + type + ', the value of selected section is ' + value + '.');
    }
  },

  handleEdit: function(i, j, action){
    //modify this.state.widgets
    if(action == "enlarge"){
      var cols = this.state.widgets[i][j].colSpan /1;
      if(cols < 12){
        this.state.widgets[i][j].colSpan = cols + 1;
      }
    }
    if(action == "shrink"){
      var cols = this.state.widgets[i][j].colSpan /1;
      if(cols > 1){
        this.state.widgets[i][j].colSpan = cols - 1;
      }
    }
    if(action == "up"){
      
    }
    if(action == "down"){

    }
    if(action == "left"){

    }
    if(action == "right"){

    }
    if(action == "remove"){

    }

    if(this.props.onEdit){
      this.props.onEdit(this.state.widgets);
    }else{
      alert('You edited the ' + (i+1) + 'th row, '+ (j+1) + 'th widget, action is ' + action + '.');
    }
    this.refreshWidgets();
  },

  render: function() {

    var dashboardStyle = {};
    var rowStyle = {
      marginTop: this.props.schema.editMode? "5px" : null,
      marginBottom: this.props.schema.editMode? "5px" : null,
      border: this.props.schema.editMode? "1px dashed grey" : null
    };

    var rows = this.state.widgets.map((row, i) => {

      var widgets = row.map((widget, j) => {
        var clazzName = "col-sm-" + widget.colSpan; //todo: validate colSpan
        var widgetHeight = widget.colSpan == "12" ? window.innerHeight/3 : window.innerHeight/4;

        return (
          <div className={clazzName}>
            <Widget widget={widget} widgetHeight={widgetHeight} editMode={this.props.schema.editMode} onClick={this.handleClick.bind(this, i, j, widget.type)} onEdit={this.handleEdit.bind(this, i, j)}></Widget>
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
  schema      : {editMode:false, style:{}, widgets:[]}
};

module.exports = Dashboard;