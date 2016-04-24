var React = require('react');

//todo: how to require all in folder?
var PieChart = require('./widgets/PieChart');
var ColumnChart = require('./widgets/ColumnChart');
var TableView = require('./widgets/TableView');


var Widget = React.createClass({
  
  render: function() {

    var widgetStyle = {};

    var content;

    //todo: rewrite this with factory pattern
    if(this.props.widget.type == 'PieChart'){
      content = (
        <PieChart data={this.props.widget.data}></PieChart>
      );
    }else if(this.props.widget.type == 'ColumnChart'){
      content = (
        <ColumnChart data={this.props.widget.data}></ColumnChart>
      );
    }else if(this.props.widget.type == 'TableView'){
      content = (
        <TableView data={this.props.widget.data}></TableView>
      );
    }else{
      content = (
        <div>this.props.widget.data</div>
      );
    }

    //bootstrap classes : default/primary/success/info/warning/danger
    //todo: make refresh work
    return (
      <div style={widgetStyle}>
          <div className="panel panel-default">
            <div className="panel-heading">
              {this.props.widget.title}
              <span className="pull-right"><a title="reload widget content"> <i className="glyphicon glyphicon-refresh"></i> </a></span>
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
  widget      : {type:"", title:"", data:""}
};

module.exports = Widget;