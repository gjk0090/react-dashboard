var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var PieChart = require('../corewidgets/PieChart');

var GithubAuthor = React.createClass({

  statics: {
    getTemplate: function() {
      return {colSpan:"6", type:"GithubAuthor", title:"Github Author", url:"testdata/PieChart.json", params:[{name:"project", type:"string", value:"abcabc", configurable:true}], changeParamName:false};
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

    return (
      <PieChart data={this.props.data.data} options={this.props.data.options} onClick={this.props.onClick}></PieChart>
    );
  }

});

GithubAuthor.defaultProps = {
  data      : {data:[], options:{}},
  onClick   : undefined
};

module.exports = GithubAuthor;
