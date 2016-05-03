var React = require('react');
//var Modal = require('react-bootstrap/lib/Modal');
var WidgetList = require('./widgets');

var Widget = React.createClass({

  getInitialState: function() {
    return {data: this.props.widget.data};
  },

  componentWillMount: function(){
  },

  componentDidMount: function(){
    this.refreshWidget();
  },

  //this function triggers before render except first time
  //this functoin can set state safely
  componentWillReceiveProps: function(nextProps) {
    this.refreshWidget();
  },

  shouldComponentUpdate: function(){
    return true;
  },
  
  componentWillUpdate: function(){
  },
  
  componentDidUpdate: function(){
  },
  
  componentWillUnmount: function(){
  },

  getRemoteData: function(url){
    if(url == null || url == ""){return null;}

    var returnData;
    $.ajaxSetup({async: false});
    $.getJSON(url, function(json) {
      returnData = json; //cannot directly return, why?
    });
    return returnData;
  },

  refreshWidget: function() {
    var data = this.getRemoteData(this.props.widget.url);
    if(data != null){
      this.setState({data: data});
    }
  },

  openConfigModal: function(){
    this.setState({ showModal: true });
  },

  closeConfigModal: function() {
    this.setState({ showModal: false });
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
          <a title="move widget up" style={aTagStyle} onClick={this.props.onEdit.bind(this, "up")}> <i className="glyphicon glyphicon-arrow-up"></i> </a>
          <a title="move widget down" style={aTagStyle} onClick={this.props.onEdit.bind(this, "down")}> <i className="glyphicon glyphicon-arrow-down"></i> </a>
          <a title="move widget left" style={aTagStyle} onClick={this.props.onEdit.bind(this, "left")}> <i className="glyphicon glyphicon-arrow-left"></i> </a>
          <a title="move widget right" style={aTagStyle} onClick={this.props.onEdit.bind(this, "right")}> <i className="glyphicon glyphicon-arrow-right"></i> </a>
          <a title="increase widget width" style={aTagStyle} onClick={this.props.onEdit.bind(this, "enlarge")}> <i className="glyphicon glyphicon-resize-full"></i> </a>
          <a title="decrease widget width" style={aTagStyle} onClick={this.props.onEdit.bind(this, "shrink")}> <i className="glyphicon glyphicon-resize-small"></i> </a>
          <a title="remove widget" style={aTagStyle} onClick={this.props.onEdit.bind(this, "remove")}> <i className="glyphicon glyphicon-remove"></i> </a>
        </span>
      );
    }else{
      headingButtons = (
        <span className="pull-right">
          <a title="reload widget content" style={aTagStyle} onClick={this.openConfigModal}> <i className="glyphicon glyphicon-cog"></i> </a>
          <a title="reload widget content" style={aTagStyle} onClick={this.refreshWidget}> <i className="glyphicon glyphicon-refresh"></i> </a>
        </span>
      );
    }

    var DetailWidget = WidgetList[this.props.widget.type];
    if (!DetailWidget) {throw new Error('ReactDashboard: Widget Type "' + this.props.widget.type + '" not defined as ReactDashboard Widget Type');}

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
                <DetailWidget data={this.state.data} onClick={this.props.onClick}></DetailWidget>
              </div>
            </div>
          </div>

          {/*
          <Modal show={this.state.showModal} onHide={this.closeConfigModal}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Text in a modal</h4>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
              <hr />

              <h4>Overflowing text to show scroll behavior</h4>
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={this.closeConfigModal}>Close</button>
            </Modal.Footer>
          </Modal>
          */}

      </div>
    );
  }

});

Widget.defaultProps = {
  widget      : {colSpan:"", type:"", title:"", url:"", data:""},
  onClick     : undefined
};

module.exports = Widget;