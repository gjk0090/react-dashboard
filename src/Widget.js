var React = require('react');
var cloneDeep = require('lodash/fp/cloneDeep');
var isEmpty = require('lodash/fp/isEmpty');
var isEqual = require('lodash/fp/isEqual');
var Modal = require('react-bootstrap').Modal;
var WidgetList = require('./widgets/WidgetManager').WidgetList;


var Widget = React.createClass({

  DetailWidget: undefined,
  tempTitle: "",
  tempParams: [],

  getInitialState: function() {
    this.DetailWidget = WidgetList[this.props.widget.type];
    if (!this.DetailWidget) {
      throw new Error('ReactDashboard: Widget Type "' + this.props.widget.type + '" not defined as ReactDashboard Widget Type');
    }

    this.tempTitle = this.props.widget.title;
    this.tempParams = cloneDeep(this.props.widget.params);
    return {data: this.props.widget.data, showModal: false};
  },

  componentWillMount: function(){
  },

  componentDidMount: function(){
    this.refreshWidget(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    //do not refresh data if no change
    if(nextProps.widget.type == this.props.widget.type && isEqual(nextProps.widget.params, this.props.widget.params)){
      this.setState({showModal: false});
      return;
    }

    this.DetailWidget = WidgetList[nextProps.widget.type];

    //set data to solve the problem that when moving widgets left/right, other widget's data is used to render before firing ajax call
    this.setState({ data: nextProps.widget.data, showModal: false });

    this.refreshWidget(nextProps); //ajax becomes sync in componentWillReceiveProps, why?
  },

  shouldComponentUpdate: function(nextProps, nextState){
    return true;
  },
  
  componentWillUpdate: function(){
  },
  
  componentDidUpdate: function(){
  },
  
  componentWillUnmount: function(){
  },

  refreshWidget: function(props) {
    //alert("ajax");

    if(props.widget.ajax == "get"){

      var url = this.DetailWidget.prepareUrl(props.widget.params);
      $.get(url, function(result) {
        this.setState({data: result});
      }.bind(this), "json" );

    }else if(props.widget.ajax == "post"){

      var url = this.DetailWidget.prepareUrl(props.widget.params);;
      var params = this.DetailWidget.prepareParamsForPost(props.widget.params);
      $.post(url, params, function(result) {
        this.setState({data: result});
      }.bind(this), "json" );

    }else{
      //framework do nothing, get data in your widget
    }
  },

  openConfigModal: function(){
    this.tempTitle = this.props.widget.title;
    this.tempParams = cloneDeep(this.props.widget.params);
    this.setState({ showModal: true });
  },

  closeConfigModal: function(action) {
    if(action == "save"){
      this.props.onEdit("update_params", true, {title: this.tempTitle, params: this.tempParams});
    }else{
      this.setState({ showModal: false});
    }

  },

  configParamsChanged: function(i,event){
    if(i == -1){
      this.tempTitle = event.target.value;
    }else{
      this.tempParams[i].value = event.target.value;
    }
    //alert(i+event.target.value);
  },

  render: function() {

    var widgetStyle = {};

    var aTagStyle = {
      cursor : "pointer"
    };

    var panelBodyStyle = {
      position: "relative",
      //paddingBottom: this.props.widget.colSpan=="12" ? "40%" : "70%", //auto height from http://jsfiddle.net/toddlevy/c59HH/
      height: this.props.widgetHeight
    };

    var headingButtons = null;
    if(this.props.editMode){
      headingButtons = (
        <span className="pull-right">
          <a title="move widget up" style={aTagStyle} onClick={this.props.onEdit.bind(this, "up", true)}> <i className="glyphicon glyphicon-arrow-up"></i> </a>
          <a title="move widget down" style={aTagStyle} onClick={this.props.onEdit.bind(this, "down", true)}> <i className="glyphicon glyphicon-arrow-down"></i> </a>
          <a title="move widget left" style={aTagStyle} onClick={this.props.onEdit.bind(this, "left", true)}> <i className="glyphicon glyphicon-arrow-left"></i> </a>
          <a title="move widget right" style={aTagStyle} onClick={this.props.onEdit.bind(this, "right", true)}> <i className="glyphicon glyphicon-arrow-right"></i> </a>
          <a title="increase widget width" style={aTagStyle} onClick={this.props.onEdit.bind(this, "enlarge", true)}> <i className="glyphicon glyphicon-resize-full"></i> </a>
          <a title="decrease widget width" style={aTagStyle} onClick={this.props.onEdit.bind(this, "shrink", true)}> <i className="glyphicon glyphicon-resize-small"></i> </a>
          <a title="remove widget" style={aTagStyle} onClick={this.props.onEdit.bind(this, "remove", true)}> <i className="glyphicon glyphicon-remove"></i> </a>
        </span>
      );
    }else{
      headingButtons = (
        <span className="pull-right">
          <a title="edit widget params" style={aTagStyle} onClick={this.openConfigModal}> <i className="glyphicon glyphicon-cog"></i> </a>
          <a title="reload widget content" style={aTagStyle} onClick={this.refreshWidget.bind(this, this.props)}> <i className="glyphicon glyphicon-refresh"></i> </a>
        </span>
      );
    }

    var configParamsList;
    if(!!this.props.widget.params){
      configParamsList = this.props.widget.params.map((param, i) => {
        return(
          <div className="row" key={"config_param_"+i}>
            <p className="col-xs-6">{param.displayName}</p>
            <input className="col-xs-6" defaultValue={param.value} onChange={this.configParamsChanged.bind(this, i)}></input>
          </div>
        );
      });
    }

    //bootstrap classes : default/primary/success/info/warning/danger
    return (
      <div style={widgetStyle}>
          <div className="panel panel-default">
            <div className="panel-heading">
              {this.props.widget.title}
              {headingButtons}
            </div>
            <div className="panel-body">
              <div style={panelBodyStyle}>
                <this.DetailWidget data={this.state.data} widget={this.props.widget} onClick={this.props.onClick}></this.DetailWidget>
              </div>
            </div>
          </div>
          
          <Modal show={this.state.showModal} onHide={this.closeConfigModal}>
            <Modal.Header closeButton>
              <Modal.Title>Config</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{padding:"10px 20px"}}>
                <div className="row">
                  <p className="col-xs-6">Widget Title</p>
                  <input className="col-xs-6" defaultValue={this.props.widget.title} onChange={this.configParamsChanged.bind(this, -1)}></input>
                </div>
                {configParamsList}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-default" onClick={this.closeConfigModal}>Close</button>
              <button className="btn btn-primary" onClick={this.closeConfigModal.bind(this, "save")}>Save</button>
            </Modal.Footer>
          </Modal>

      </div>
    );
  }

});

Widget.defaultProps = {
  widget      : {colSpan:"6", type:"", title:"", ajax:"none", params:[], data:""},
  widgetHeight: window.innerHeight/4,
  editMode    : false,
  onClick     : undefined,
  onEdit      : undefined
};

module.exports = Widget;
