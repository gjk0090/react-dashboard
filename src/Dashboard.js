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

  componentWillReceiveProps: function(nextProps) {
    this.setState({widgets: this.props.schema.widgets});
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
    else if(action == "shrink"){
      var cols = this.state.widgets[i][j].colSpan /1;
      if(cols > 1){
        this.state.widgets[i][j].colSpan = cols - 1;
      }
    }
    else if(action == "up"){
      var widget = this.state.widgets[i][j];
      //remove i,j
      this.state.widgets[i].splice(j, 1);
      if(i > 0){
        //push to i-1
        this.state.widgets[i-1].push(widget);
      }else{
        //push to head
        this.state.widgets.unshift([widget]);
      }
      //if i empty, remove i
      if(this.state.widgets[i].length == 0){
        this.state.widgets.splice(i, 1);
      }
    }
    else if(action == "down"){
      var widget = this.state.widgets[i][j];
      //remove i,j
      this.state.widgets[i].splice(j, 1);
      if(i < this.state.widgets.length - 1){
        //push to i+1
        this.state.widgets[i+1].unshift(widget);
      }else{
        //push to head
        this.state.widgets.push([widget]);
      }
      //if i empty, remove i
      if(this.state.widgets[i].length == 0){
        this.state.widgets.splice(i, 1);
      }
    }
    else if(action == "left"){
      if(j > 0){
        var widget = this.state.widgets[i][j];
        //remove i,j
        this.state.widgets[i].splice(j, 1);
        //push to j-1
        this.state.widgets[i].splice(j-1, 0, widget);
      }
    }
    else if(action == "right"){
      if(j < this.state.widgets[i].length-1){
        var widget = this.state.widgets[i][j];
        //remove i,j
        this.state.widgets[i].splice(j, 1);
        //push to j+1
        this.state.widgets[i].splice(j+1, 0, widget);
      }
    }
    else if(action == "remove"){
      //remove i,j
      this.state.widgets[i].splice(j, 1);
      //if i empty, remove i
      if(this.state.widgets[i].length == 0){
        this.state.widgets.splice(i, 1);
      }
    }

    if(this.props.onEdit){
      this.props.onEdit(this.state.widgets); //pass widget out for custom operation
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

      var rowIndicator;
      if (this.props.schema.editMode) {
        rowIndicator = <p style={{margin: "5px"}}>row {i+1}</p>;
      } else {
        rowIndicator = null;
      }

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
          {rowIndicator}
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