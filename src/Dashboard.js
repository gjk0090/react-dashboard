var React = require('react');
var Widget = require('./Widget');
var cloneDeep = require('lodash/fp/cloneDeep');

var Dashboard = React.createClass({

  getInitialState: function() {
    return {widgets: this.props.schema.widgets};
  },

  componentDidMount: function(){
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({widgets: this.props.schema.widgets}); //for cancel edit
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
      tempWidgets[i][j].params = value;
    }

    if(this.props.onEdit){
      this.props.onEdit(tempWidgets); //pass widget out for custom operation
    }else{
      alert('You edited the ' + (i+1) + 'th row, '+ (j+1) + 'th widget, action is ' + action + '.');
    }

    if(doRefresh){
      this.setState({widgets: cloneDeep(tempWidgets)});
    }
  },

  render: function() {

    var dashboardStyle = {};
    var rowStyle = {
      marginTop: this.props.schema.editMode? "15px" : null,
      marginBottom: this.props.schema.editMode? "15px" : null,
      border: this.props.schema.editMode? "1px dashed grey" : null
    };

    var rows = this.state.widgets.map((row, i) => {

      var rowIndicator;
      if (this.props.schema.editMode) {
        rowIndicator = <h4 style={{margin: "20px"}}>row {i+1}</h4>;
      } else {
        rowIndicator = null;
      }

      var widgets = row.map((widget, j) => {
        var clazzName = "col-sm-" + widget.colSpan; //todo: validate colSpan
        var widgetHeight = widget.colSpan == "12" ? window.innerHeight/3 : window.innerHeight/4;

        return (
          <div className={clazzName} key={"row_widget_"+j}>
            <Widget widget={widget} widgetHeight={widgetHeight} editMode={this.props.schema.editMode} onClick={this.handleClick.bind(this, i, j, widget.type)} onEdit={this.handleEdit.bind(this, i, j)}></Widget>
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
