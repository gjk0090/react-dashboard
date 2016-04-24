var React = require('react');
var ReactDOM = require('react-dom');

// var Hello = React.createClass({
//   render: function() {
//     return (
//       React.createElement('div', null,
//         'Hello ' + this.props.name
//       )
//     );
//   }
// });

var Hello = React.createClass({

  getInitialState: function() {
    return {message: this.props.message};
  },

  onChange: function(e) {
    this.setState({message: e.target.value}, this.props.onChange.bind(null, e.target.value));
  },

  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.message !== 'undefined'){
      this.setState({message : nextProps.message});
    }
  },
  
  render: function() {
    return (
      <div>
      	<p>ReactJS</p>
      	<input value={this.state.message} onChange={this.onChange}></input>
      </div>
    );
  }

});

module.exports = Hello;