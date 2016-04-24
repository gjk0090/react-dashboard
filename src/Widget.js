var React = require('react');

//todo: how to require all in folder?
var PieChart = require('./widgets/PieChart');
var ColumnChart = require('./widgets/ColumnChart');
var TableView = require('./widgets/TableView');


var Widget = React.createClass({

  getInitialState: function() {
    var data = this.getRemoteData(this.props.widget.url);
    if(data == null){
      data = this.props.widget.data;
    }
    return {data: data};
  },

  getRemoteData: function(url){
    if(url == null && url == ""){return null;}

    var returnData;
    $.ajaxSetup({async: false});
    $.getJSON(url, function(json) {
      //todo: verify json
      returnData = json.data; //cannot directly return, why?
    });
    return returnData;
  },

  refreshWidget: function() {
    var data = this.getRemoteData(this.props.widget.url);
    if(data == null){
      data = this.props.widget.data;
    }
    this.setState({data: data}); //this.setState({}) will trigger a re-render
  },
  
  render: function() {

    var widgetStyle = {};

    var content;

    //todo: rewrite this with factory pattern
    if(this.props.widget.type == 'PieChart'){
      content = (
        <PieChart data={this.state.data}></PieChart>
      );
    }else if(this.props.widget.type == 'ColumnChart'){
      content = (
        <ColumnChart data={this.state.data}></ColumnChart>
      );
    }else if(this.props.widget.type == 'TableView'){
      content = (
        <TableView data={this.state.data}></TableView>
      );
    }else{
      content = (
        <div>this.state.data</div>
      );
    }

    //bootstrap classes : default/primary/success/info/warning/danger
    return (
      <div style={widgetStyle}>
          <div className="panel panel-default">
            <div className="panel-heading">
              {this.props.widget.title}
              <span className="pull-right"><a title="reload widget content" onClick={this.refreshWidget}> <i className="glyphicon glyphicon-refresh"></i> </a></span>
            </div>
            <div className="panel-body">
              {content}
            </div>
          </div>
      </div>
    );
  }

});

Widget.defaultProps = {
  widget      : {colSpan:"", type:"", title:"", url:"", data:""}
};

module.exports = Widget;