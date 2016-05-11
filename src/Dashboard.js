var React = require('react');
var Widget = require('./Widget');
var cloneDeep = require('lodash/fp/cloneDeep');
var isEmpty = require('lodash/fp/isEmpty');
var isFunction = require('lodash/fp/isFunction');
var WidgetList = require('./WidgetManager').WrapperWidgetList;

var Dashboard = React.createClass({

  getInitialState: function() {
    return {widgets: this.props.schema.widgets, editMode: false};
  },

  componentDidMount: function(){
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({widgets: this.props.schema.widgets}); //for cancel edit
  },

  refreshWidgets: function(){
    this.setState({}); //this.setState({}) will trigger a re-render
  },

  toggleEditMode: function(action){
    if(action == 'edit'){
      this.oldWidgets = cloneDeep(this.state.widgets);
      this.setState({editMode: true});
    }else if(action == 'save'){
      if(this.props.onEdit){
        this.props.onEdit(cloneDeep(this.state.widgets)); //pass widget out for custom operation
      }
      this.setState({editMode: false});
    }else if(action == 'cancel'){
      this.setState({widgets:cloneDeep(this.oldWidgets), editMode: false});
    }
  },

  addWidget: function(type){
    var widget = WidgetList[type];
    if(!isEmpty(widget)){
      this.state.widgets.push([widget.getTemplate()]);
    }else{
      alert("Sorry, failed to find the widget \"" + type + "\".");
    }
    this.refreshWidgets();
  },

  handleClick: function(i, j, type, value) {
    if(this.props.onClick){
      this.props.onClick(i, j, type, value);
    }else{
      alert('You clicked the ' + (i+1) + 'th row, '+ (j+1) + 'th widget, type is ' + type + ', the value of selected section is ' + value + '.');
    }
  },

  handleEdit: function(i, j, action, doRefresh, value){

    var tempWidgets = cloneDeep(this.state.widgets);

    if(action == "enlarge"){
      var cols = tempWidgets[i][j].colSpan /1;
      if(cols < 12){
        tempWidgets[i][j].colSpan = cols + 1;
      }
    }
    else if(action == "shrink"){
      var cols = tempWidgets[i][j].colSpan /1;
      if(cols > 1){
        tempWidgets[i][j].colSpan = cols - 1;
      }
    }
    else if(action == "up"){
      var widget = tempWidgets[i][j];
      //remove i,j
      tempWidgets[i].splice(j, 1);
      if(i > 0){
        //push to i-1
        tempWidgets[i-1].push(widget);
      }else{
        //push to head
        tempWidgets.unshift([widget]);
      }
      //if i empty, remove i
      if(tempWidgets[i].length == 0){
        tempWidgets.splice(i, 1);
      }
    }
    else if(action == "down"){
      var widget = tempWidgets[i][j];
      //remove i,j
      tempWidgets[i].splice(j, 1);
      if(i < tempWidgets.length - 1){
        //push to i+1
        tempWidgets[i+1].unshift(widget);
      }else{
        //push to head
        tempWidgets.push([widget]);
      }
      //if i empty, remove i
      if(tempWidgets[i].length == 0){
        tempWidgets.splice(i, 1);
      }
    }
    else if(action == "left"){
      if(j > 0){
        var widget = tempWidgets[i][j];
        //remove i,j
        tempWidgets[i].splice(j, 1);
        //push to j-1
        tempWidgets[i].splice(j-1, 0, widget);
      }
    }
    else if(action == "right"){
      if(j < tempWidgets[i].length-1){
        var widget = tempWidgets[i][j];
        //remove i,j
        tempWidgets[i].splice(j, 1);
        //push to j+1
        tempWidgets[i].splice(j+1, 0, widget);
      }
    }
    else if(action == "remove"){
      //remove i,j
      tempWidgets[i].splice(j, 1);
      //if i empty, remove i
      if(tempWidgets[i].length == 0){
        tempWidgets.splice(i, 1);
      }
    }
    else if(action == "update_params"){
      tempWidgets[i][j].title = value.title;
      tempWidgets[i][j].params = value.params;
      //have to save the change here
      if(this.props.onEdit){
        this.props.onEdit(cloneDeep(tempWidgets));
      }
    }

    //alert('You edited the ' + (i+1) + 'th row, '+ (j+1) + 'th widget, action is ' + action + '.');

    if(doRefresh){
      this.setState({widgets: cloneDeep(tempWidgets)});
    }
  },

  render: function() {

    var aTagStyle = {
      cursor : "pointer",
      margin:"2px"
    };
    var dashboardStyle = {};
    var rowStyle = {
      marginTop: this.state.editMode? "15px" : null,
      marginBottom: this.state.editMode? "15px" : null,
      border: this.state.editMode? "1px dashed grey" : null
    };

    var rows = this.state.widgets.map((row, i) => {

      var rowIndicator;
      if (this.state.editMode) {
        rowIndicator = <h4 style={{margin: "20px"}}>row {i+1}</h4>;
      } else {
        rowIndicator = null;
      }

      var widgets = row.map((widget, j) => {
        var clazzName = "col-sm-" + widget.colSpan; //todo: validate colSpan
        var widgetHeight = widget.colSpan == "12" ? window.innerHeight/3 : window.innerHeight/4;

        return (
          <div className={clazzName} key={"row_widget_"+j}>
            <Widget widget={widget} widgetHeight={widgetHeight} editMode={this.state.editMode} onClick={this.handleClick.bind(this, i, j, widget.type)} onEdit={this.handleEdit.bind(this, i, j)}></Widget>
          </div>
        );
      });

      return (
        <div className="row" key={"dashboard_row_"+i} style={rowStyle}>
          {rowIndicator}
          {widgets}
        </div>
      );

    });

    var addWidgetDropDownMenuOptions = [];
    for (var key in WidgetList){
      addWidgetDropDownMenuOptions.push(<li key={"addWidgetDropDownMenuOptions_"+key}><a onClick={this.addWidget.bind(this, key)}>{key}</a></li>);
    }

    return (
      <div>
        <h3>
          {this.props.schema.title}
          {(() => {
            if(!this.state.editMode){
              return (
                <span className="pull-right">
                  <a title="config layout" onClick={this.toggleEditMode.bind(this,'edit')} style={aTagStyle}> <i className="glyphicon glyphicon-cog"></i> </a>
                  <a title="reload dashboard" onClick={this.refreshWidgets} style={aTagStyle}> <i className="glyphicon glyphicon-refresh"></i> </a>
                </span>
              );
            }else{
              return (
                <span className="pull-right">
                  <span className="dropdown">
                    <a style={aTagStyle} data-toggle="dropdown">
                      <i className="glyphicon glyphicon-plus"></i>
                      <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                      {addWidgetDropDownMenuOptions}
                      {/*<li role="separator" className="divider"></li>*/}
                    </ul>
                  </span>

                  <a title="cancel config" onClick={this.toggleEditMode.bind(this,'cancel')} style={aTagStyle}> <i className="glyphicon glyphicon-floppy-remove"></i> </a>
                  <a title="save config" onClick={this.toggleEditMode.bind(this,'save')} style={aTagStyle}> <i className="glyphicon glyphicon-floppy-disk"></i> </a>
                </span>
              );
            }
          })()}
        </h3>

        <hr/>

        <div style={dashboardStyle}>
          {rows}
        </div>
      </div>
    );
  }

});

Dashboard.defaultProps = {
  schema      : {title:"ReactJS Dashboard", style:{}, widgets:[]},
};

Dashboard.addWidget = require('./WidgetManager').addWidget;
Dashboard.addWidgets = require('./WidgetManager').addWidgets;
Dashboard.CoreWidgetList = require('./WidgetManager').CoreWidgetList;
Dashboard.GoogleChartLoader = require('./GoogleChartLoader');

module.exports = Dashboard;
