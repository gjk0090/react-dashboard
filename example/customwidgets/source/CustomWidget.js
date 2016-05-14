var React = require('react');
var GoogleChart = ReactDashboard.GoogleChartComponent;

var CustomWidget = React.createClass({

  statics: {
    getTemplate: function() {
      return {colSpan:"6", type:"CustomWidget", title:"Daily Hours", ajax:"get", params:[{name:"paramA", type:"string", value:"ReactDashboard", displayName:"param A"}]};
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

  onClick: function(selected, data){
    if(selected && (selected.row || selected.row==0)){
      var value = data.getValue(selected.row, 0) + ", " + data.getValue(selected.row, 1);
      this.props.onClick(value);      
    }
  },

  render: function() {

    //prepare valid data

    var gc_data = this.props.data.data;
    var gc_options = this.props.data.options;

    return (
      <GoogleChart data={gc_data} options={gc_options} chartFunction="PieChart" onClick={this.onClick}></GoogleChart>
    );
  }

});

CustomWidget.defaultProps = {
  data      : {data:[], options:{}},
  onClick   : undefined
};

module.exports = CustomWidget;