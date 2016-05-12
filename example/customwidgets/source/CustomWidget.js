var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var PieChart = ReactDashboard.ChartComponentList['PieChart'];

var CustomWidget = React.createClass({

  statics: {
    getTemplate: function() {
      return {colSpan:"6", type:"CustomWidget", title:"Custom Widget", ajax:"get", params:[{name:"paramA", type:"string", value:"ReactDashboard", displayName:"param A"}]};
    },
    prepareUrl: function(params){
      var url = "testdata/PieChart.json";
      //var url = "https://api.github.com/repos/gjk0090/ReactDashboard/commits";
      return url;
    },
    prepareParamsForPost: function(params){

    }
  },

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
  },
  
  componentDidUpdate: function(){
  },

  render: function() {

    //prepare valid data

    var gc_data = this.props.data.data;
    var gc_options = this.props.data.options;

    return (
      <PieChart data={gc_data} options={gc_options} onClick={this.props.onClick}></PieChart>
    );
  }

});

CustomWidget.defaultProps = {
  data      : {data:[], options:{}},
  onClick   : undefined
};

module.exports = CustomWidget;