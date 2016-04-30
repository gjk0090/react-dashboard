var React = require('react');
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
    if(url == null && url == ""){return null;}

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
  
  render: function() {

    var widgetStyle = {};

    var aTagStyle = {
      cursor : "pointer"
    };

    var panelBodyStyle = {
        position: "relative",
        paddingBottom: this.props.widget.colSpan=="12" ? "40%" : "70%" //temp splution
    };

    var DetailWidget = WidgetList[this.props.widget.type];
    if (!DetailWidget) {throw new Error('ReactDashboard: Widget Type "' + this.props.widget.type + '" not defined as ReactDashboard Widget Type');}

    //bootstrap classes : default/primary/success/info/warning/danger
    return (
      <div style={widgetStyle}>
          <div className="panel panel-default">
            <div className="panel-heading">
              {this.props.widget.title}
              <span className="pull-right"><a title="reload widget content" style={aTagStyle} onClick={this.refreshWidget}> <i className="glyphicon glyphicon-refresh"></i> </a></span>
            </div>
            <div className="panel-body">
              <div style={panelBodyStyle}>
                <DetailWidget data={this.state.data} onClick={this.props.onClick}></DetailWidget>
              </div>
            </div>
          </div>
      </div>
    );
  }

});

Widget.defaultProps = {
  widget      : {colSpan:"", type:"", title:"", url:"", data:""},
  onClick     : undefined
};

module.exports = Widget;