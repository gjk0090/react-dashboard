var CustomWidget =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var GoogleChart = ReactDashboard.GoogleChartComponent;

	var CustomWidget = React.createClass({
	  displayName: "CustomWidget",


	  statics: {
	    getTemplate: function getTemplate() {
	      return { colSpan: "6", type: "CustomWidget", title: "Daily Hours", ajax: "get", params: [{ name: "paramA", type: "string", value: "ReactDashboard", displayName: "param A" }] };
	    },
	    prepareUrl: function prepareUrl(params) {
	      var url = "testdata/PieChart.json";
	      //var url = "https://api.github.com/repos/gjk0090/ReactDashboard/commits";
	      return url;
	    },
	    prepareParamsForPost: function prepareParamsForPost(params) {}
	  },

	  getInitialState: function getInitialState() {
	    return {};
	  },

	  componentDidMount: function componentDidMount() {},

	  componentDidUpdate: function componentDidUpdate() {},

	  onClick: function onClick(selected, data) {
	    if (selected && (selected.row || selected.row == 0)) {
	      var value = data.getValue(selected.row, 0) + ", " + data.getValue(selected.row, 1);
	      this.props.onClick(value);
	    }
	  },

	  render: function render() {

	    //prepare valid data

	    var gc_data = this.props.data.data;
	    var gc_options = this.props.data.options;

	    return React.createElement(GoogleChart, { data: gc_data, options: gc_options, chartFunction: "PieChart", onClick: this.onClick });
	  }

	});

	CustomWidget.defaultProps = {
	  data: { data: [], options: {} },
	  onClick: undefined
	};

	module.exports = CustomWidget;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ }
/******/ ]);