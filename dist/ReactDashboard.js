var ReactDashboard =
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

	'use strict';

	var React = __webpack_require__(1);
	var Widget = __webpack_require__(2);
	var cloneDeep = __webpack_require__(3);

	var Dashboard = React.createClass({
	  displayName: 'Dashboard',


	  getInitialState: function getInitialState() {
	    return { widgets: this.props.schema.widgets, editMode: false };
	  },

	  componentDidMount: function componentDidMount() {},

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({ widgets: this.props.schema.widgets }); //for cancel edit
	  },

	  refreshWidgets: function refreshWidgets() {
	    this.setState({}); //this.setState({}) will trigger a re-render
	  },

	  toggleEditMode: function toggleEditMode(action) {
	    if (action == 'edit') {
	      this.oldWidgets = cloneDeep(this.state.widgets);
	      this.setState({ editMode: true });
	    } else if (action == 'save') {
	      if (this.props.onEdit) {
	        this.props.onEdit(cloneDeep(this.state.widgets)); //pass widget out for custom operation
	      }
	      this.setState({ editMode: false });
	    } else if (action == 'cancel') {
	      this.setState({ widgets: cloneDeep(this.oldWidgets), editMode: false });
	    }
	  },

	  addWidget: function addWidget() {
	    this.state.widgets.push([{ colSpan: "6", type: "PieChart", title: "Pie Chart", url: "testdata/PieChart.json", params: [{ name: "paramA", type: "string", value: "abc", configurable: true }], data: "testData" }]);
	    this.refreshWidgets();
	  },

	  handleClick: function handleClick(i, j, type, value) {
	    if (this.props.onClick) {
	      this.props.onClick(i, j, type, value);
	    } else {
	      alert('You clicked the ' + (i + 1) + 'th row, ' + (j + 1) + 'th widget, type is ' + type + ', the value of selected section is ' + value + '.');
	    }
	  },

	  handleEdit: function handleEdit(i, j, action, doRefresh, value) {

	    var tempWidgets = cloneDeep(this.state.widgets);

	    if (action == "enlarge") {
	      var cols = tempWidgets[i][j].colSpan / 1;
	      if (cols < 12) {
	        tempWidgets[i][j].colSpan = cols + 1;
	      }
	    } else if (action == "shrink") {
	      var cols = tempWidgets[i][j].colSpan / 1;
	      if (cols > 1) {
	        tempWidgets[i][j].colSpan = cols - 1;
	      }
	    } else if (action == "up") {
	      var widget = tempWidgets[i][j];
	      //remove i,j
	      tempWidgets[i].splice(j, 1);
	      if (i > 0) {
	        //push to i-1
	        tempWidgets[i - 1].push(widget);
	      } else {
	        //push to head
	        tempWidgets.unshift([widget]);
	      }
	      //if i empty, remove i
	      if (tempWidgets[i].length == 0) {
	        tempWidgets.splice(i, 1);
	      }
	    } else if (action == "down") {
	      var widget = tempWidgets[i][j];
	      //remove i,j
	      tempWidgets[i].splice(j, 1);
	      if (i < tempWidgets.length - 1) {
	        //push to i+1
	        tempWidgets[i + 1].unshift(widget);
	      } else {
	        //push to head
	        tempWidgets.push([widget]);
	      }
	      //if i empty, remove i
	      if (tempWidgets[i].length == 0) {
	        tempWidgets.splice(i, 1);
	      }
	    } else if (action == "left") {
	      if (j > 0) {
	        var widget = tempWidgets[i][j];
	        //remove i,j
	        tempWidgets[i].splice(j, 1);
	        //push to j-1
	        tempWidgets[i].splice(j - 1, 0, widget);
	      }
	    } else if (action == "right") {
	      if (j < tempWidgets[i].length - 1) {
	        var widget = tempWidgets[i][j];
	        //remove i,j
	        tempWidgets[i].splice(j, 1);
	        //push to j+1
	        tempWidgets[i].splice(j + 1, 0, widget);
	      }
	    } else if (action == "remove") {
	      //remove i,j
	      tempWidgets[i].splice(j, 1);
	      //if i empty, remove i
	      if (tempWidgets[i].length == 0) {
	        tempWidgets.splice(i, 1);
	      }
	    } else if (action == "update_params") {
	      tempWidgets[i][j].params = value;
	    }

	    //alert('You edited the ' + (i+1) + 'th row, '+ (j+1) + 'th widget, action is ' + action + '.');

	    if (doRefresh) {
	      this.setState({ widgets: cloneDeep(tempWidgets) });
	    }
	  },

	  render: function render() {
	    var _this = this;

	    var aTagStyle = {
	      cursor: "pointer",
	      margin: "2px"
	    };
	    var dashboardStyle = {};
	    var rowStyle = {
	      marginTop: this.state.editMode ? "15px" : null,
	      marginBottom: this.state.editMode ? "15px" : null,
	      border: this.state.editMode ? "1px dashed grey" : null
	    };

	    var rows = this.state.widgets.map(function (row, i) {

	      var rowIndicator;
	      if (_this.state.editMode) {
	        rowIndicator = React.createElement(
	          'h4',
	          { style: { margin: "20px" } },
	          'row ',
	          i + 1
	        );
	      } else {
	        rowIndicator = null;
	      }

	      var widgets = row.map(function (widget, j) {
	        var clazzName = "col-sm-" + widget.colSpan; //todo: validate colSpan
	        var widgetHeight = widget.colSpan == "12" ? window.innerHeight / 3 : window.innerHeight / 4;

	        return React.createElement(
	          'div',
	          { className: clazzName, key: "row_widget_" + j },
	          React.createElement(Widget, { widget: widget, widgetHeight: widgetHeight, editMode: _this.state.editMode, onClick: _this.handleClick.bind(_this, i, j, widget.type), onEdit: _this.handleEdit.bind(_this, i, j) })
	        );
	      });

	      return React.createElement(
	        'div',
	        { className: 'row', key: "dashboard_row_" + i, style: rowStyle },
	        rowIndicator,
	        widgets
	      );
	    });

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        this.props.schema.title,
	        function () {
	          if (!_this.state.editMode) {
	            return React.createElement(
	              'span',
	              { className: 'pull-right' },
	              React.createElement(
	                'a',
	                { title: 'config layout', onClick: _this.toggleEditMode.bind(_this, 'edit'), style: aTagStyle },
	                ' ',
	                React.createElement('i', { className: 'glyphicon glyphicon-cog' }),
	                ' '
	              ),
	              React.createElement(
	                'a',
	                { title: 'reload dashboard', onClick: _this.refreshWidgets, style: aTagStyle },
	                ' ',
	                React.createElement('i', { className: 'glyphicon glyphicon-refresh' }),
	                ' '
	              )
	            );
	          } else {
	            return React.createElement(
	              'span',
	              { className: 'pull-right' },
	              React.createElement(
	                'a',
	                { title: 'add widget', onClick: _this.addWidget, style: aTagStyle },
	                ' ',
	                React.createElement('i', { className: 'glyphicon glyphicon-plus' }),
	                ' '
	              ),
	              React.createElement(
	                'a',
	                { title: 'cancel config', onClick: _this.toggleEditMode.bind(_this, 'cancel'), style: aTagStyle },
	                ' ',
	                React.createElement('i', { className: 'glyphicon glyphicon-floppy-remove' }),
	                ' '
	              ),
	              React.createElement(
	                'a',
	                { title: 'save config', onClick: _this.toggleEditMode.bind(_this, 'save'), style: aTagStyle },
	                ' ',
	                React.createElement('i', { className: 'glyphicon glyphicon-floppy-disk' }),
	                ' '
	              )
	            );
	          }
	        }()
	      ),
	      React.createElement('hr', null),
	      React.createElement(
	        'div',
	        { style: dashboardStyle },
	        rows
	      )
	    );
	  }

	});

	Dashboard.defaultProps = {
	  schema: { title: "ReactJS Dashboard", style: {}, widgets: [] }
	};

	Dashboard.addWidget = __webpack_require__(177).addWidget;
	Dashboard.addWidgets = __webpack_require__(177).addWidgets;

	module.exports = Dashboard;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var cloneDeep = __webpack_require__(3);
	var isEmpty = __webpack_require__(189);
	var Modal = __webpack_require__(176).Modal;
	var WidgetList = __webpack_require__(177);

	var Widget = React.createClass({
	  displayName: 'Widget',


	  tempParams: [],

	  getInitialState: function getInitialState() {
	    this.tempParams = cloneDeep(this.props.widget.params);
	    var configurable = this.getConfigurable(this.props.widget.params);
	    return { data: this.props.widget.data, params: this.props.widget.params, configurable: configurable };
	  },

	  componentWillMount: function componentWillMount() {},

	  componentDidMount: function componentDidMount() {
	    this.refreshWidget(this.props);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.refreshWidget(nextProps);
	  },

	  shouldComponentUpdate: function shouldComponentUpdate() {
	    return true;
	  },

	  componentWillUpdate: function componentWillUpdate() {},

	  componentDidUpdate: function componentDidUpdate() {},

	  componentWillUnmount: function componentWillUnmount() {},

	  getRemoteData: function getRemoteData(url, params) {
	    if (isEmpty(url)) {
	      return null;
	    }

	    $.post(url, params, function (result) {
	      this.setState({ data: result });
	    }.bind(this), "json");
	  },

	  refreshWidget: function refreshWidget(props) {
	    var params = {};
	    for (var i = 0; i < this.state.params.length; i++) {
	      params[this.state.params[i].name] = this.state.params[i].value;
	    }

	    this.getRemoteData(props.widget.url, params);
	  },

	  getConfigurable: function getConfigurable(params) {
	    for (var i = 0; i < params.length; i++) {
	      if (params[i].configurable) {
	        return true;
	      }
	    }
	    return false;
	  },

	  openConfigModal: function openConfigModal() {
	    this.setState({ showModal: true });
	  },

	  closeConfigModal: function closeConfigModal(action) {
	    if (action == "save") {
	      this.setState({ params: cloneDeep(this.tempParams) });
	      this.props.onEdit("update_params", false, this.tempParams);
	    } else {
	      this.tempParams = cloneDeep(this.state.params);
	    }
	    this.setState({ showModal: false });
	  },

	  configParamsChanged: function configParamsChanged(i, event) {
	    this.tempParams[i].value = event.target.value;
	    //alert(i+event.target.value);
	  },

	  render: function render() {
	    var _this = this;

	    var widgetStyle = {};

	    var aTagStyle = {
	      cursor: "pointer"
	    };

	    var panelBodyStyle = {
	      position: "relative",
	      //paddingBottom: this.props.widget.colSpan=="12" ? "40%" : "70%", //auto height from http://jsfiddle.net/toddlevy/c59HH/
	      height: this.props.widgetHeight
	    };

	    var headingButtons = null;
	    if (this.props.editMode) {
	      headingButtons = React.createElement(
	        'span',
	        { className: 'pull-right' },
	        React.createElement(
	          'a',
	          { title: 'move widget up', style: aTagStyle, onClick: this.props.onEdit.bind(this, "up", true) },
	          ' ',
	          React.createElement('i', { className: 'glyphicon glyphicon-arrow-up' }),
	          ' '
	        ),
	        React.createElement(
	          'a',
	          { title: 'move widget down', style: aTagStyle, onClick: this.props.onEdit.bind(this, "down", true) },
	          ' ',
	          React.createElement('i', { className: 'glyphicon glyphicon-arrow-down' }),
	          ' '
	        ),
	        React.createElement(
	          'a',
	          { title: 'move widget left', style: aTagStyle, onClick: this.props.onEdit.bind(this, "left", true) },
	          ' ',
	          React.createElement('i', { className: 'glyphicon glyphicon-arrow-left' }),
	          ' '
	        ),
	        React.createElement(
	          'a',
	          { title: 'move widget right', style: aTagStyle, onClick: this.props.onEdit.bind(this, "right", true) },
	          ' ',
	          React.createElement('i', { className: 'glyphicon glyphicon-arrow-right' }),
	          ' '
	        ),
	        React.createElement(
	          'a',
	          { title: 'increase widget width', style: aTagStyle, onClick: this.props.onEdit.bind(this, "enlarge", true) },
	          ' ',
	          React.createElement('i', { className: 'glyphicon glyphicon-resize-full' }),
	          ' '
	        ),
	        React.createElement(
	          'a',
	          { title: 'decrease widget width', style: aTagStyle, onClick: this.props.onEdit.bind(this, "shrink", true) },
	          ' ',
	          React.createElement('i', { className: 'glyphicon glyphicon-resize-small' }),
	          ' '
	        ),
	        React.createElement(
	          'a',
	          { title: 'remove widget', style: aTagStyle, onClick: this.props.onEdit.bind(this, "remove", true) },
	          ' ',
	          React.createElement('i', { className: 'glyphicon glyphicon-remove' }),
	          ' '
	        )
	      );
	    } else {
	      headingButtons = React.createElement(
	        'span',
	        { className: 'pull-right' },
	        function () {
	          if (_this.state.configurable) {
	            return React.createElement(
	              'a',
	              { title: 'edit widget params', style: aTagStyle, onClick: _this.openConfigModal },
	              ' ',
	              React.createElement('i', { className: 'glyphicon glyphicon-cog' }),
	              ' '
	            );
	          }
	        }(),
	        React.createElement(
	          'a',
	          { title: 'reload widget content', style: aTagStyle, onClick: this.refreshWidget.bind(this, this.props) },
	          ' ',
	          React.createElement('i', { className: 'glyphicon glyphicon-refresh' }),
	          ' '
	        )
	      );
	    }

	    var DetailWidget = WidgetList[this.props.widget.type];
	    if (!DetailWidget) {
	      throw new Error('ReactDashboard: Widget Type "' + this.props.widget.type + '" not defined as ReactDashboard Widget Type');
	    }

	    var configParamsList = this.state.params.map(function (param, i) {
	      if (!param.configurable) {
	        return;
	      }
	      return React.createElement(
	        'div',
	        { className: 'row', key: "config_param_" + i },
	        React.createElement(
	          'p',
	          { className: 'col-xs-6' },
	          param.name
	        ),
	        React.createElement('input', { className: 'col-xs-6', defaultValue: param.value, onChange: _this.configParamsChanged.bind(_this, i) })
	      );
	    });

	    //bootstrap classes : default/primary/success/info/warning/danger
	    return React.createElement(
	      'div',
	      { style: widgetStyle },
	      React.createElement(
	        'div',
	        { className: 'panel panel-default' },
	        React.createElement(
	          'div',
	          { className: 'panel-heading' },
	          this.props.widget.title,
	          headingButtons
	        ),
	        React.createElement(
	          'div',
	          { className: 'panel-body' },
	          React.createElement(
	            'div',
	            { style: panelBodyStyle },
	            React.createElement(DetailWidget, { data: this.state.data, onClick: this.props.onClick })
	          )
	        )
	      ),
	      React.createElement(
	        Modal,
	        { show: this.state.showModal, onHide: this.closeConfigModal },
	        React.createElement(
	          Modal.Header,
	          { closeButton: true },
	          React.createElement(
	            Modal.Title,
	            null,
	            'Config'
	          )
	        ),
	        React.createElement(
	          Modal.Body,
	          null,
	          React.createElement(
	            'div',
	            { style: { padding: "10px 20px" } },
	            configParamsList
	          )
	        ),
	        React.createElement(
	          Modal.Footer,
	          null,
	          React.createElement(
	            'button',
	            { className: 'btn btn-default', onClick: this.closeConfigModal },
	            'Close'
	          ),
	          React.createElement(
	            'button',
	            { className: 'btn btn-primary', onClick: this.closeConfigModal.bind(this, "save") },
	            'Save'
	          )
	        )
	      )
	    );
	  }

	});

	Widget.defaultProps = {
	  widget: { colSpan: "", type: "", title: "", url: "", params: [], data: "" },
	  onClick: undefined
	};

	module.exports = Widget;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var convert = __webpack_require__(4),
	    func = convert('cloneDeep', __webpack_require__(174), __webpack_require__(175));

	func.placeholder = __webpack_require__(7);
	module.exports = func;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseConvert = __webpack_require__(5),
	    util = __webpack_require__(8);

	/**
	 * Converts `func` of `name` to an immutable auto-curried iteratee-first data-last
	 * version with conversion `options` applied. If `name` is an object its methods
	 * will be converted.
	 *
	 * @param {string} name The name of the function to wrap.
	 * @param {Function} [func] The function to wrap.
	 * @param {Object} [options] The options object. See `baseConvert` for more details.
	 * @returns {Function|Object} Returns the converted function or object.
	 */
	function convert(name, func, options) {
	  return baseConvert(util, name, func, options);
	}

	module.exports = convert;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mapping = __webpack_require__(6),
	    mutateMap = mapping.mutate,
	    fallbackHolder = __webpack_require__(7);

	/**
	 * Creates a function, with an arity of `n`, that invokes `func` with the
	 * arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} n The arity of the new function.
	 * @returns {Function} Returns the new function.
	 */
	function baseArity(func, n) {
	  return n == 2 ? function (a, b) {
	    return func.apply(undefined, arguments);
	  } : function (a) {
	    return func.apply(undefined, arguments);
	  };
	}

	/**
	 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
	 * any additional arguments.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @param {number} n The arity cap.
	 * @returns {Function} Returns the new function.
	 */
	function baseAry(func, n) {
	  return n == 2 ? function (a, b) {
	    return func(a, b);
	  } : function (a) {
	    return func(a);
	  };
	}

	/**
	 * Creates a clone of `array`.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the cloned array.
	 */
	function cloneArray(array) {
	  var length = array ? array.length : 0,
	      result = Array(length);

	  while (length--) {
	    result[length] = array[length];
	  }
	  return result;
	}

	/**
	 * Creates a function that clones a given object using the assignment `func`.
	 *
	 * @private
	 * @param {Function} func The assignment function.
	 * @returns {Function} Returns the new cloner function.
	 */
	function createCloner(func) {
	  return function (object) {
	    return func({}, object);
	  };
	}

	/**
	 * Creates a function that wraps `func` and uses `cloner` to clone the first
	 * argument it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} cloner The function to clone arguments.
	 * @returns {Function} Returns the new immutable function.
	 */
	function immutWrap(func, cloner) {
	  return function () {
	    var length = arguments.length;
	    if (!length) {
	      return result;
	    }
	    var args = Array(length);
	    while (length--) {
	      args[length] = arguments[length];
	    }
	    var result = args[0] = cloner.apply(undefined, args);
	    func.apply(undefined, args);
	    return result;
	  };
	}

	/**
	 * The base implementation of `convert` which accepts a `util` object of methods
	 * required to perform conversions.
	 *
	 * @param {Object} util The util object.
	 * @param {string} name The name of the function to convert.
	 * @param {Function} func The function to convert.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
	 * @param {boolean} [options.curry=true] Specify currying.
	 * @param {boolean} [options.fixed=true] Specify fixed arity.
	 * @param {boolean} [options.immutable=true] Specify immutable operations.
	 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
	 * @returns {Function|Object} Returns the converted function or object.
	 */
	function baseConvert(util, name, func, options) {
	  var setPlaceholder,
	      isLib = typeof name == 'function',
	      isObj = name === Object(name);

	  if (isObj) {
	    options = func;
	    func = name;
	    name = undefined;
	  }
	  if (func == null) {
	    throw new TypeError();
	  }
	  options || (options = {});

	  var config = {
	    'cap': 'cap' in options ? options.cap : true,
	    'curry': 'curry' in options ? options.curry : true,
	    'fixed': 'fixed' in options ? options.fixed : true,
	    'immutable': 'immutable' in options ? options.immutable : true,
	    'rearg': 'rearg' in options ? options.rearg : true
	  };

	  var forceCurry = 'curry' in options && options.curry,
	      forceFixed = 'fixed' in options && options.fixed,
	      forceRearg = 'rearg' in options && options.rearg,
	      placeholder = isLib ? func : fallbackHolder,
	      pristine = isLib ? func.runInContext() : undefined;

	  var helpers = isLib ? func : {
	    'ary': util.ary,
	    'assign': util.assign,
	    'clone': util.clone,
	    'curry': util.curry,
	    'forEach': util.forEach,
	    'isArray': util.isArray,
	    'isFunction': util.isFunction,
	    'iteratee': util.iteratee,
	    'keys': util.keys,
	    'rearg': util.rearg,
	    'spread': util.spread,
	    'toPath': util.toPath
	  };

	  var ary = helpers.ary,
	      assign = helpers.assign,
	      clone = helpers.clone,
	      curry = helpers.curry,
	      each = helpers.forEach,
	      isArray = helpers.isArray,
	      isFunction = helpers.isFunction,
	      keys = helpers.keys,
	      rearg = helpers.rearg,
	      spread = helpers.spread,
	      toPath = helpers.toPath;

	  var aryMethodKeys = keys(mapping.aryMethod);

	  var wrappers = {
	    'castArray': function castArray(_castArray) {
	      return function () {
	        var value = arguments[0];
	        return isArray(value) ? _castArray(cloneArray(value)) : _castArray.apply(undefined, arguments);
	      };
	    },
	    'iteratee': function iteratee(_iteratee) {
	      return function () {
	        var func = arguments[0],
	            arity = arguments[1],
	            result = _iteratee(func, arity),
	            length = result.length;

	        if (config.cap && typeof arity == 'number') {
	          arity = arity > 2 ? arity - 2 : 1;
	          return length && length <= arity ? result : baseAry(result, arity);
	        }
	        return result;
	      };
	    },
	    'mixin': function mixin(_mixin) {
	      return function (source) {
	        var func = this;
	        if (!isFunction(func)) {
	          return _mixin(func, Object(source));
	        }
	        var methods = [],
	            methodNames = [];

	        each(keys(source), function (key) {
	          var value = source[key];
	          if (isFunction(value)) {
	            methodNames.push(key);
	            methods.push(func.prototype[key]);
	          }
	        });

	        _mixin(func, Object(source));

	        each(methodNames, function (methodName, index) {
	          var method = methods[index];
	          if (isFunction(method)) {
	            func.prototype[methodName] = method;
	          } else {
	            delete func.prototype[methodName];
	          }
	        });
	        return func;
	      };
	    },
	    'runInContext': function runInContext(_runInContext) {
	      return function (context) {
	        return baseConvert(util, _runInContext(context), options);
	      };
	    }
	  };

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates a clone of `object` by `path`.
	   *
	   * @private
	   * @param {Object} object The object to clone.
	   * @param {Array|string} path The path to clone by.
	   * @returns {Object} Returns the cloned object.
	   */
	  function cloneByPath(object, path) {
	    path = toPath(path);

	    var index = -1,
	        length = path.length,
	        result = clone(Object(object)),
	        nested = result;

	    while (nested != null && ++index < length) {
	      var key = path[index],
	          value = nested[key];

	      if (value != null) {
	        nested[key] = clone(Object(value));
	      }
	      nested = nested[key];
	    }
	    return result;
	  }

	  /**
	   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
	   * version with conversion `options` applied.
	   *
	   * @param {Object} [options] The options object. See `baseConvert` for more details.
	   * @returns {Function} Returns the converted `lodash`.
	   */
	  function convertLib(options) {
	    return _.runInContext.convert(options)(undefined);
	  }

	  /**
	   * Create a converter function for `func` of `name`.
	   *
	   * @param {string} name The name of the function to convert.
	   * @param {Function} func The function to convert.
	   * @returns {Function} Returns the new converter function.
	   */
	  function createConverter(name, func) {
	    var oldOptions = options;
	    return function (options) {
	      var newUtil = isLib ? pristine : helpers,
	          newFunc = isLib ? pristine[name] : func,
	          newOptions = assign(assign({}, oldOptions), options);

	      return baseConvert(newUtil, name, newFunc, newOptions);
	    };
	  }

	  /**
	   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
	   * arguments, ignoring any additional arguments.
	   *
	   * @private
	   * @param {Function} func The function to cap iteratee arguments for.
	   * @param {number} n The arity cap.
	   * @returns {Function} Returns the new function.
	   */
	  function iterateeAry(func, n) {
	    return overArg(func, function (func) {
	      return typeof func == 'function' ? baseAry(func, n) : func;
	    });
	  }

	  /**
	   * Creates a function that wraps `func` to invoke its iteratee with arguments
	   * arranged according to the specified `indexes` where the argument value at
	   * the first index is provided as the first argument, the argument value at
	   * the second index is provided as the second argument, and so on.
	   *
	   * @private
	   * @param {Function} func The function to rearrange iteratee arguments for.
	   * @param {number[]} indexes The arranged argument indexes.
	   * @returns {Function} Returns the new function.
	   */
	  function iterateeRearg(func, indexes) {
	    return overArg(func, function (func) {
	      var n = indexes.length;
	      return baseArity(rearg(baseAry(func, n), indexes), n);
	    });
	  }

	  /**
	   * Creates a function that invokes `func` with its first argument passed
	   * thru `transform`.
	   *
	   * @private
	   * @param {Function} func The function to wrap.
	   * @param {...Function} transform The functions to transform the first argument.
	   * @returns {Function} Returns the new function.
	   */
	  function overArg(func, transform) {
	    return function () {
	      var length = arguments.length;
	      if (!length) {
	        return func();
	      }
	      var args = Array(length);
	      while (length--) {
	        args[length] = arguments[length];
	      }
	      var index = config.rearg ? 0 : length - 1;
	      args[index] = transform(args[index]);
	      return func.apply(undefined, args);
	    };
	  }

	  /**
	   * Creates a function that wraps `func` and applys the conversions
	   * rules by `name`.
	   *
	   * @private
	   * @param {string} name The name of the function to wrap.
	   * @param {Function} func The function to wrap.
	   * @returns {Function} Returns the converted function.
	   */
	  function wrap(name, func) {
	    name = mapping.aliasToReal[name] || name;

	    var result,
	        wrapped = func,
	        wrapper = wrappers[name];

	    if (wrapper) {
	      wrapped = wrapper(func);
	    } else if (config.immutable) {
	      if (mutateMap.array[name]) {
	        wrapped = immutWrap(func, cloneArray);
	      } else if (mutateMap.object[name]) {
	        wrapped = immutWrap(func, createCloner(func));
	      } else if (mutateMap.set[name]) {
	        wrapped = immutWrap(func, cloneByPath);
	      }
	    }
	    each(aryMethodKeys, function (aryKey) {
	      each(mapping.aryMethod[aryKey], function (otherName) {
	        if (name == otherName) {
	          var aryN = !isLib && mapping.iterateeAry[name],
	              reargIndexes = mapping.iterateeRearg[name],
	              spreadStart = mapping.methodSpread[name];

	          result = wrapped;
	          if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
	            result = spreadStart === undefined ? ary(result, aryKey) : spread(result, spreadStart);
	          }
	          if (config.rearg && aryKey > 1 && (forceRearg || !mapping.skipRearg[name])) {
	            result = rearg(result, mapping.methodRearg[name] || mapping.aryRearg[aryKey]);
	          }
	          if (config.cap) {
	            if (reargIndexes) {
	              result = iterateeRearg(result, reargIndexes);
	            } else if (aryN) {
	              result = iterateeAry(result, aryN);
	            }
	          }
	          if (forceCurry || config.curry && aryKey > 1) {
	            forceCurry && console.log(forceCurry, name);
	            result = curry(result, aryKey);
	          }
	          return false;
	        }
	      });
	      return !result;
	    });

	    result || (result = wrapped);
	    if (result == func) {
	      result = forceCurry ? curry(result, 1) : function () {
	        return func.apply(this, arguments);
	      };
	    }
	    result.convert = createConverter(name, func);
	    if (mapping.placeholder[name]) {
	      setPlaceholder = true;
	      result.placeholder = func.placeholder = placeholder;
	    }
	    return result;
	  }

	  /*--------------------------------------------------------------------------*/

	  if (!isObj) {
	    return wrap(name, func);
	  }
	  var _ = func;

	  // Convert methods by ary cap.
	  var pairs = [];
	  each(aryMethodKeys, function (aryKey) {
	    each(mapping.aryMethod[aryKey], function (key) {
	      var func = _[mapping.remap[key] || key];
	      if (func) {
	        pairs.push([key, wrap(key, func)]);
	      }
	    });
	  });

	  // Convert remaining methods.
	  each(keys(_), function (key) {
	    var func = _[key];
	    if (typeof func == 'function') {
	      var length = pairs.length;
	      while (length--) {
	        if (pairs[length][0] == key) {
	          return;
	        }
	      }
	      func.convert = createConverter(key, func);
	      pairs.push([key, func]);
	    }
	  });

	  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
	  each(pairs, function (pair) {
	    _[pair[0]] = pair[1];
	  });

	  _.convert = convertLib;
	  if (setPlaceholder) {
	    _.placeholder = placeholder;
	  }
	  // Assign aliases.
	  each(keys(_), function (key) {
	    each(mapping.realToAlias[key] || [], function (alias) {
	      _[alias] = _[key];
	    });
	  });

	  return _;
	}

	module.exports = baseConvert;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/** Used to map aliases to their real names. */
	exports.aliasToReal = {

	  // Lodash aliases.
	  'each': 'forEach',
	  'eachRight': 'forEachRight',
	  'entries': 'toPairs',
	  'entriesIn': 'toPairsIn',
	  'extend': 'assignIn',
	  'extendWith': 'assignInWith',
	  'first': 'head',

	  // Ramda aliases.
	  '__': 'placeholder',
	  'all': 'every',
	  'allPass': 'overEvery',
	  'always': 'constant',
	  'any': 'some',
	  'anyPass': 'overSome',
	  'apply': 'spread',
	  'assoc': 'set',
	  'assocPath': 'set',
	  'complement': 'negate',
	  'compose': 'flowRight',
	  'contains': 'includes',
	  'dissoc': 'unset',
	  'dissocPath': 'unset',
	  'equals': 'isEqual',
	  'identical': 'eq',
	  'init': 'initial',
	  'invertObj': 'invert',
	  'juxt': 'over',
	  'omitAll': 'omit',
	  'nAry': 'ary',
	  'path': 'get',
	  'pathEq': 'matchesProperty',
	  'pathOr': 'getOr',
	  'paths': 'at',
	  'pickAll': 'pick',
	  'pipe': 'flow',
	  'pluck': 'map',
	  'prop': 'get',
	  'propEq': 'matchesProperty',
	  'propOr': 'getOr',
	  'props': 'at',
	  'unapply': 'rest',
	  'unnest': 'flatten',
	  'useWith': 'overArgs',
	  'whereEq': 'filter',
	  'zipObj': 'zipObject'
	};

	/** Used to map ary to method names. */
	exports.aryMethod = {
	  '1': ['attempt', 'castArray', 'ceil', 'create', 'curry', 'curryRight', 'floor', 'flow', 'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'methodOf', 'mixin', 'over', 'overEvery', 'overSome', 'rest', 'reverse', 'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart', 'uniqueId', 'words'],
	  '2': ['add', 'after', 'ary', 'assign', 'assignIn', 'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith', 'cloneWith', 'concat', 'countBy', 'curryN', 'curryRightN', 'debounce', 'defaults', 'defaultsDeep', 'delay', 'difference', 'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq', 'every', 'filter', 'find', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex', 'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get', 'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection', 'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy', 'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty', 'maxBy', 'meanBy', 'merge', 'minBy', 'multiply', 'nth', 'omit', 'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial', 'partialRight', 'partition', 'pick', 'pickBy', 'pull', 'pullAll', 'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove', 'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex', 'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy', 'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight', 'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars', 'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith', 'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject', 'zipObjectDeep'],
	  '3': ['assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith', 'getOr', 'inRange', 'intersectionBy', 'intersectionWith', 'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd', 'padCharsStart', 'pullAllBy', 'pullAllWith', 'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy', 'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy', 'xorWith', 'zipWith'],
	  '4': ['fill', 'setWith', 'updateWith']
	};

	/** Used to map ary to rearg configs. */
	exports.aryRearg = {
	  '2': [1, 0],
	  '3': [2, 0, 1],
	  '4': [3, 2, 0, 1]
	};

	/** Used to map method names to their iteratee ary. */
	exports.iterateeAry = {
	  'dropRightWhile': 1,
	  'dropWhile': 1,
	  'every': 1,
	  'filter': 1,
	  'find': 1,
	  'findIndex': 1,
	  'findKey': 1,
	  'findLast': 1,
	  'findLastIndex': 1,
	  'findLastKey': 1,
	  'flatMap': 1,
	  'flatMapDeep': 1,
	  'flatMapDepth': 1,
	  'forEach': 1,
	  'forEachRight': 1,
	  'forIn': 1,
	  'forInRight': 1,
	  'forOwn': 1,
	  'forOwnRight': 1,
	  'map': 1,
	  'mapKeys': 1,
	  'mapValues': 1,
	  'partition': 1,
	  'reduce': 2,
	  'reduceRight': 2,
	  'reject': 1,
	  'remove': 1,
	  'some': 1,
	  'takeRightWhile': 1,
	  'takeWhile': 1,
	  'times': 1,
	  'transform': 2
	};

	/** Used to map method names to iteratee rearg configs. */
	exports.iterateeRearg = {
	  'mapKeys': [1]
	};

	/** Used to map method names to rearg configs. */
	exports.methodRearg = {
	  'assignInWith': [1, 2, 0],
	  'assignWith': [1, 2, 0],
	  'getOr': [2, 1, 0],
	  'isEqualWith': [1, 2, 0],
	  'isMatchWith': [2, 1, 0],
	  'mergeWith': [1, 2, 0],
	  'padChars': [2, 1, 0],
	  'padCharsEnd': [2, 1, 0],
	  'padCharsStart': [2, 1, 0],
	  'pullAllBy': [2, 1, 0],
	  'pullAllWith': [2, 1, 0],
	  'setWith': [3, 1, 2, 0],
	  'sortedIndexBy': [2, 1, 0],
	  'sortedLastIndexBy': [2, 1, 0],
	  'updateWith': [3, 1, 2, 0],
	  'zipWith': [1, 2, 0]
	};

	/** Used to map method names to spread configs. */
	exports.methodSpread = {
	  'invokeArgs': 2,
	  'invokeArgsMap': 2,
	  'partial': 1,
	  'partialRight': 1,
	  'without': 1
	};

	/** Used to identify methods which mutate arrays or objects. */
	exports.mutate = {
	  'array': {
	    'fill': true,
	    'pull': true,
	    'pullAll': true,
	    'pullAllBy': true,
	    'pullAllWith': true,
	    'pullAt': true,
	    'remove': true,
	    'reverse': true
	  },
	  'object': {
	    'assign': true,
	    'assignIn': true,
	    'assignInWith': true,
	    'assignWith': true,
	    'defaults': true,
	    'defaultsDeep': true,
	    'merge': true,
	    'mergeWith': true
	  },
	  'set': {
	    'set': true,
	    'setWith': true,
	    'unset': true,
	    'update': true,
	    'updateWith': true
	  }
	};

	/** Used to track methods with placeholder support */
	exports.placeholder = {
	  'bind': true,
	  'bindKey': true,
	  'curry': true,
	  'curryRight': true,
	  'partial': true,
	  'partialRight': true
	};

	/** Used to map real names to their aliases. */
	exports.realToAlias = function () {
	  var hasOwnProperty = Object.prototype.hasOwnProperty,
	      object = exports.aliasToReal,
	      result = {};

	  for (var key in object) {
	    var value = object[key];
	    if (hasOwnProperty.call(result, value)) {
	      result[value].push(key);
	    } else {
	      result[value] = [key];
	    }
	  }
	  return result;
	}();

	/** Used to map method names to other names. */
	exports.remap = {
	  'curryN': 'curry',
	  'curryRightN': 'curryRight',
	  'getOr': 'get',
	  'invokeArgs': 'invoke',
	  'invokeArgsMap': 'invokeMap',
	  'padChars': 'pad',
	  'padCharsEnd': 'padEnd',
	  'padCharsStart': 'padStart',
	  'restFrom': 'rest',
	  'spreadFrom': 'spread',
	  'trimChars': 'trim',
	  'trimCharsEnd': 'trimEnd',
	  'trimCharsStart': 'trimStart'
	};

	/** Used to track methods that skip fixing their arity. */
	exports.skipFixed = {
	  'castArray': true,
	  'flow': true,
	  'flowRight': true,
	  'iteratee': true,
	  'mixin': true,
	  'runInContext': true
	};

	/** Used to track methods that skip rearranging arguments. */
	exports.skipRearg = {
	  'add': true,
	  'assign': true,
	  'assignIn': true,
	  'bind': true,
	  'bindKey': true,
	  'concat': true,
	  'difference': true,
	  'divide': true,
	  'eq': true,
	  'gt': true,
	  'gte': true,
	  'isEqual': true,
	  'lt': true,
	  'lte': true,
	  'matchesProperty': true,
	  'merge': true,
	  'multiply': true,
	  'overArgs': true,
	  'partial': true,
	  'partialRight': true,
	  'random': true,
	  'range': true,
	  'rangeRight': true,
	  'subtract': true,
	  'without': true,
	  'zip': true,
	  'zipObject': true
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The default argument placeholder value for methods.
	 *
	 * @type {Object}
	 */
	module.exports = {};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  'ary': __webpack_require__(9),
	  'assign': __webpack_require__(58),
	  'clone': __webpack_require__(76),
	  'curry': __webpack_require__(133),
	  'forEach': __webpack_require__(103),
	  'isArray': __webpack_require__(43),
	  'isFunction': __webpack_require__(17),
	  'iteratee': __webpack_require__(134),
	  'keys': __webpack_require__(65),
	  'rearg': __webpack_require__(166),
	  'spread': __webpack_require__(170),
	  'toPath': __webpack_require__(173)
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createWrapper = __webpack_require__(10);

	/** Used to compose bitmasks for wrapper metadata. */
	var ARY_FLAG = 128;

	/**
	 * Creates a function that invokes `func`, with up to `n` arguments,
	 * ignoring any additional arguments.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Function
	 * @param {Function} func The function to cap arguments for.
	 * @param {number} [n=func.length] The arity cap.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	 * // => [6, 8, 10]
	 */
	function ary(func, n, guard) {
	  n = guard ? undefined : n;
	  n = func && n == null ? func.length : n;
	  return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
	}

	module.exports = ary;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSetData = __webpack_require__(11),
	    createBaseWrapper = __webpack_require__(24),
	    createCurryWrapper = __webpack_require__(27),
	    createHybridWrapper = __webpack_require__(29),
	    createPartialWrapper = __webpack_require__(53),
	    getData = __webpack_require__(37),
	    mergeData = __webpack_require__(54),
	    setData = __webpack_require__(47),
	    toInteger = __webpack_require__(55);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - `_.bind`
	 *     2 - `_.bindKey`
	 *     4 - `_.curry` or `_.curryRight` of a bound function
	 *     8 - `_.curry`
	 *    16 - `_.curryRight`
	 *    32 - `_.partial`
	 *    64 - `_.partialRight`
	 *   128 - `_.rearg`
	 *   256 - `_.ary`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & BIND_KEY_FLAG;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	    partials = holders = undefined;
	  }
	  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
	  arity = arity === undefined ? arity : toInteger(arity);
	  length -= holders ? holders.length : 0;

	  if (bitmask & PARTIAL_RIGHT_FLAG) {
	    var partialsRight = partials,
	        holdersRight = holders;

	    partials = holders = undefined;
	  }
	  var data = isBindKey ? undefined : getData(func);

	  var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

	  if (data) {
	    mergeData(newData, data);
	  }
	  func = newData[0];
	  bitmask = newData[1];
	  thisArg = newData[2];
	  partials = newData[3];
	  holders = newData[4];
	  arity = newData[9] = newData[9] == null ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);

	  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
	    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
	  }
	  if (!bitmask || bitmask == BIND_FLAG) {
	    var result = createBaseWrapper(func, bitmask, thisArg);
	  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
	    result = createCurryWrapper(func, bitmask, arity);
	  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
	    result = createPartialWrapper(func, bitmask, thisArg, partials);
	  } else {
	    result = createHybridWrapper.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setter(result, newData);
	}

	module.exports = createWrapper;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var identity = __webpack_require__(12),
	    metaMap = __webpack_require__(13);

	/**
	 * The base implementation of `setData` without support for hot loop detection.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function (func, data) {
	  metaMap.set(func, data);
	  return func;
	};

	module.exports = baseSetData;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var WeakMap = __webpack_require__(14);

	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap();

	module.exports = metaMap;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(15),
	    root = __webpack_require__(21);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isNative = __webpack_require__(16);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(17),
	    isHostObject = __webpack_require__(19),
	    isObject = __webpack_require__(18),
	    toSource = __webpack_require__(20);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = isNative;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return func + '';
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var checkGlobal = __webpack_require__(23);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[_typeof(undefined)] && undefined);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

	module.exports = root;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)(module), (function() { return this; }())))

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return value && value.Object === Object ? value : null;
	}

	module.exports = checkGlobal;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createCtorWrapper = __webpack_require__(25),
	    root = __webpack_require__(21);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBaseWrapper(func, bitmask, thisArg) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtorWrapper(func);

	  function wrapper() {
	    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}

	module.exports = createBaseWrapper;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCreate = __webpack_require__(26),
	    isObject = __webpack_require__(18);

	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtorWrapper(Ctor) {
	  return function () {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0:
	        return new Ctor();
	      case 1:
	        return new Ctor(args[0]);
	      case 2:
	        return new Ctor(args[0], args[1]);
	      case 3:
	        return new Ctor(args[0], args[1], args[2]);
	      case 4:
	        return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5:
	        return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6:
	        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7:
	        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);

	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}

	module.exports = createCtorWrapper;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	module.exports = baseCreate;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(28),
	    createCtorWrapper = __webpack_require__(25),
	    createHybridWrapper = __webpack_require__(29),
	    createRecurryWrapper = __webpack_require__(33),
	    getPlaceholder = __webpack_require__(49),
	    replaceHolders = __webpack_require__(52),
	    root = __webpack_require__(21);

	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurryWrapper(func, bitmask, arity) {
	  var Ctor = createCtorWrapper(func);

	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = getPlaceholder(wrapper);

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);

	    length -= holders.length;
	    if (length < arity) {
	      return createRecurryWrapper(func, bitmask, createHybridWrapper, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
	    }
	    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
	    return apply(fn, this, args);
	  }
	  return wrapper;
	}

	module.exports = createCurryWrapper;

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0:
	      return func.call(thisArg);
	    case 1:
	      return func.call(thisArg, args[0]);
	    case 2:
	      return func.call(thisArg, args[0], args[1]);
	    case 3:
	      return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var composeArgs = __webpack_require__(30),
	    composeArgsRight = __webpack_require__(31),
	    countHolders = __webpack_require__(32),
	    createCtorWrapper = __webpack_require__(25),
	    createRecurryWrapper = __webpack_require__(33),
	    getPlaceholder = __webpack_require__(49),
	    reorder = __webpack_require__(50),
	    replaceHolders = __webpack_require__(52),
	    root = __webpack_require__(21);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    ARY_FLAG = 128,
	    FLIP_FLAG = 512;

	/**
	 * Creates a function that wraps `func` to invoke it with optional `this`
	 * binding of `thisArg`, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided
	 *  to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & ARY_FLAG,
	      isBind = bitmask & BIND_FLAG,
	      isBindKey = bitmask & BIND_KEY_FLAG,
	      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
	      isFlip = bitmask & FLIP_FLAG,
	      Ctor = isBindKey ? undefined : createCtorWrapper(func);

	  function wrapper() {
	    var length = arguments.length,
	        index = length,
	        args = Array(length);

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = getPlaceholder(wrapper),
	          holdersCount = countHolders(args, placeholder);
	    }
	    if (partials) {
	      args = composeArgs(args, partials, holders, isCurried);
	    }
	    if (partialsRight) {
	      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
	    }
	    length -= holdersCount;
	    if (isCurried && length < arity) {
	      var newHolders = replaceHolders(args, placeholder);
	      return createRecurryWrapper(func, bitmask, createHybridWrapper, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;

	    length = args.length;
	    if (argPos) {
	      args = reorder(args, argPos);
	    } else if (isFlip && length > 1) {
	      args.reverse();
	    }
	    if (isAry && ary < length) {
	      args.length = ary;
	    }
	    if (this && this !== root && this instanceof wrapper) {
	      fn = Ctor || createCtorWrapper(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}

	module.exports = createHybridWrapper;

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersLength = holders.length,
	      leftIndex = -1,
	      leftLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(leftLength + rangeLength),
	      isUncurried = !isCurried;

	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[holders[argsIndex]] = args[argsIndex];
	    }
	  }
	  while (rangeLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}

	module.exports = composeArgs;

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersIndex = -1,
	      holdersLength = holders.length,
	      rightIndex = -1,
	      rightLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(rangeLength + rightLength),
	      isUncurried = !isCurried;

	  while (++argsIndex < rangeLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[offset + holders[holdersIndex]] = args[argsIndex++];
	    }
	  }
	  return result;
	}

	module.exports = composeArgsRight;

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the number of `placeholder` occurrences in `array`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} placeholder The placeholder to search for.
	 * @returns {number} Returns the placeholder count.
	 */
	function countHolders(array, placeholder) {
	  var length = array.length,
	      result = 0;

	  while (length--) {
	    if (array[length] === placeholder) {
	      result++;
	    }
	  }
	  return result;
	}

	module.exports = countHolders;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLaziable = __webpack_require__(34),
	    setData = __webpack_require__(47);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;

	/**
	 * Creates a function that wraps `func` to continue currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurryWrapper(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & CURRY_FLAG,
	      newHolders = isCurry ? holders : undefined,
	      newHoldersRight = isCurry ? undefined : holders,
	      newPartials = isCurry ? partials : undefined,
	      newPartialsRight = isCurry ? undefined : partials;

	  bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG;
	  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

	  if (!(bitmask & CURRY_BOUND_FLAG)) {
	    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	  }
	  var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity];

	  var result = wrapFunc.apply(undefined, newData);
	  if (isLaziable(func)) {
	    setData(result, newData);
	  }
	  result.placeholder = placeholder;
	  return result;
	}

	module.exports = createRecurryWrapper;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LazyWrapper = __webpack_require__(35),
	    getData = __webpack_require__(37),
	    getFuncName = __webpack_require__(39),
	    lodash = __webpack_require__(41);

	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
	 *  else `false`.
	 */
	function isLaziable(func) {
	  var funcName = getFuncName(func),
	      other = lodash[funcName];

	  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = getData(other);
	  return !!data && func === data[0];
	}

	module.exports = isLaziable;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCreate = __webpack_require__(26),
	    baseLodash = __webpack_require__(36);

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @constructor
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = MAX_ARRAY_LENGTH;
	  this.__views__ = [];
	}

	// Ensure `LazyWrapper` is an instance of `baseLodash`.
	LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;

	module.exports = LazyWrapper;

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The function whose prototype chain sequence wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}

	module.exports = baseLodash;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metaMap = __webpack_require__(13),
	    noop = __webpack_require__(38);

	/**
	 * Gets metadata for `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {*} Returns the metadata for `func`.
	 */
	var getData = !metaMap ? noop : function (func) {
	  return metaMap.get(func);
	};

	module.exports = getData;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A no-operation function that returns `undefined` regardless of the
	 * arguments it receives.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var realNames = __webpack_require__(40);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = func.name + '',
	      array = realNames[result],
	      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}

	module.exports = getFuncName;

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";

	/** Used to lookup unminified function names. */
	var realNames = {};

	module.exports = realNames;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LazyWrapper = __webpack_require__(35),
	    LodashWrapper = __webpack_require__(42),
	    baseLodash = __webpack_require__(36),
	    isArray = __webpack_require__(43),
	    isObjectLike = __webpack_require__(44),
	    wrapperClone = __webpack_require__(45);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit method
	 * chain sequences. Methods that operate on and return arrays, collections,
	 * and functions can be chained together. Methods that retrieve a single value
	 * or may return a primitive value will automatically end the chain sequence
	 * and return the unwrapped value. Otherwise, the value must be unwrapped
	 * with `_#value`.
	 *
	 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	 * enabled using `_.chain`.
	 *
	 * The execution of chained methods is lazy, that is, it's deferred until
	 * `_#value` is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion.
	 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	 * the creation of intermediate arrays and can greatly reduce the number of
	 * iteratee executions. Sections of a chain sequence qualify for shortcut
	 * fusion if the section is applied to an array of at least `200` elements
	 * and any iteratees accept only one argument. The heuristic for whether a
	 * section qualifies for shortcut fusion is subject to change.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	 * `zipObject`, `zipObjectDeep`, and `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `deburr`, `divide`, `each`,
	 * `eachRight`, `endsWith`, `eq`, `escape`, `escapeRegExp`, `every`, `find`,
	 * `findIndex`, `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `first`,
	 * `floor`, `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`,
	 * `forOwnRight`, `get`, `gt`, `gte`, `has`, `hasIn`, `head`, `identity`,
	 * `includes`, `indexOf`, `inRange`, `invoke`, `isArguments`, `isArray`,
	 * `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`, `isBoolean`, `isBuffer`,
	 * `isDate`, `isElement`, `isEmpty`, `isEqual`, `isEqualWith`, `isError`,
	 * `isFinite`, `isFunction`, `isInteger`, `isLength`, `isMap`, `isMatch`,
	 * `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`,
	 * `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`, `isSafeInteger`,
	 * `isSet`, `isString`, `isUndefined`, `isTypedArray`, `isWeakMap`, `isWeakSet`,
	 * `join`, `kebabCase`, `last`, `lastIndexOf`, `lowerCase`, `lowerFirst`,
	 * `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`, `min`, `minBy`, `multiply`,
	 * `noConflict`, `noop`, `now`, `nth`, `pad`, `padEnd`, `padStart`, `parseInt`,
	 * `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`, `round`,
	 * `runInContext`, `sample`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
	 * `sortedIndexBy`, `sortedLastIndex`, `sortedLastIndexBy`, `startCase`,
	 * `startsWith`, `subtract`, `sum`, `sumBy`, `template`, `times`, `toInteger`,
	 * `toJSON`, `toLength`, `toLower`, `toNumber`, `toSafeInteger`, `toString`,
	 * `toUpper`, `trim`, `trimEnd`, `trimStart`, `truncate`, `unescape`,
	 * `uniqueId`, `upperCase`, `upperFirst`, `value`, and `words`
	 *
	 * @name _
	 * @constructor
	 * @category Seq
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // Returns an unwrapped value.
	 * wrapped.reduce(_.add);
	 * // => 6
	 *
	 * // Returns a wrapped value.
	 * var squares = wrapped.map(square);
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	    if (value instanceof LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty.call(value, '__wrapped__')) {
	      return wrapperClone(value);
	    }
	  }
	  return new LodashWrapper(value);
	}

	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;
	lodash.prototype.constructor = lodash;

	module.exports = lodash;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCreate = __webpack_require__(26),
	    baseLodash = __webpack_require__(36);

	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable explicit method chain sequences.
	 */
	function LodashWrapper(value, chainAll) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__chain__ = !!chainAll;
	  this.__index__ = 0;
	  this.__values__ = undefined;
	}

	LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;

	module.exports = LodashWrapper;

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LazyWrapper = __webpack_require__(35),
	    LodashWrapper = __webpack_require__(42),
	    copyArray = __webpack_require__(46);

	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  if (wrapper instanceof LazyWrapper) {
	    return wrapper.clone();
	  }
	  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	  result.__actions__ = copyArray(wrapper.__actions__);
	  result.__index__ = wrapper.__index__;
	  result.__values__ = wrapper.__values__;
	  return result;
	}

	module.exports = wrapperClone;

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSetData = __webpack_require__(11),
	    now = __webpack_require__(48);

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 150,
	    HOT_SPAN = 16;

	/**
	 * Sets metadata for `func`.
	 *
	 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	 * period of time, it will trip its breaker and transition to an identity
	 * function to avoid garbage collection pauses in V8. See
	 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
	 * for more details.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var setData = function () {
	  var count = 0,
	      lastCalled = 0;

	  return function (key, value) {
	    var stamp = now(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return key;
	      }
	    } else {
	      count = 0;
	    }
	    return baseSetData(key, value);
	  };
	}();

	module.exports = setData;

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @type {Function}
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred function to be invoked.
	 */
	var now = Date.now;

	module.exports = now;

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getPlaceholder(func) {
	  var object = func;
	  return object.placeholder;
	}

	module.exports = getPlaceholder;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyArray = __webpack_require__(46),
	    isIndex = __webpack_require__(51);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = copyArray(array);

	  while (length--) {
	    var index = indexes[length];
	    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}

	module.exports = reorder;

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (value === placeholder || value === PLACEHOLDER) {
	      array[index] = PLACEHOLDER;
	      result[resIndex++] = index;
	    }
	  }
	  return result;
	}

	module.exports = replaceHolders;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(28),
	    createCtorWrapper = __webpack_require__(25),
	    root = __webpack_require__(21);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartialWrapper(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtorWrapper(func);

	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = this && this !== root && this instanceof wrapper ? Ctor : func;

	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}

	module.exports = createPartialWrapper;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var composeArgs = __webpack_require__(30),
	    composeArgsRight = __webpack_require__(31),
	    replaceHolders = __webpack_require__(52);

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Merges the function metadata of `source` into `data`.
	 *
	 * Merging metadata reduces the number of wrappers used to invoke a function.
	 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	 * may be applied regardless of execution order. Methods like `_.ary` and
	 * `_.rearg` modify function arguments, making the order in which they are
	 * executed important, preventing the merging of metadata. However, we make
	 * an exception for a safe combined case where curried functions have `_.ary`
	 * and or `_.rearg` applied.
	 *
	 * @private
	 * @param {Array} data The destination metadata.
	 * @param {Array} source The source metadata.
	 * @returns {Array} Returns `data`.
	 */
	function mergeData(data, source) {
	  var bitmask = data[1],
	      srcBitmask = source[1],
	      newBitmask = bitmask | srcBitmask,
	      isCommon = newBitmask < (BIND_FLAG | BIND_KEY_FLAG | ARY_FLAG);

	  var isCombo = srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG || srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8] || srcBitmask == (ARY_FLAG | REARG_FLAG) && source[7].length <= source[8] && bitmask == CURRY_FLAG;

	  // Exit early if metadata can't be merged.
	  if (!(isCommon || isCombo)) {
	    return data;
	  }
	  // Use source `thisArg` if available.
	  if (srcBitmask & BIND_FLAG) {
	    data[2] = source[2];
	    // Set when currying a bound function.
	    newBitmask |= bitmask & BIND_FLAG ? 0 : CURRY_BOUND_FLAG;
	  }
	  // Compose partial arguments.
	  var value = source[3];
	  if (value) {
	    var partials = data[3];
	    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
	    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
	  }
	  // Compose partial right arguments.
	  value = source[5];
	  if (value) {
	    partials = data[5];
	    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
	    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
	  }
	  // Use source `argPos` if available.
	  value = source[7];
	  if (value) {
	    data[7] = value;
	  }
	  // Use source `ary` if it's smaller.
	  if (srcBitmask & ARY_FLAG) {
	    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	  }
	  // Use source `arity` if one is not provided.
	  if (data[9] == null) {
	    data[9] = source[9];
	  }
	  // Use source `func` and merge bitmasks.
	  data[0] = source[0];
	  data[1] = newBitmask;

	  return data;
	}

	module.exports = mergeData;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toNumber = __webpack_require__(56);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = value < 0 ? -1 : 1;
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? remainder ? value - remainder : value : 0;
	}

	module.exports = toInteger;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(17),
	    isObject = __webpack_require__(18),
	    isSymbol = __webpack_require__(57);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? other + '' : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	module.exports = toNumber;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isObjectLike = __webpack_require__(44);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}

	module.exports = isSymbol;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(59),
	    keys = __webpack_require__(62);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignValue = __webpack_require__(60);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];

	    assignValue(object, key, newValue);
	  }
	  return object;
	}

	module.exports = copyObject;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(61);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
	    object[key] = value;
	  }
	}

	module.exports = assignValue;

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}

	module.exports = eq;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHas = __webpack_require__(63),
	    baseKeys = __webpack_require__(65),
	    indexKeys = __webpack_require__(66),
	    isArrayLike = __webpack_require__(70),
	    isIndex = __webpack_require__(51),
	    isPrototype = __webpack_require__(75);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) && !(skipIndexes && (key == 'length' || isIndex(key, length))) && !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var getPrototype = __webpack_require__(64);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && key in object && getPrototype(object) === null;
	}

	module.exports = baseHas;

/***/ },
/* 64 */
/***/ function(module, exports) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;

/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseTimes = __webpack_require__(67),
	    isArguments = __webpack_require__(68),
	    isArray = __webpack_require__(43),
	    isLength = __webpack_require__(73),
	    isString = __webpack_require__(74);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) && (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;

/***/ },
/* 67 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLikeObject = __webpack_require__(69);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(70),
	    isObjectLike = __webpack_require__(44);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(71),
	    isFunction = __webpack_require__(17),
	    isLength = __webpack_require__(73);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	module.exports = isArrayLike;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(72);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(43),
	    isObjectLike = __webpack_require__(44);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
	}

	module.exports = isString;

/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseClone = __webpack_require__(77);

	/**
	 * Creates a shallow clone of `value`.
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	 * and supports cloning arrays, array buffers, booleans, date objects, maps,
	 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	 * arrays. The own enumerable properties of `arguments` objects are cloned
	 * as plain objects. An empty object is returned for uncloneable values such
	 * as error objects, functions, DOM nodes, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @returns {*} Returns the cloned value.
	 * @see _.cloneDeep
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var shallow = _.clone(objects);
	 * console.log(shallow[0] === objects[0]);
	 * // => true
	 */
	function clone(value) {
	  return baseClone(value, false, true);
	}

	module.exports = clone;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(78),
	    arrayEach = __webpack_require__(103),
	    assignValue = __webpack_require__(60),
	    baseAssign = __webpack_require__(58),
	    cloneBuffer = __webpack_require__(104),
	    copyArray = __webpack_require__(46),
	    copySymbols = __webpack_require__(105),
	    getAllKeys = __webpack_require__(107),
	    getTag = __webpack_require__(110),
	    initCloneArray = __webpack_require__(114),
	    initCloneByTag = __webpack_require__(115),
	    initCloneObject = __webpack_require__(130),
	    isArray = __webpack_require__(43),
	    isBuffer = __webpack_require__(131),
	    isHostObject = __webpack_require__(19),
	    isObject = __webpack_require__(18),
	    keys = __webpack_require__(62);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || isFunc && !object) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack());
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  // Recursively populate clone (susceptible to call stack limits).
	  arrayEach(props || value, function (subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stackClear = __webpack_require__(79),
	    stackDelete = __webpack_require__(80),
	    stackGet = __webpack_require__(83),
	    stackHas = __webpack_require__(85),
	    stackSet = __webpack_require__(87);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	    var index = -1,
	        length = values ? values.length : 0;

	    this.clear();
	    while (++index < length) {
	        var entry = values[index];
	        this.set(entry[0], entry[1]);
	    }
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	module.exports = stackClear;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocDelete = __webpack_require__(81);

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}

	module.exports = stackDelete;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(82);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	module.exports = assocDelete;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(61);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocGet = __webpack_require__(84);

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocGet(array, key) : data.map.get(key);
	}

	module.exports = stackGet;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(82);

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	module.exports = assocGet;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocHas = __webpack_require__(86);

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocHas(array, key) : data.map.has(key);
	}

	module.exports = stackHas;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(82);

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	module.exports = assocHas;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MapCache = __webpack_require__(88),
	    assocSet = __webpack_require__(101);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < LARGE_ARRAY_SIZE - 1) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	module.exports = stackSet;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mapClear = __webpack_require__(89),
	    mapDelete = __webpack_require__(93),
	    mapGet = __webpack_require__(97),
	    mapHas = __webpack_require__(99),
	    mapSet = __webpack_require__(100);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	    var index = -1,
	        length = values ? values.length : 0;

	    this.clear();
	    while (++index < length) {
	        var entry = values[index];
	        this.set(entry[0], entry[1]);
	    }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	module.exports = MapCache;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Hash = __webpack_require__(90),
	    Map = __webpack_require__(92);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': Map ? new Map() : [],
	    'string': new Hash()
	  };
	}

	module.exports = mapClear;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(91);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	module.exports = Hash;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(15);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(15),
	    root = __webpack_require__(21);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(92),
	    assocDelete = __webpack_require__(81),
	    hashDelete = __webpack_require__(94),
	    isKeyable = __webpack_require__(96);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	module.exports = mapDelete;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hashHas = __webpack_require__(95);

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	module.exports = hashDelete;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(91);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	module.exports = hashHas;

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	}

	module.exports = isKeyable;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(92),
	    assocGet = __webpack_require__(84),
	    hashGet = __webpack_require__(98),
	    isKeyable = __webpack_require__(96);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	module.exports = mapGet;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(91);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	module.exports = hashGet;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(92),
	    assocHas = __webpack_require__(86),
	    hashHas = __webpack_require__(95),
	    isKeyable = __webpack_require__(96);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	module.exports = mapHas;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(92),
	    assocSet = __webpack_require__(101),
	    hashSet = __webpack_require__(102),
	    isKeyable = __webpack_require__(96);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	module.exports = mapSet;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(82);

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	module.exports = assocSet;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(91);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	}

	module.exports = hashSet;

/***/ },
/* 103 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;

/***/ },
/* 104 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(59),
	    getSymbols = __webpack_require__(106);

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;

/***/ },
/* 106 */
/***/ function(module, exports) {

	"use strict";

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	function getSymbols(object) {
	  // Coerce `object` to an object to avoid non-object errors in V8.
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=3443 for more details.
	  return getOwnPropertySymbols(Object(object));
	}

	// Fallback for IE < 11.
	if (!getOwnPropertySymbols) {
	  getSymbols = function getSymbols() {
	    return [];
	  };
	}

	module.exports = getSymbols;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGetAllKeys = __webpack_require__(108),
	    getSymbols = __webpack_require__(106),
	    keys = __webpack_require__(62);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayPush = __webpack_require__(109),
	    isArray = __webpack_require__(43);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	    var result = keysFunc(object);
	    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;

/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DataView = __webpack_require__(111),
	    Map = __webpack_require__(92),
	    Promise = __webpack_require__(112),
	    Set = __webpack_require__(113),
	    WeakMap = __webpack_require__(14),
	    toSource = __webpack_require__(20);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
	  getTag = function getTag(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString:
	          return dataViewTag;
	        case mapCtorString:
	          return mapTag;
	        case promiseCtorString:
	          return promiseTag;
	        case setCtorString:
	          return setTag;
	        case weakMapCtorString:
	          return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(15),
	    root = __webpack_require__(21);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(15),
	    root = __webpack_require__(21);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(15),
	    root = __webpack_require__(21);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;

/***/ },
/* 114 */
/***/ function(module, exports) {

	'use strict';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cloneArrayBuffer = __webpack_require__(116),
	    cloneDataView = __webpack_require__(118),
	    cloneMap = __webpack_require__(119),
	    cloneRegExp = __webpack_require__(123),
	    cloneSet = __webpack_require__(124),
	    cloneSymbol = __webpack_require__(127),
	    cloneTypedArray = __webpack_require__(129);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag:case float64Tag:
	    case int8Tag:case int16Tag:case int32Tag:
	    case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Uint8Array = __webpack_require__(117);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(21);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cloneArrayBuffer = __webpack_require__(116);

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addMapEntry = __webpack_require__(120),
	    arrayReduce = __webpack_require__(121),
	    mapToArray = __webpack_require__(122);

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor());
	}

	module.exports = cloneMap;

/***/ },
/* 120 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `Map#set` because it doesn't return the map instance in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;

/***/ },
/* 121 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;

/***/ },
/* 122 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function (value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;

/***/ },
/* 123 */
/***/ function(module, exports) {

	"use strict";

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addSetEntry = __webpack_require__(125),
	    arrayReduce = __webpack_require__(121),
	    setToArray = __webpack_require__(126);

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor());
	}

	module.exports = cloneSet;

/***/ },
/* 125 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;

/***/ },
/* 126 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(128);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(21);

	/** Built-in value references. */
	var _Symbol = root.Symbol;

	module.exports = _Symbol;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cloneArrayBuffer = __webpack_require__(116);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCreate = __webpack_require__(26),
	    getPrototype = __webpack_require__(64),
	    isPrototype = __webpack_require__(75);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
	}

	module.exports = initCloneObject;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var constant = __webpack_require__(132),
	    root = __webpack_require__(21);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : undefined;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports ? freeExports : undefined;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = !Buffer ? constant(false) : function (value) {
	  return value instanceof Buffer;
	};

	module.exports = isBuffer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)(module)))

/***/ },
/* 132 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function () {
	    return value;
	  };
	}

	module.exports = constant;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createWrapper = __webpack_require__(10);

	/** Used to compose bitmasks for wrapper metadata. */
	var CURRY_FLAG = 8;

	/**
	 * Creates a function that accepts arguments of `func` and either invokes
	 * `func` returning its result, if at least `arity` number of arguments have
	 * been provided, or returns a function that accepts the remaining `func`
	 * arguments, and so on. The arity of `func` may be specified if `func.length`
	 * is not sufficient.
	 *
	 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	 * may be used as a placeholder for provided arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of curried functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Function
	 * @param {Function} func The function to curry.
	 * @param {number} [arity=func.length] The arity of `func`.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Function} Returns the new curried function.
	 * @example
	 *
	 * var abc = function(a, b, c) {
	 *   return [a, b, c];
	 * };
	 *
	 * var curried = _.curry(abc);
	 *
	 * curried(1)(2)(3);
	 * // => [1, 2, 3]
	 *
	 * curried(1, 2)(3);
	 * // => [1, 2, 3]
	 *
	 * curried(1, 2, 3);
	 * // => [1, 2, 3]
	 *
	 * // Curried with placeholders.
	 * curried(1)(_, 3)(2);
	 * // => [1, 2, 3]
	 */
	function curry(func, arity, guard) {
	  arity = guard ? undefined : arity;
	  var result = createWrapper(func, CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
	  result.placeholder = curry.placeholder;
	  return result;
	}

	// Assign default placeholders.
	curry.placeholder = {};

	module.exports = curry;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseClone = __webpack_require__(77),
	    baseIteratee = __webpack_require__(135);

	/**
	 * Creates a function that invokes `func` with the arguments of the created
	 * function. If `func` is a property name, the created function returns the
	 * property value for a given element. If `func` is an array or object, the
	 * created function returns `true` for elements that contain the equivalent
	 * source properties, otherwise it returns `false`.
	 *
	 * @static
	 * @since 4.0.0
	 * @memberOf _
	 * @category Util
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @returns {Function} Returns the callback.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
	 * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, _.iteratee(['user', 'fred']));
	 * // => [{ 'user': 'fred', 'age': 40 }]
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, _.iteratee('user'));
	 * // => ['barney', 'fred']
	 *
	 * // Create custom iteratee shorthands.
	 * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
	 *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
	 *     return func.test(string);
	 *   };
	 * });
	 *
	 * _.filter(['abc', 'def'], /ef/);
	 * // => ['def']
	 */
	function iteratee(func) {
	  return baseIteratee(typeof func == 'function' ? func : baseClone(func, true));
	}

	module.exports = iteratee;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var baseMatches = __webpack_require__(136),
	    baseMatchesProperty = __webpack_require__(151),
	    identity = __webpack_require__(12),
	    isArray = __webpack_require__(43),
	    property = __webpack_require__(164);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
	    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsMatch = __webpack_require__(137),
	    getMatchData = __webpack_require__(145),
	    matchesStrictComparable = __webpack_require__(150);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function (object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(78),
	    baseIsEqual = __webpack_require__(138);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack();
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqualDeep = __webpack_require__(139),
	    isObject = __webpack_require__(18),
	    isObjectLike = __webpack_require__(44);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(78),
	    equalArrays = __webpack_require__(140),
	    equalByTag = __webpack_require__(142),
	    equalObjects = __webpack_require__(143),
	    getTag = __webpack_require__(110),
	    isArray = __webpack_require__(43),
	    isHostObject = __webpack_require__(19),
	    isTypedArray = __webpack_require__(144);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack());
	    return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack());
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack());
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arraySome = __webpack_require__(141);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function (othValue) {
	        return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	      })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	module.exports = equalArrays;

/***/ },
/* 141 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(128),
	    Uint8Array = __webpack_require__(117),
	    equalArrays = __webpack_require__(140),
	    mapToArray = __webpack_require__(122),
	    setToArray = __webpack_require__(126);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return object != +object ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == other + '';

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);

	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHas = __webpack_require__(63),
	    keys = __webpack_require__(62);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	module.exports = equalObjects;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLength = __webpack_require__(73),
	    isObjectLike = __webpack_require__(44);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isTypedArray;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isStrictComparable = __webpack_require__(146),
	    toPairs = __webpack_require__(147);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToPairs = __webpack_require__(148),
	    keys = __webpack_require__(62);

	/**
	 * Creates an array of own enumerable string keyed-value pairs for `object`
	 * which can be consumed by `_.fromPairs`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias entries
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}

	module.exports = toPairs;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(149);

	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function (key) {
	    return [key, object[key]];
	  });
	}

	module.exports = baseToPairs;

/***/ },
/* 149 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;

/***/ },
/* 150 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function (object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
	  };
	}

	module.exports = matchesStrictComparable;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqual = __webpack_require__(138),
	    get = __webpack_require__(152),
	    hasIn = __webpack_require__(161),
	    isKey = __webpack_require__(159),
	    isStrictComparable = __webpack_require__(146),
	    matchesStrictComparable = __webpack_require__(150),
	    toKey = __webpack_require__(160);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function (object) {
	    var objValue = get(object, path);
	    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(153);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var castPath = __webpack_require__(154),
	    isKey = __webpack_require__(159),
	    toKey = __webpack_require__(160);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return index && index == length ? object : undefined;
	}

	module.exports = baseGet;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(43),
	    stringToPath = __webpack_require__(155);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var memoize = __webpack_require__(156),
	    toString = __webpack_require__(157);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function (string) {
	  var result = [];
	  toString(string).replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	});

	module.exports = stringToPath;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MapCache = __webpack_require__(88);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoizing function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function memoized() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache)();
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	module.exports = memoize;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToString = __webpack_require__(158);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(128),
	    isSymbol = __webpack_require__(57);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	module.exports = baseToString;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isArray = __webpack_require__(43),
	    isSymbol = __webpack_require__(57);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
	}

	module.exports = isKey;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(57);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	module.exports = toKey;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHasIn = __webpack_require__(162),
	    hasPath = __webpack_require__(163);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;

/***/ },
/* 162 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}

	module.exports = baseHasIn;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var castPath = __webpack_require__(154),
	    isArguments = __webpack_require__(68),
	    isArray = __webpack_require__(43),
	    isIndex = __webpack_require__(51),
	    isKey = __webpack_require__(159),
	    isLength = __webpack_require__(73),
	    isString = __webpack_require__(74),
	    toKey = __webpack_require__(160);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var result,
	      index = -1,
	      length = path.length;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isString(object) || isArguments(object));
	}

	module.exports = hasPath;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(72),
	    basePropertyDeep = __webpack_require__(165),
	    isKey = __webpack_require__(159),
	    toKey = __webpack_require__(160);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(153);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function (object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFlatten = __webpack_require__(167),
	    createWrapper = __webpack_require__(10),
	    rest = __webpack_require__(169);

	/** Used to compose bitmasks for wrapper metadata. */
	var REARG_FLAG = 256;

	/**
	 * Creates a function that invokes `func` with arguments arranged according
	 * to the specified `indexes` where the argument value at the first index is
	 * provided as the first argument, the argument value at the second index is
	 * provided as the second argument, and so on.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Function
	 * @param {Function} func The function to rearrange arguments for.
	 * @param {...(number|number[])} indexes The arranged argument indexes.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var rearged = _.rearg(function(a, b, c) {
	 *   return [a, b, c];
	 * }, 2, 0, 1);
	 *
	 * rearged('b', 'c', 'a')
	 * // => ['a', 'b', 'c']
	 */
	var rearg = rest(function (func, indexes) {
	  return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes, 1));
	});

	module.exports = rearg;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayPush = __webpack_require__(109),
	    isFlattenable = __webpack_require__(168);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(68),
	    isArray = __webpack_require__(43),
	    isArrayLikeObject = __webpack_require__(69);

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArrayLikeObject(value) && (isArray(value) || isArguments(value));
	}

	module.exports = isFlattenable;

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(28),
	    toInteger = __webpack_require__(55);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? func.length - 1 : toInteger(start), 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0:
	        return func.call(this, array);
	      case 1:
	        return func.call(this, args[0], array);
	      case 2:
	        return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = rest;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(28),
	    arrayPush = __webpack_require__(109),
	    castSlice = __webpack_require__(171),
	    rest = __webpack_require__(169),
	    toInteger = __webpack_require__(55);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * create function and an array of arguments much like
	 * [`Function#apply`](http://www.ecma-international.org/ecma-262/6.0/#sec-function.prototype.apply).
	 *
	 * **Note:** This method is based on the
	 * [spread operator](https://mdn.io/spread_operator).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.2.0
	 * @category Function
	 * @param {Function} func The function to spread arguments over.
	 * @param {number} [start=0] The start position of the spread.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.spread(function(who, what) {
	 *   return who + ' says ' + what;
	 * });
	 *
	 * say(['fred', 'hello']);
	 * // => 'fred says hello'
	 *
	 * var numbers = Promise.all([
	 *   Promise.resolve(40),
	 *   Promise.resolve(36)
	 * ]);
	 *
	 * numbers.then(_.spread(function(x, y) {
	 *   return x + y;
	 * }));
	 * // => a Promise of 76
	 */
	function spread(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = start === undefined ? 0 : nativeMax(toInteger(start), 0);
	  return rest(function (args) {
	    var array = args[start],
	        otherArgs = castSlice(args, 0, start);

	    if (array) {
	      arrayPush(otherArgs, array);
	    }
	    return apply(func, this, otherArgs);
	  });
	}

	module.exports = spread;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSlice = __webpack_require__(172);

	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return !start && end >= length ? array : baseSlice(array, start, end);
	}

	module.exports = castSlice;

/***/ },
/* 172 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : end - start >>> 0;
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(149),
	    copyArray = __webpack_require__(46),
	    isArray = __webpack_require__(43),
	    isSymbol = __webpack_require__(57),
	    stringToPath = __webpack_require__(155),
	    toKey = __webpack_require__(160);

	/**
	 * Converts `value` to a property path array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Util
	 * @param {*} value The value to convert.
	 * @returns {Array} Returns the new property path array.
	 * @example
	 *
	 * _.toPath('a.b.c');
	 * // => ['a', 'b', 'c']
	 *
	 * _.toPath('a[0].b.c');
	 * // => ['a', '0', 'b', 'c']
	 *
	 * var path = ['a', 'b', 'c'],
	 *     newPath = _.toPath(path);
	 *
	 * console.log(newPath);
	 * // => ['a', 'b', 'c']
	 *
	 * console.log(path === newPath);
	 * // => false
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return arrayMap(value, toKey);
	  }
	  return isSymbol(value) ? [value] : copyArray(stringToPath(value));
	}

	module.exports = toPath;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseClone = __webpack_require__(77);

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true, true);
	}

	module.exports = cloneDeep;

/***/ },
/* 175 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  'cap': false,
	  'curry': false,
	  'fixed': false,
	  'immutable': false,
	  'rearg': false
	};

/***/ },
/* 176 */
/***/ function(module, exports) {

	module.exports = ReactBootstrap;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var React = __webpack_require__(1);

	var WidgetList = {
	  PieChart: __webpack_require__(178),
	  ColumnChart: __webpack_require__(184),
	  GeoChart: __webpack_require__(185),
	  TableView: __webpack_require__(186),
	  ScatterChart: __webpack_require__(187),
	  Gauge: __webpack_require__(188)
	};

	//below are for adding custom widgets

	/**
	 * Add a Widget
	 *
	 * @param  type      name     Name of Widget
	 * @param  Component instance Widget Component
	 */
	WidgetList.addWidget = function (name, instance) {
	  if (typeof name !== 'string') {
	    throw new Error('ReactDashboard: First parameter of addWidget must be of type string');
	  }

	  if (!React.Component instanceof instance.constructor) {
	    throw new Error('ReactDashboard: Cannot not assign "' + name + '" as an widget. Second paramter expects a React component');
	  }

	  WidgetList[name] = instance;
	};

	/**
	 * Add multiple Widgets
	 *
	 * @param  object widgets, Widgets to add. string => Component
	 */
	WidgetList.addWidgets = function (widgets) {
	  if ((typeof widgets === 'undefined' ? 'undefined' : _typeof(widgets)) !== 'object') {
	    throw new Error('ReactDashboard: First parameter of addWidgets must be of type object');
	  }

	  for (var name in widgets) {
	    WidgetList.addWidget(name, widgets[name]);
	  }
	};

	module.exports = WidgetList;

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var isArray = __webpack_require__(179);
	var isEmpty = __webpack_require__(189);
	var GoogleChartLoader = __webpack_require__(180);

	var PieChart = React.createClass({
	  displayName: 'PieChart',


	  gc_id: null,
	  chart: null,
	  gc_data: null,
	  gc_options: null,

	  getInitialState: function getInitialState() {
	    this.gc_id = "pie_chart_" + Math.floor(Math.random() * 1000000);
	    return null;
	  },

	  componentDidMount: function componentDidMount() {
	    var self = this;
	    GoogleChartLoader.init().then(function () {
	      self.drawChart();
	    });
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (GoogleChartLoader.is_loaded) {
	      this.drawChart();
	    };
	  },

	  drawChart: function drawChart() {
	    if (!this.chart) {
	      this.chart = new google.visualization.PieChart(document.getElementById(this.gc_id));
	      google.visualization.events.addListener(this.chart, 'select', this.handleSelect);
	    }

	    if (!isArray(this.props.data.data) || isEmpty(this.props.data.data)) {
	      return;
	    }

	    this.gc_data = google.visualization.arrayToDataTable(this.props.data.data);
	    this.gc_options = this.props.data.options;

	    this.chart.draw(this.gc_data, this.gc_options);
	  },

	  handleSelect: function handleSelect() {
	    var chart = this.chart;
	    var gc_data = this.gc_data;
	    var selected = chart.getSelection()[0];
	    if (selected && (selected.row || selected.row == 0)) {
	      var value = gc_data.getValue(selected.row, 0) + ", " + gc_data.getValue(selected.row, 1);
	      this.props.onClick(value);
	    }
	  },

	  render: function render() {

	    var chartWrapStyle = {};

	    var chartStyle = {
	      position: "absolute",
	      width: "100%",
	      height: "100%"
	    };

	    return React.createElement(
	      'div',
	      { style: chartWrapStyle },
	      React.createElement(
	        'div',
	        { style: chartStyle, id: this.gc_id },
	        'Sorry, Google Chart API is not properly loaded.'
	      )
	    );
	  }

	});

	PieChart.defaultProps = {
	  data: { data: [], options: {} },
	  onClick: undefined
	};

	module.exports = PieChart;

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var convert = __webpack_require__(4),
	    func = convert('isArray', __webpack_require__(43), __webpack_require__(175));

	func.placeholder = __webpack_require__(7);
	module.exports = func;

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//GoogleChartLoader Singleton
	//Based on https://github.com/RakanNimer/react-google-charts/blob/master/src/components/GoogleChartLoader.js

	var q = __webpack_require__(181);

	var GoogleChartLoader = function GoogleChartLoader() {

		this.is_loading = false;
		this.is_loaded = false;
		this.google_promise = q.defer();

		var self = this;

		this.init = function () {

			if (!window.google || !window.google.charts) {
				console.warn('Google Chart API not loaded, some widgets will not work.');
				this.google_promise.reject();
				return this.google_promise.promise;
			}

			if (this.is_loading) {
				return this.google_promise.promise;
			}

			this.is_loading = true;

			google.charts.load('current', { 'packages': ['corechart', 'table', 'gauge'] });
			google.charts.setOnLoadCallback(function () {
				self.is_loaded = true;
				self.google_promise.resolve();
			});

			return this.google_promise.promise;
		};
	};

	module.exports = new GoogleChartLoader();

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, setImmediate, module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// vim:ts=4:sts=4:sw=4:
	/*!
	 *
	 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
	 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
	 *
	 * With parts by Tyler Close
	 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
	 * at http://www.opensource.org/licenses/mit-license.html
	 * Forked at ref_send.js version: 2009-05-11
	 *
	 * With parts by Mark Miller
	 * Copyright (C) 2011 Google Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	(function (definition) {
	    "use strict";

	    // This file will function properly as a <script> tag, or a module
	    // using CommonJS and NodeJS or RequireJS module formats.  In
	    // Common/Node/RequireJS, the module exports the Q API and when
	    // executed as a simple <script>, it creates a Q global instead.

	    // Montage Require

	    if (typeof bootstrap === "function") {
	        bootstrap("promise", definition);

	        // CommonJS
	    } else if (( false ? "undefined" : _typeof(exports)) === "object" && ( false ? "undefined" : _typeof(module)) === "object") {
	            module.exports = definition();

	            // RequireJS
	        } else if (true) {
	                !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	                // SES (Secure EcmaScript)
	            } else if (typeof ses !== "undefined") {
	                    if (!ses.ok()) {
	                        return;
	                    } else {
	                        ses.makeQ = definition;
	                    }

	                    // <script>
	                } else if (typeof window !== "undefined" || typeof self !== "undefined") {
	                        // Prefer window over self for add-on scripts. Use self for
	                        // non-windowed contexts.
	                        var global = typeof window !== "undefined" ? window : self;

	                        // Get the `window` object, save the previous Q global
	                        // and initialize Q as a global.
	                        var previousQ = global.Q;
	                        global.Q = definition();

	                        // Add a noConflict function so Q can be removed from the
	                        // global namespace.
	                        global.Q.noConflict = function () {
	                            global.Q = previousQ;
	                            return this;
	                        };
	                    } else {
	                        throw new Error("This environment was not anticipated by Q. Please file a bug.");
	                    }
	})(function () {
	    "use strict";

	    var hasStacks = false;
	    try {
	        throw new Error();
	    } catch (e) {
	        hasStacks = !!e.stack;
	    }

	    // All code after this point will be filtered from stack traces reported
	    // by Q.
	    var qStartingLine = captureLine();
	    var qFileName;

	    // shims

	    // used for fallback in "allResolved"
	    var noop = function noop() {};

	    // Use the fastest possible means to execute a task in a future turn
	    // of the event loop.
	    var nextTick = function () {
	        // linked list of tasks (single, with head node)
	        var head = { task: void 0, next: null };
	        var tail = head;
	        var flushing = false;
	        var requestTick = void 0;
	        var isNodeJS = false;
	        // queue for late tasks, used by unhandled rejection tracking
	        var laterQueue = [];

	        function flush() {
	            /* jshint loopfunc: true */
	            var task, domain;

	            while (head.next) {
	                head = head.next;
	                task = head.task;
	                head.task = void 0;
	                domain = head.domain;

	                if (domain) {
	                    head.domain = void 0;
	                    domain.enter();
	                }
	                runSingle(task, domain);
	            }
	            while (laterQueue.length) {
	                task = laterQueue.pop();
	                runSingle(task);
	            }
	            flushing = false;
	        }
	        // runs a single function in the async queue
	        function runSingle(task, domain) {
	            try {
	                task();
	            } catch (e) {
	                if (isNodeJS) {
	                    // In node, uncaught exceptions are considered fatal errors.
	                    // Re-throw them synchronously to interrupt flushing!

	                    // Ensure continuation if the uncaught exception is suppressed
	                    // listening "uncaughtException" events (as domains does).
	                    // Continue in next event to avoid tick recursion.
	                    if (domain) {
	                        domain.exit();
	                    }
	                    setTimeout(flush, 0);
	                    if (domain) {
	                        domain.enter();
	                    }

	                    throw e;
	                } else {
	                    // In browsers, uncaught exceptions are not fatal.
	                    // Re-throw them asynchronously to avoid slow-downs.
	                    setTimeout(function () {
	                        throw e;
	                    }, 0);
	                }
	            }

	            if (domain) {
	                domain.exit();
	            }
	        }

	        nextTick = function nextTick(task) {
	            tail = tail.next = {
	                task: task,
	                domain: isNodeJS && process.domain,
	                next: null
	            };

	            if (!flushing) {
	                flushing = true;
	                requestTick();
	            }
	        };

	        if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.toString() === "[object process]" && process.nextTick) {
	            // Ensure Q is in a real Node environment, with a `process.nextTick`.
	            // To see through fake Node environments:
	            // * Mocha test runner - exposes a `process` global without a `nextTick`
	            // * Browserify - exposes a `process.nexTick` function that uses
	            //   `setTimeout`. In this case `setImmediate` is preferred because
	            //    it is faster. Browserify's `process.toString()` yields
	            //   "[object Object]", while in a real Node environment
	            //   `process.nextTick()` yields "[object process]".
	            isNodeJS = true;

	            requestTick = function requestTick() {
	                process.nextTick(flush);
	            };
	        } else if (typeof setImmediate === "function") {
	            // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
	            if (typeof window !== "undefined") {
	                requestTick = setImmediate.bind(window, flush);
	            } else {
	                requestTick = function requestTick() {
	                    setImmediate(flush);
	                };
	            }
	        } else if (typeof MessageChannel !== "undefined") {
	            // modern browsers
	            // http://www.nonblocking.io/2011/06/windownexttick.html
	            var channel = new MessageChannel();
	            // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
	            // working message ports the first time a page loads.
	            channel.port1.onmessage = function () {
	                requestTick = requestPortTick;
	                channel.port1.onmessage = flush;
	                flush();
	            };
	            var requestPortTick = function requestPortTick() {
	                // Opera requires us to provide a message payload, regardless of
	                // whether we use it.
	                channel.port2.postMessage(0);
	            };
	            requestTick = function requestTick() {
	                setTimeout(flush, 0);
	                requestPortTick();
	            };
	        } else {
	            // old browsers
	            requestTick = function requestTick() {
	                setTimeout(flush, 0);
	            };
	        }
	        // runs a task after all other tasks have been run
	        // this is useful for unhandled rejection tracking that needs to happen
	        // after all `then`d tasks have been run.
	        nextTick.runAfter = function (task) {
	            laterQueue.push(task);
	            if (!flushing) {
	                flushing = true;
	                requestTick();
	            }
	        };
	        return nextTick;
	    }();

	    // Attempt to make generics safe in the face of downstream
	    // modifications.
	    // There is no situation where this is necessary.
	    // If you need a security guarantee, these primordials need to be
	    // deeply frozen anyway, and if you don’t need a security guarantee,
	    // this is just plain paranoid.
	    // However, this **might** have the nice side-effect of reducing the size of
	    // the minified code by reducing x.call() to merely x()
	    // See Mark Miller’s explanation of what this does.
	    // http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
	    var call = Function.call;
	    function uncurryThis(f) {
	        return function () {
	            return call.apply(f, arguments);
	        };
	    }
	    // This is equivalent, but slower:
	    // uncurryThis = Function_bind.bind(Function_bind.call);
	    // http://jsperf.com/uncurrythis

	    var array_slice = uncurryThis(Array.prototype.slice);

	    var array_reduce = uncurryThis(Array.prototype.reduce || function (callback, basis) {
	        var index = 0,
	            length = this.length;
	        // concerning the initial value, if one is not provided
	        if (arguments.length === 1) {
	            // seek to the first value in the array, accounting
	            // for the possibility that is is a sparse array
	            do {
	                if (index in this) {
	                    basis = this[index++];
	                    break;
	                }
	                if (++index >= length) {
	                    throw new TypeError();
	                }
	            } while (1);
	        }
	        // reduce
	        for (; index < length; index++) {
	            // account for the possibility that the array is sparse
	            if (index in this) {
	                basis = callback(basis, this[index], index);
	            }
	        }
	        return basis;
	    });

	    var array_indexOf = uncurryThis(Array.prototype.indexOf || function (value) {
	        // not a very good shim, but good enough for our one use of it
	        for (var i = 0; i < this.length; i++) {
	            if (this[i] === value) {
	                return i;
	            }
	        }
	        return -1;
	    });

	    var array_map = uncurryThis(Array.prototype.map || function (callback, thisp) {
	        var self = this;
	        var collect = [];
	        array_reduce(self, function (undefined, value, index) {
	            collect.push(callback.call(thisp, value, index, self));
	        }, void 0);
	        return collect;
	    });

	    var object_create = Object.create || function (prototype) {
	        function Type() {}
	        Type.prototype = prototype;
	        return new Type();
	    };

	    var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

	    var object_keys = Object.keys || function (object) {
	        var keys = [];
	        for (var key in object) {
	            if (object_hasOwnProperty(object, key)) {
	                keys.push(key);
	            }
	        }
	        return keys;
	    };

	    var object_toString = uncurryThis(Object.prototype.toString);

	    function isObject(value) {
	        return value === Object(value);
	    }

	    // generator related shims

	    // FIXME: Remove this function once ES6 generators are in SpiderMonkey.
	    function isStopIteration(exception) {
	        return object_toString(exception) === "[object StopIteration]" || exception instanceof QReturnValue;
	    }

	    // FIXME: Remove this helper and Q.return once ES6 generators are in
	    // SpiderMonkey.
	    var QReturnValue;
	    if (typeof ReturnValue !== "undefined") {
	        QReturnValue = ReturnValue;
	    } else {
	        QReturnValue = function QReturnValue(value) {
	            this.value = value;
	        };
	    }

	    // long stack traces

	    var STACK_JUMP_SEPARATOR = "From previous event:";

	    function makeStackTraceLong(error, promise) {
	        // If possible, transform the error stack trace by removing Node and Q
	        // cruft, then concatenating with the stack trace of `promise`. See #57.
	        if (hasStacks && promise.stack && (typeof error === "undefined" ? "undefined" : _typeof(error)) === "object" && error !== null && error.stack && error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
	            var stacks = [];
	            for (var p = promise; !!p; p = p.source) {
	                if (p.stack) {
	                    stacks.unshift(p.stack);
	                }
	            }
	            stacks.unshift(error.stack);

	            var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
	            error.stack = filterStackString(concatedStacks);
	        }
	    }

	    function filterStackString(stackString) {
	        var lines = stackString.split("\n");
	        var desiredLines = [];
	        for (var i = 0; i < lines.length; ++i) {
	            var line = lines[i];

	            if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
	                desiredLines.push(line);
	            }
	        }
	        return desiredLines.join("\n");
	    }

	    function isNodeFrame(stackLine) {
	        return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
	    }

	    function getFileNameAndLineNumber(stackLine) {
	        // Named functions: "at functionName (filename:lineNumber:columnNumber)"
	        // In IE10 function name can have spaces ("Anonymous function") O_o
	        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
	        if (attempt1) {
	            return [attempt1[1], Number(attempt1[2])];
	        }

	        // Anonymous functions: "at filename:lineNumber:columnNumber"
	        var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
	        if (attempt2) {
	            return [attempt2[1], Number(attempt2[2])];
	        }

	        // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
	        var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
	        if (attempt3) {
	            return [attempt3[1], Number(attempt3[2])];
	        }
	    }

	    function isInternalFrame(stackLine) {
	        var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

	        if (!fileNameAndLineNumber) {
	            return false;
	        }

	        var fileName = fileNameAndLineNumber[0];
	        var lineNumber = fileNameAndLineNumber[1];

	        return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
	    }

	    // discover own file name and line number range for filtering stack
	    // traces
	    function captureLine() {
	        if (!hasStacks) {
	            return;
	        }

	        try {
	            throw new Error();
	        } catch (e) {
	            var lines = e.stack.split("\n");
	            var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
	            var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
	            if (!fileNameAndLineNumber) {
	                return;
	            }

	            qFileName = fileNameAndLineNumber[0];
	            return fileNameAndLineNumber[1];
	        }
	    }

	    function deprecate(callback, name, alternative) {
	        return function () {
	            if (typeof console !== "undefined" && typeof console.warn === "function") {
	                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
	            }
	            return callback.apply(callback, arguments);
	        };
	    }

	    // end of shims
	    // beginning of real work

	    /**
	     * Constructs a promise for an immediate reference, passes promises through, or
	     * coerces promises from different systems.
	     * @param value immediate reference or promise
	     */
	    function Q(value) {
	        // If the object is already a Promise, return it directly.  This enables
	        // the resolve function to both be used to created references from objects,
	        // but to tolerably coerce non-promises to promises.
	        if (value instanceof Promise) {
	            return value;
	        }

	        // assimilate thenables
	        if (isPromiseAlike(value)) {
	            return coerce(value);
	        } else {
	            return fulfill(value);
	        }
	    }
	    Q.resolve = Q;

	    /**
	     * Performs a task in a future turn of the event loop.
	     * @param {Function} task
	     */
	    Q.nextTick = nextTick;

	    /**
	     * Controls whether or not long stack traces will be on
	     */
	    Q.longStackSupport = false;

	    // enable long stacks if Q_DEBUG is set
	    if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process && process.env && process.env.Q_DEBUG) {
	        Q.longStackSupport = true;
	    }

	    /**
	     * Constructs a {promise, resolve, reject} object.
	     *
	     * `resolve` is a callback to invoke with a more resolved value for the
	     * promise. To fulfill the promise, invoke `resolve` with any value that is
	     * not a thenable. To reject the promise, invoke `resolve` with a rejected
	     * thenable, or invoke `reject` with the reason directly. To resolve the
	     * promise to another thenable, thus putting it in the same state, invoke
	     * `resolve` with that other thenable.
	     */
	    Q.defer = defer;
	    function defer() {
	        // if "messages" is an "Array", that indicates that the promise has not yet
	        // been resolved.  If it is "undefined", it has been resolved.  Each
	        // element of the messages array is itself an array of complete arguments to
	        // forward to the resolved promise.  We coerce the resolution value to a
	        // promise using the `resolve` function because it handles both fully
	        // non-thenable values and other thenables gracefully.
	        var messages = [],
	            progressListeners = [],
	            resolvedPromise;

	        var deferred = object_create(defer.prototype);
	        var promise = object_create(Promise.prototype);

	        promise.promiseDispatch = function (resolve, op, operands) {
	            var args = array_slice(arguments);
	            if (messages) {
	                messages.push(args);
	                if (op === "when" && operands[1]) {
	                    // progress operand
	                    progressListeners.push(operands[1]);
	                }
	            } else {
	                Q.nextTick(function () {
	                    resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
	                });
	            }
	        };

	        // XXX deprecated
	        promise.valueOf = function () {
	            if (messages) {
	                return promise;
	            }
	            var nearerValue = nearer(resolvedPromise);
	            if (isPromise(nearerValue)) {
	                resolvedPromise = nearerValue; // shorten chain
	            }
	            return nearerValue;
	        };

	        promise.inspect = function () {
	            if (!resolvedPromise) {
	                return { state: "pending" };
	            }
	            return resolvedPromise.inspect();
	        };

	        if (Q.longStackSupport && hasStacks) {
	            try {
	                throw new Error();
	            } catch (e) {
	                // NOTE: don't try to use `Error.captureStackTrace` or transfer the
	                // accessor around; that causes memory leaks as per GH-111. Just
	                // reify the stack trace as a string ASAP.
	                //
	                // At the same time, cut off the first line; it's always just
	                // "[object Promise]\n", as per the `toString`.
	                promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
	            }
	        }

	        // NOTE: we do the checks for `resolvedPromise` in each method, instead of
	        // consolidating them into `become`, since otherwise we'd create new
	        // promises with the lines `become(whatever(value))`. See e.g. GH-252.

	        function become(newPromise) {
	            resolvedPromise = newPromise;
	            promise.source = newPromise;

	            array_reduce(messages, function (undefined, message) {
	                Q.nextTick(function () {
	                    newPromise.promiseDispatch.apply(newPromise, message);
	                });
	            }, void 0);

	            messages = void 0;
	            progressListeners = void 0;
	        }

	        deferred.promise = promise;
	        deferred.resolve = function (value) {
	            if (resolvedPromise) {
	                return;
	            }

	            become(Q(value));
	        };

	        deferred.fulfill = function (value) {
	            if (resolvedPromise) {
	                return;
	            }

	            become(fulfill(value));
	        };
	        deferred.reject = function (reason) {
	            if (resolvedPromise) {
	                return;
	            }

	            become(reject(reason));
	        };
	        deferred.notify = function (progress) {
	            if (resolvedPromise) {
	                return;
	            }

	            array_reduce(progressListeners, function (undefined, progressListener) {
	                Q.nextTick(function () {
	                    progressListener(progress);
	                });
	            }, void 0);
	        };

	        return deferred;
	    }

	    /**
	     * Creates a Node-style callback that will resolve or reject the deferred
	     * promise.
	     * @returns a nodeback
	     */
	    defer.prototype.makeNodeResolver = function () {
	        var self = this;
	        return function (error, value) {
	            if (error) {
	                self.reject(error);
	            } else if (arguments.length > 2) {
	                self.resolve(array_slice(arguments, 1));
	            } else {
	                self.resolve(value);
	            }
	        };
	    };

	    /**
	     * @param resolver {Function} a function that returns nothing and accepts
	     * the resolve, reject, and notify functions for a deferred.
	     * @returns a promise that may be resolved with the given resolve and reject
	     * functions, or rejected by a thrown exception in resolver
	     */
	    Q.Promise = promise; // ES6
	    Q.promise = promise;
	    function promise(resolver) {
	        if (typeof resolver !== "function") {
	            throw new TypeError("resolver must be a function.");
	        }
	        var deferred = defer();
	        try {
	            resolver(deferred.resolve, deferred.reject, deferred.notify);
	        } catch (reason) {
	            deferred.reject(reason);
	        }
	        return deferred.promise;
	    }

	    promise.race = race; // ES6
	    promise.all = all; // ES6
	    promise.reject = reject; // ES6
	    promise.resolve = Q; // ES6

	    // XXX experimental.  This method is a way to denote that a local value is
	    // serializable and should be immediately dispatched to a remote upon request,
	    // instead of passing a reference.
	    Q.passByCopy = function (object) {
	        //freeze(object);
	        //passByCopies.set(object, true);
	        return object;
	    };

	    Promise.prototype.passByCopy = function () {
	        //freeze(object);
	        //passByCopies.set(object, true);
	        return this;
	    };

	    /**
	     * If two promises eventually fulfill to the same value, promises that value,
	     * but otherwise rejects.
	     * @param x {Any*}
	     * @param y {Any*}
	     * @returns {Any*} a promise for x and y if they are the same, but a rejection
	     * otherwise.
	     *
	     */
	    Q.join = function (x, y) {
	        return Q(x).join(y);
	    };

	    Promise.prototype.join = function (that) {
	        return Q([this, that]).spread(function (x, y) {
	            if (x === y) {
	                // TODO: "===" should be Object.is or equiv
	                return x;
	            } else {
	                throw new Error("Can't join: not the same: " + x + " " + y);
	            }
	        });
	    };

	    /**
	     * Returns a promise for the first of an array of promises to become settled.
	     * @param answers {Array[Any*]} promises to race
	     * @returns {Any*} the first promise to be settled
	     */
	    Q.race = race;
	    function race(answerPs) {
	        return promise(function (resolve, reject) {
	            // Switch to this once we can assume at least ES5
	            // answerPs.forEach(function (answerP) {
	            //     Q(answerP).then(resolve, reject);
	            // });
	            // Use this in the meantime
	            for (var i = 0, len = answerPs.length; i < len; i++) {
	                Q(answerPs[i]).then(resolve, reject);
	            }
	        });
	    }

	    Promise.prototype.race = function () {
	        return this.then(Q.race);
	    };

	    /**
	     * Constructs a Promise with a promise descriptor object and optional fallback
	     * function.  The descriptor contains methods like when(rejected), get(name),
	     * set(name, value), post(name, args), and delete(name), which all
	     * return either a value, a promise for a value, or a rejection.  The fallback
	     * accepts the operation name, a resolver, and any further arguments that would
	     * have been forwarded to the appropriate method above had a method been
	     * provided with the proper name.  The API makes no guarantees about the nature
	     * of the returned object, apart from that it is usable whereever promises are
	     * bought and sold.
	     */
	    Q.makePromise = Promise;
	    function Promise(descriptor, fallback, inspect) {
	        if (fallback === void 0) {
	            fallback = function fallback(op) {
	                return reject(new Error("Promise does not support operation: " + op));
	            };
	        }
	        if (inspect === void 0) {
	            inspect = function inspect() {
	                return { state: "unknown" };
	            };
	        }

	        var promise = object_create(Promise.prototype);

	        promise.promiseDispatch = function (resolve, op, args) {
	            var result;
	            try {
	                if (descriptor[op]) {
	                    result = descriptor[op].apply(promise, args);
	                } else {
	                    result = fallback.call(promise, op, args);
	                }
	            } catch (exception) {
	                result = reject(exception);
	            }
	            if (resolve) {
	                resolve(result);
	            }
	        };

	        promise.inspect = inspect;

	        // XXX deprecated `valueOf` and `exception` support
	        if (inspect) {
	            var inspected = inspect();
	            if (inspected.state === "rejected") {
	                promise.exception = inspected.reason;
	            }

	            promise.valueOf = function () {
	                var inspected = inspect();
	                if (inspected.state === "pending" || inspected.state === "rejected") {
	                    return promise;
	                }
	                return inspected.value;
	            };
	        }

	        return promise;
	    }

	    Promise.prototype.toString = function () {
	        return "[object Promise]";
	    };

	    Promise.prototype.then = function (fulfilled, rejected, progressed) {
	        var self = this;
	        var deferred = defer();
	        var done = false; // ensure the untrusted promise makes at most a
	        // single call to one of the callbacks

	        function _fulfilled(value) {
	            try {
	                return typeof fulfilled === "function" ? fulfilled(value) : value;
	            } catch (exception) {
	                return reject(exception);
	            }
	        }

	        function _rejected(exception) {
	            if (typeof rejected === "function") {
	                makeStackTraceLong(exception, self);
	                try {
	                    return rejected(exception);
	                } catch (newException) {
	                    return reject(newException);
	                }
	            }
	            return reject(exception);
	        }

	        function _progressed(value) {
	            return typeof progressed === "function" ? progressed(value) : value;
	        }

	        Q.nextTick(function () {
	            self.promiseDispatch(function (value) {
	                if (done) {
	                    return;
	                }
	                done = true;

	                deferred.resolve(_fulfilled(value));
	            }, "when", [function (exception) {
	                if (done) {
	                    return;
	                }
	                done = true;

	                deferred.resolve(_rejected(exception));
	            }]);
	        });

	        // Progress propagator need to be attached in the current tick.
	        self.promiseDispatch(void 0, "when", [void 0, function (value) {
	            var newValue;
	            var threw = false;
	            try {
	                newValue = _progressed(value);
	            } catch (e) {
	                threw = true;
	                if (Q.onerror) {
	                    Q.onerror(e);
	                } else {
	                    throw e;
	                }
	            }

	            if (!threw) {
	                deferred.notify(newValue);
	            }
	        }]);

	        return deferred.promise;
	    };

	    Q.tap = function (promise, callback) {
	        return Q(promise).tap(callback);
	    };

	    /**
	     * Works almost like "finally", but not called for rejections.
	     * Original resolution value is passed through callback unaffected.
	     * Callback may return a promise that will be awaited for.
	     * @param {Function} callback
	     * @returns {Q.Promise}
	     * @example
	     * doSomething()
	     *   .then(...)
	     *   .tap(console.log)
	     *   .then(...);
	     */
	    Promise.prototype.tap = function (callback) {
	        callback = Q(callback);

	        return this.then(function (value) {
	            return callback.fcall(value).thenResolve(value);
	        });
	    };

	    /**
	     * Registers an observer on a promise.
	     *
	     * Guarantees:
	     *
	     * 1. that fulfilled and rejected will be called only once.
	     * 2. that either the fulfilled callback or the rejected callback will be
	     *    called, but not both.
	     * 3. that fulfilled and rejected will not be called in this turn.
	     *
	     * @param value      promise or immediate reference to observe
	     * @param fulfilled  function to be called with the fulfilled value
	     * @param rejected   function to be called with the rejection exception
	     * @param progressed function to be called on any progress notifications
	     * @return promise for the return value from the invoked callback
	     */
	    Q.when = when;
	    function when(value, fulfilled, rejected, progressed) {
	        return Q(value).then(fulfilled, rejected, progressed);
	    }

	    Promise.prototype.thenResolve = function (value) {
	        return this.then(function () {
	            return value;
	        });
	    };

	    Q.thenResolve = function (promise, value) {
	        return Q(promise).thenResolve(value);
	    };

	    Promise.prototype.thenReject = function (reason) {
	        return this.then(function () {
	            throw reason;
	        });
	    };

	    Q.thenReject = function (promise, reason) {
	        return Q(promise).thenReject(reason);
	    };

	    /**
	     * If an object is not a promise, it is as "near" as possible.
	     * If a promise is rejected, it is as "near" as possible too.
	     * If it’s a fulfilled promise, the fulfillment value is nearer.
	     * If it’s a deferred promise and the deferred has been resolved, the
	     * resolution is "nearer".
	     * @param object
	     * @returns most resolved (nearest) form of the object
	     */

	    // XXX should we re-do this?
	    Q.nearer = nearer;
	    function nearer(value) {
	        if (isPromise(value)) {
	            var inspected = value.inspect();
	            if (inspected.state === "fulfilled") {
	                return inspected.value;
	            }
	        }
	        return value;
	    }

	    /**
	     * @returns whether the given object is a promise.
	     * Otherwise it is a fulfilled value.
	     */
	    Q.isPromise = isPromise;
	    function isPromise(object) {
	        return object instanceof Promise;
	    }

	    Q.isPromiseAlike = isPromiseAlike;
	    function isPromiseAlike(object) {
	        return isObject(object) && typeof object.then === "function";
	    }

	    /**
	     * @returns whether the given object is a pending promise, meaning not
	     * fulfilled or rejected.
	     */
	    Q.isPending = isPending;
	    function isPending(object) {
	        return isPromise(object) && object.inspect().state === "pending";
	    }

	    Promise.prototype.isPending = function () {
	        return this.inspect().state === "pending";
	    };

	    /**
	     * @returns whether the given object is a value or fulfilled
	     * promise.
	     */
	    Q.isFulfilled = isFulfilled;
	    function isFulfilled(object) {
	        return !isPromise(object) || object.inspect().state === "fulfilled";
	    }

	    Promise.prototype.isFulfilled = function () {
	        return this.inspect().state === "fulfilled";
	    };

	    /**
	     * @returns whether the given object is a rejected promise.
	     */
	    Q.isRejected = isRejected;
	    function isRejected(object) {
	        return isPromise(object) && object.inspect().state === "rejected";
	    }

	    Promise.prototype.isRejected = function () {
	        return this.inspect().state === "rejected";
	    };

	    //// BEGIN UNHANDLED REJECTION TRACKING

	    // This promise library consumes exceptions thrown in handlers so they can be
	    // handled by a subsequent promise.  The exceptions get added to this array when
	    // they are created, and removed when they are handled.  Note that in ES6 or
	    // shimmed environments, this would naturally be a `Set`.
	    var unhandledReasons = [];
	    var unhandledRejections = [];
	    var reportedUnhandledRejections = [];
	    var trackUnhandledRejections = true;

	    function resetUnhandledRejections() {
	        unhandledReasons.length = 0;
	        unhandledRejections.length = 0;

	        if (!trackUnhandledRejections) {
	            trackUnhandledRejections = true;
	        }
	    }

	    function trackRejection(promise, reason) {
	        if (!trackUnhandledRejections) {
	            return;
	        }
	        if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && typeof process.emit === "function") {
	            Q.nextTick.runAfter(function () {
	                if (array_indexOf(unhandledRejections, promise) !== -1) {
	                    process.emit("unhandledRejection", reason, promise);
	                    reportedUnhandledRejections.push(promise);
	                }
	            });
	        }

	        unhandledRejections.push(promise);
	        if (reason && typeof reason.stack !== "undefined") {
	            unhandledReasons.push(reason.stack);
	        } else {
	            unhandledReasons.push("(no stack) " + reason);
	        }
	    }

	    function untrackRejection(promise) {
	        if (!trackUnhandledRejections) {
	            return;
	        }

	        var at = array_indexOf(unhandledRejections, promise);
	        if (at !== -1) {
	            if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && typeof process.emit === "function") {
	                Q.nextTick.runAfter(function () {
	                    var atReport = array_indexOf(reportedUnhandledRejections, promise);
	                    if (atReport !== -1) {
	                        process.emit("rejectionHandled", unhandledReasons[at], promise);
	                        reportedUnhandledRejections.splice(atReport, 1);
	                    }
	                });
	            }
	            unhandledRejections.splice(at, 1);
	            unhandledReasons.splice(at, 1);
	        }
	    }

	    Q.resetUnhandledRejections = resetUnhandledRejections;

	    Q.getUnhandledReasons = function () {
	        // Make a copy so that consumers can't interfere with our internal state.
	        return unhandledReasons.slice();
	    };

	    Q.stopUnhandledRejectionTracking = function () {
	        resetUnhandledRejections();
	        trackUnhandledRejections = false;
	    };

	    resetUnhandledRejections();

	    //// END UNHANDLED REJECTION TRACKING

	    /**
	     * Constructs a rejected promise.
	     * @param reason value describing the failure
	     */
	    Q.reject = reject;
	    function reject(reason) {
	        var rejection = Promise({
	            "when": function when(rejected) {
	                // note that the error has been handled
	                if (rejected) {
	                    untrackRejection(this);
	                }
	                return rejected ? rejected(reason) : this;
	            }
	        }, function fallback() {
	            return this;
	        }, function inspect() {
	            return { state: "rejected", reason: reason };
	        });

	        // Note that the reason has not been handled.
	        trackRejection(rejection, reason);

	        return rejection;
	    }

	    /**
	     * Constructs a fulfilled promise for an immediate reference.
	     * @param value immediate reference
	     */
	    Q.fulfill = fulfill;
	    function fulfill(value) {
	        return Promise({
	            "when": function when() {
	                return value;
	            },
	            "get": function get(name) {
	                return value[name];
	            },
	            "set": function set(name, rhs) {
	                value[name] = rhs;
	            },
	            "delete": function _delete(name) {
	                delete value[name];
	            },
	            "post": function post(name, args) {
	                // Mark Miller proposes that post with no name should apply a
	                // promised function.
	                if (name === null || name === void 0) {
	                    return value.apply(void 0, args);
	                } else {
	                    return value[name].apply(value, args);
	                }
	            },
	            "apply": function apply(thisp, args) {
	                return value.apply(thisp, args);
	            },
	            "keys": function keys() {
	                return object_keys(value);
	            }
	        }, void 0, function inspect() {
	            return { state: "fulfilled", value: value };
	        });
	    }

	    /**
	     * Converts thenables to Q promises.
	     * @param promise thenable promise
	     * @returns a Q promise
	     */
	    function coerce(promise) {
	        var deferred = defer();
	        Q.nextTick(function () {
	            try {
	                promise.then(deferred.resolve, deferred.reject, deferred.notify);
	            } catch (exception) {
	                deferred.reject(exception);
	            }
	        });
	        return deferred.promise;
	    }

	    /**
	     * Annotates an object such that it will never be
	     * transferred away from this process over any promise
	     * communication channel.
	     * @param object
	     * @returns promise a wrapping of that object that
	     * additionally responds to the "isDef" message
	     * without a rejection.
	     */
	    Q.master = master;
	    function master(object) {
	        return Promise({
	            "isDef": function isDef() {}
	        }, function fallback(op, args) {
	            return dispatch(object, op, args);
	        }, function () {
	            return Q(object).inspect();
	        });
	    }

	    /**
	     * Spreads the values of a promised array of arguments into the
	     * fulfillment callback.
	     * @param fulfilled callback that receives variadic arguments from the
	     * promised array
	     * @param rejected callback that receives the exception if the promise
	     * is rejected.
	     * @returns a promise for the return value or thrown exception of
	     * either callback.
	     */
	    Q.spread = spread;
	    function spread(value, fulfilled, rejected) {
	        return Q(value).spread(fulfilled, rejected);
	    }

	    Promise.prototype.spread = function (fulfilled, rejected) {
	        return this.all().then(function (array) {
	            return fulfilled.apply(void 0, array);
	        }, rejected);
	    };

	    /**
	     * The async function is a decorator for generator functions, turning
	     * them into asynchronous generators.  Although generators are only part
	     * of the newest ECMAScript 6 drafts, this code does not cause syntax
	     * errors in older engines.  This code should continue to work and will
	     * in fact improve over time as the language improves.
	     *
	     * ES6 generators are currently part of V8 version 3.19 with the
	     * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
	     * for longer, but under an older Python-inspired form.  This function
	     * works on both kinds of generators.
	     *
	     * Decorates a generator function such that:
	     *  - it may yield promises
	     *  - execution will continue when that promise is fulfilled
	     *  - the value of the yield expression will be the fulfilled value
	     *  - it returns a promise for the return value (when the generator
	     *    stops iterating)
	     *  - the decorated function returns a promise for the return value
	     *    of the generator or the first rejected promise among those
	     *    yielded.
	     *  - if an error is thrown in the generator, it propagates through
	     *    every following yield until it is caught, or until it escapes
	     *    the generator function altogether, and is translated into a
	     *    rejection for the promise returned by the decorated generator.
	     */
	    Q.async = async;
	    function async(makeGenerator) {
	        return function () {
	            // when verb is "send", arg is a value
	            // when verb is "throw", arg is an exception
	            function continuer(verb, arg) {
	                var result;

	                // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
	                // engine that has a deployed base of browsers that support generators.
	                // However, SM's generators use the Python-inspired semantics of
	                // outdated ES6 drafts.  We would like to support ES6, but we'd also
	                // like to make it possible to use generators in deployed browsers, so
	                // we also support Python-style generators.  At some point we can remove
	                // this block.

	                if (typeof StopIteration === "undefined") {
	                    // ES6 Generators
	                    try {
	                        result = generator[verb](arg);
	                    } catch (exception) {
	                        return reject(exception);
	                    }
	                    if (result.done) {
	                        return Q(result.value);
	                    } else {
	                        return when(result.value, callback, errback);
	                    }
	                } else {
	                    // SpiderMonkey Generators
	                    // FIXME: Remove this case when SM does ES6 generators.
	                    try {
	                        result = generator[verb](arg);
	                    } catch (exception) {
	                        if (isStopIteration(exception)) {
	                            return Q(exception.value);
	                        } else {
	                            return reject(exception);
	                        }
	                    }
	                    return when(result, callback, errback);
	                }
	            }
	            var generator = makeGenerator.apply(this, arguments);
	            var callback = continuer.bind(continuer, "next");
	            var errback = continuer.bind(continuer, "throw");
	            return callback();
	        };
	    }

	    /**
	     * The spawn function is a small wrapper around async that immediately
	     * calls the generator and also ends the promise chain, so that any
	     * unhandled errors are thrown instead of forwarded to the error
	     * handler. This is useful because it's extremely common to run
	     * generators at the top-level to work with libraries.
	     */
	    Q.spawn = spawn;
	    function spawn(makeGenerator) {
	        Q.done(Q.async(makeGenerator)());
	    }

	    // FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
	    /**
	     * Throws a ReturnValue exception to stop an asynchronous generator.
	     *
	     * This interface is a stop-gap measure to support generator return
	     * values in older Firefox/SpiderMonkey.  In browsers that support ES6
	     * generators like Chromium 29, just use "return" in your generator
	     * functions.
	     *
	     * @param value the return value for the surrounding generator
	     * @throws ReturnValue exception with the value.
	     * @example
	     * // ES6 style
	     * Q.async(function* () {
	     *      var foo = yield getFooPromise();
	     *      var bar = yield getBarPromise();
	     *      return foo + bar;
	     * })
	     * // Older SpiderMonkey style
	     * Q.async(function () {
	     *      var foo = yield getFooPromise();
	     *      var bar = yield getBarPromise();
	     *      Q.return(foo + bar);
	     * })
	     */
	    Q["return"] = _return;
	    function _return(value) {
	        throw new QReturnValue(value);
	    }

	    /**
	     * The promised function decorator ensures that any promise arguments
	     * are settled and passed as values (`this` is also settled and passed
	     * as a value).  It will also ensure that the result of a function is
	     * always a promise.
	     *
	     * @example
	     * var add = Q.promised(function (a, b) {
	     *     return a + b;
	     * });
	     * add(Q(a), Q(B));
	     *
	     * @param {function} callback The function to decorate
	     * @returns {function} a function that has been decorated.
	     */
	    Q.promised = promised;
	    function promised(callback) {
	        return function () {
	            return spread([this, all(arguments)], function (self, args) {
	                return callback.apply(self, args);
	            });
	        };
	    }

	    /**
	     * sends a message to a value in a future turn
	     * @param object* the recipient
	     * @param op the name of the message operation, e.g., "when",
	     * @param args further arguments to be forwarded to the operation
	     * @returns result {Promise} a promise for the result of the operation
	     */
	    Q.dispatch = dispatch;
	    function dispatch(object, op, args) {
	        return Q(object).dispatch(op, args);
	    }

	    Promise.prototype.dispatch = function (op, args) {
	        var self = this;
	        var deferred = defer();
	        Q.nextTick(function () {
	            self.promiseDispatch(deferred.resolve, op, args);
	        });
	        return deferred.promise;
	    };

	    /**
	     * Gets the value of a property in a future turn.
	     * @param object    promise or immediate reference for target object
	     * @param name      name of property to get
	     * @return promise for the property value
	     */
	    Q.get = function (object, key) {
	        return Q(object).dispatch("get", [key]);
	    };

	    Promise.prototype.get = function (key) {
	        return this.dispatch("get", [key]);
	    };

	    /**
	     * Sets the value of a property in a future turn.
	     * @param object    promise or immediate reference for object object
	     * @param name      name of property to set
	     * @param value     new value of property
	     * @return promise for the return value
	     */
	    Q.set = function (object, key, value) {
	        return Q(object).dispatch("set", [key, value]);
	    };

	    Promise.prototype.set = function (key, value) {
	        return this.dispatch("set", [key, value]);
	    };

	    /**
	     * Deletes a property in a future turn.
	     * @param object    promise or immediate reference for target object
	     * @param name      name of property to delete
	     * @return promise for the return value
	     */
	    Q.del = // XXX legacy
	    Q["delete"] = function (object, key) {
	        return Q(object).dispatch("delete", [key]);
	    };

	    Promise.prototype.del = // XXX legacy
	    Promise.prototype["delete"] = function (key) {
	        return this.dispatch("delete", [key]);
	    };

	    /**
	     * Invokes a method in a future turn.
	     * @param object    promise or immediate reference for target object
	     * @param name      name of method to invoke
	     * @param value     a value to post, typically an array of
	     *                  invocation arguments for promises that
	     *                  are ultimately backed with `resolve` values,
	     *                  as opposed to those backed with URLs
	     *                  wherein the posted value can be any
	     *                  JSON serializable object.
	     * @return promise for the return value
	     */
	    // bound locally because it is used by other methods
	    Q.mapply = // XXX As proposed by "Redsandro"
	    Q.post = function (object, name, args) {
	        return Q(object).dispatch("post", [name, args]);
	    };

	    Promise.prototype.mapply = // XXX As proposed by "Redsandro"
	    Promise.prototype.post = function (name, args) {
	        return this.dispatch("post", [name, args]);
	    };

	    /**
	     * Invokes a method in a future turn.
	     * @param object    promise or immediate reference for target object
	     * @param name      name of method to invoke
	     * @param ...args   array of invocation arguments
	     * @return promise for the return value
	     */
	    Q.send = // XXX Mark Miller's proposed parlance
	    Q.mcall = // XXX As proposed by "Redsandro"
	    Q.invoke = function (object, name /*...args*/) {
	        return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
	    };

	    Promise.prototype.send = // XXX Mark Miller's proposed parlance
	    Promise.prototype.mcall = // XXX As proposed by "Redsandro"
	    Promise.prototype.invoke = function (name /*...args*/) {
	        return this.dispatch("post", [name, array_slice(arguments, 1)]);
	    };

	    /**
	     * Applies the promised function in a future turn.
	     * @param object    promise or immediate reference for target function
	     * @param args      array of application arguments
	     */
	    Q.fapply = function (object, args) {
	        return Q(object).dispatch("apply", [void 0, args]);
	    };

	    Promise.prototype.fapply = function (args) {
	        return this.dispatch("apply", [void 0, args]);
	    };

	    /**
	     * Calls the promised function in a future turn.
	     * @param object    promise or immediate reference for target function
	     * @param ...args   array of application arguments
	     */
	    Q["try"] = Q.fcall = function (object /* ...args*/) {
	        return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
	    };

	    Promise.prototype.fcall = function () /*...args*/{
	        return this.dispatch("apply", [void 0, array_slice(arguments)]);
	    };

	    /**
	     * Binds the promised function, transforming return values into a fulfilled
	     * promise and thrown errors into a rejected one.
	     * @param object    promise or immediate reference for target function
	     * @param ...args   array of application arguments
	     */
	    Q.fbind = function (object /*...args*/) {
	        var promise = Q(object);
	        var args = array_slice(arguments, 1);
	        return function fbound() {
	            return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
	        };
	    };
	    Promise.prototype.fbind = function () /*...args*/{
	        var promise = this;
	        var args = array_slice(arguments);
	        return function fbound() {
	            return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
	        };
	    };

	    /**
	     * Requests the names of the owned properties of a promised
	     * object in a future turn.
	     * @param object    promise or immediate reference for target object
	     * @return promise for the keys of the eventually settled object
	     */
	    Q.keys = function (object) {
	        return Q(object).dispatch("keys", []);
	    };

	    Promise.prototype.keys = function () {
	        return this.dispatch("keys", []);
	    };

	    /**
	     * Turns an array of promises into a promise for an array.  If any of
	     * the promises gets rejected, the whole array is rejected immediately.
	     * @param {Array*} an array (or promise for an array) of values (or
	     * promises for values)
	     * @returns a promise for an array of the corresponding values
	     */
	    // By Mark Miller
	    // http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
	    Q.all = all;
	    function all(promises) {
	        return when(promises, function (promises) {
	            var pendingCount = 0;
	            var deferred = defer();
	            array_reduce(promises, function (undefined, promise, index) {
	                var snapshot;
	                if (isPromise(promise) && (snapshot = promise.inspect()).state === "fulfilled") {
	                    promises[index] = snapshot.value;
	                } else {
	                    ++pendingCount;
	                    when(promise, function (value) {
	                        promises[index] = value;
	                        if (--pendingCount === 0) {
	                            deferred.resolve(promises);
	                        }
	                    }, deferred.reject, function (progress) {
	                        deferred.notify({ index: index, value: progress });
	                    });
	                }
	            }, void 0);
	            if (pendingCount === 0) {
	                deferred.resolve(promises);
	            }
	            return deferred.promise;
	        });
	    }

	    Promise.prototype.all = function () {
	        return all(this);
	    };

	    /**
	     * Returns the first resolved promise of an array. Prior rejected promises are
	     * ignored.  Rejects only if all promises are rejected.
	     * @param {Array*} an array containing values or promises for values
	     * @returns a promise fulfilled with the value of the first resolved promise,
	     * or a rejected promise if all promises are rejected.
	     */
	    Q.any = any;

	    function any(promises) {
	        if (promises.length === 0) {
	            return Q.resolve();
	        }

	        var deferred = Q.defer();
	        var pendingCount = 0;
	        array_reduce(promises, function (prev, current, index) {
	            var promise = promises[index];

	            pendingCount++;

	            when(promise, onFulfilled, onRejected, onProgress);
	            function onFulfilled(result) {
	                deferred.resolve(result);
	            }
	            function onRejected() {
	                pendingCount--;
	                if (pendingCount === 0) {
	                    deferred.reject(new Error("Can't get fulfillment value from any promise, all " + "promises were rejected."));
	                }
	            }
	            function onProgress(progress) {
	                deferred.notify({
	                    index: index,
	                    value: progress
	                });
	            }
	        }, undefined);

	        return deferred.promise;
	    }

	    Promise.prototype.any = function () {
	        return any(this);
	    };

	    /**
	     * Waits for all promises to be settled, either fulfilled or
	     * rejected.  This is distinct from `all` since that would stop
	     * waiting at the first rejection.  The promise returned by
	     * `allResolved` will never be rejected.
	     * @param promises a promise for an array (or an array) of promises
	     * (or values)
	     * @return a promise for an array of promises
	     */
	    Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
	    function allResolved(promises) {
	        return when(promises, function (promises) {
	            promises = array_map(promises, Q);
	            return when(all(array_map(promises, function (promise) {
	                return when(promise, noop, noop);
	            })), function () {
	                return promises;
	            });
	        });
	    }

	    Promise.prototype.allResolved = function () {
	        return allResolved(this);
	    };

	    /**
	     * @see Promise#allSettled
	     */
	    Q.allSettled = allSettled;
	    function allSettled(promises) {
	        return Q(promises).allSettled();
	    }

	    /**
	     * Turns an array of promises into a promise for an array of their states (as
	     * returned by `inspect`) when they have all settled.
	     * @param {Array[Any*]} values an array (or promise for an array) of values (or
	     * promises for values)
	     * @returns {Array[State]} an array of states for the respective values.
	     */
	    Promise.prototype.allSettled = function () {
	        return this.then(function (promises) {
	            return all(array_map(promises, function (promise) {
	                promise = Q(promise);
	                function regardless() {
	                    return promise.inspect();
	                }
	                return promise.then(regardless, regardless);
	            }));
	        });
	    };

	    /**
	     * Captures the failure of a promise, giving an oportunity to recover
	     * with a callback.  If the given promise is fulfilled, the returned
	     * promise is fulfilled.
	     * @param {Any*} promise for something
	     * @param {Function} callback to fulfill the returned promise if the
	     * given promise is rejected
	     * @returns a promise for the return value of the callback
	     */
	    Q.fail = // XXX legacy
	    Q["catch"] = function (object, rejected) {
	        return Q(object).then(void 0, rejected);
	    };

	    Promise.prototype.fail = // XXX legacy
	    Promise.prototype["catch"] = function (rejected) {
	        return this.then(void 0, rejected);
	    };

	    /**
	     * Attaches a listener that can respond to progress notifications from a
	     * promise's originating deferred. This listener receives the exact arguments
	     * passed to ``deferred.notify``.
	     * @param {Any*} promise for something
	     * @param {Function} callback to receive any progress notifications
	     * @returns the given promise, unchanged
	     */
	    Q.progress = progress;
	    function progress(object, progressed) {
	        return Q(object).then(void 0, void 0, progressed);
	    }

	    Promise.prototype.progress = function (progressed) {
	        return this.then(void 0, void 0, progressed);
	    };

	    /**
	     * Provides an opportunity to observe the settling of a promise,
	     * regardless of whether the promise is fulfilled or rejected.  Forwards
	     * the resolution to the returned promise when the callback is done.
	     * The callback can return a promise to defer completion.
	     * @param {Any*} promise
	     * @param {Function} callback to observe the resolution of the given
	     * promise, takes no arguments.
	     * @returns a promise for the resolution of the given promise when
	     * ``fin`` is done.
	     */
	    Q.fin = // XXX legacy
	    Q["finally"] = function (object, callback) {
	        return Q(object)["finally"](callback);
	    };

	    Promise.prototype.fin = // XXX legacy
	    Promise.prototype["finally"] = function (callback) {
	        callback = Q(callback);
	        return this.then(function (value) {
	            return callback.fcall().then(function () {
	                return value;
	            });
	        }, function (reason) {
	            // TODO attempt to recycle the rejection with "this".
	            return callback.fcall().then(function () {
	                throw reason;
	            });
	        });
	    };

	    /**
	     * Terminates a chain of promises, forcing rejections to be
	     * thrown as exceptions.
	     * @param {Any*} promise at the end of a chain of promises
	     * @returns nothing
	     */
	    Q.done = function (object, fulfilled, rejected, progress) {
	        return Q(object).done(fulfilled, rejected, progress);
	    };

	    Promise.prototype.done = function (fulfilled, rejected, progress) {
	        var onUnhandledError = function onUnhandledError(error) {
	            // forward to a future turn so that ``when``
	            // does not catch it and turn it into a rejection.
	            Q.nextTick(function () {
	                makeStackTraceLong(error, promise);
	                if (Q.onerror) {
	                    Q.onerror(error);
	                } else {
	                    throw error;
	                }
	            });
	        };

	        // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
	        var promise = fulfilled || rejected || progress ? this.then(fulfilled, rejected, progress) : this;

	        if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process && process.domain) {
	            onUnhandledError = process.domain.bind(onUnhandledError);
	        }

	        promise.then(void 0, onUnhandledError);
	    };

	    /**
	     * Causes a promise to be rejected if it does not get fulfilled before
	     * some milliseconds time out.
	     * @param {Any*} promise
	     * @param {Number} milliseconds timeout
	     * @param {Any*} custom error message or Error object (optional)
	     * @returns a promise for the resolution of the given promise if it is
	     * fulfilled before the timeout, otherwise rejected.
	     */
	    Q.timeout = function (object, ms, error) {
	        return Q(object).timeout(ms, error);
	    };

	    Promise.prototype.timeout = function (ms, error) {
	        var deferred = defer();
	        var timeoutId = setTimeout(function () {
	            if (!error || "string" === typeof error) {
	                error = new Error(error || "Timed out after " + ms + " ms");
	                error.code = "ETIMEDOUT";
	            }
	            deferred.reject(error);
	        }, ms);

	        this.then(function (value) {
	            clearTimeout(timeoutId);
	            deferred.resolve(value);
	        }, function (exception) {
	            clearTimeout(timeoutId);
	            deferred.reject(exception);
	        }, deferred.notify);

	        return deferred.promise;
	    };

	    /**
	     * Returns a promise for the given value (or promised value), some
	     * milliseconds after it resolved. Passes rejections immediately.
	     * @param {Any*} promise
	     * @param {Number} milliseconds
	     * @returns a promise for the resolution of the given promise after milliseconds
	     * time has elapsed since the resolution of the given promise.
	     * If the given promise rejects, that is passed immediately.
	     */
	    Q.delay = function (object, timeout) {
	        if (timeout === void 0) {
	            timeout = object;
	            object = void 0;
	        }
	        return Q(object).delay(timeout);
	    };

	    Promise.prototype.delay = function (timeout) {
	        return this.then(function (value) {
	            var deferred = defer();
	            setTimeout(function () {
	                deferred.resolve(value);
	            }, timeout);
	            return deferred.promise;
	        });
	    };

	    /**
	     * Passes a continuation to a Node function, which is called with the given
	     * arguments provided as an array, and returns a promise.
	     *
	     *      Q.nfapply(FS.readFile, [__filename])
	     *      .then(function (content) {
	     *      })
	     *
	     */
	    Q.nfapply = function (callback, args) {
	        return Q(callback).nfapply(args);
	    };

	    Promise.prototype.nfapply = function (args) {
	        var deferred = defer();
	        var nodeArgs = array_slice(args);
	        nodeArgs.push(deferred.makeNodeResolver());
	        this.fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };

	    /**
	     * Passes a continuation to a Node function, which is called with the given
	     * arguments provided individually, and returns a promise.
	     * @example
	     * Q.nfcall(FS.readFile, __filename)
	     * .then(function (content) {
	     * })
	     *
	     */
	    Q.nfcall = function (callback /*...args*/) {
	        var args = array_slice(arguments, 1);
	        return Q(callback).nfapply(args);
	    };

	    Promise.prototype.nfcall = function () /*...args*/{
	        var nodeArgs = array_slice(arguments);
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        this.fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };

	    /**
	     * Wraps a NodeJS continuation passing function and returns an equivalent
	     * version that returns a promise.
	     * @example
	     * Q.nfbind(FS.readFile, __filename)("utf-8")
	     * .then(console.log)
	     * .done()
	     */
	    Q.nfbind = Q.denodeify = function (callback /*...args*/) {
	        var baseArgs = array_slice(arguments, 1);
	        return function () {
	            var nodeArgs = baseArgs.concat(array_slice(arguments));
	            var deferred = defer();
	            nodeArgs.push(deferred.makeNodeResolver());
	            Q(callback).fapply(nodeArgs).fail(deferred.reject);
	            return deferred.promise;
	        };
	    };

	    Promise.prototype.nfbind = Promise.prototype.denodeify = function () /*...args*/{
	        var args = array_slice(arguments);
	        args.unshift(this);
	        return Q.denodeify.apply(void 0, args);
	    };

	    Q.nbind = function (callback, thisp /*...args*/) {
	        var baseArgs = array_slice(arguments, 2);
	        return function () {
	            var nodeArgs = baseArgs.concat(array_slice(arguments));
	            var deferred = defer();
	            nodeArgs.push(deferred.makeNodeResolver());
	            function bound() {
	                return callback.apply(thisp, arguments);
	            }
	            Q(bound).fapply(nodeArgs).fail(deferred.reject);
	            return deferred.promise;
	        };
	    };

	    Promise.prototype.nbind = function () /*thisp, ...args*/{
	        var args = array_slice(arguments, 0);
	        args.unshift(this);
	        return Q.nbind.apply(void 0, args);
	    };

	    /**
	     * Calls a method of a Node-style object that accepts a Node-style
	     * callback with a given array of arguments, plus a provided callback.
	     * @param object an object that has the named method
	     * @param {String} name name of the method of object
	     * @param {Array} args arguments to pass to the method; the callback
	     * will be provided by Q and appended to these arguments.
	     * @returns a promise for the value or error
	     */
	    Q.nmapply = // XXX As proposed by "Redsandro"
	    Q.npost = function (object, name, args) {
	        return Q(object).npost(name, args);
	    };

	    Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
	    Promise.prototype.npost = function (name, args) {
	        var nodeArgs = array_slice(args || []);
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	        return deferred.promise;
	    };

	    /**
	     * Calls a method of a Node-style object that accepts a Node-style
	     * callback, forwarding the given variadic arguments, plus a provided
	     * callback argument.
	     * @param object an object that has the named method
	     * @param {String} name name of the method of object
	     * @param ...args arguments to pass to the method; the callback will
	     * be provided by Q and appended to these arguments.
	     * @returns a promise for the value or error
	     */
	    Q.nsend = // XXX Based on Mark Miller's proposed "send"
	    Q.nmcall = // XXX Based on "Redsandro's" proposal
	    Q.ninvoke = function (object, name /*...args*/) {
	        var nodeArgs = array_slice(arguments, 2);
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	        return deferred.promise;
	    };

	    Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
	    Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
	    Promise.prototype.ninvoke = function (name /*...args*/) {
	        var nodeArgs = array_slice(arguments, 1);
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	        return deferred.promise;
	    };

	    /**
	     * If a function would like to support both Node continuation-passing-style and
	     * promise-returning-style, it can end its internal promise chain with
	     * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
	     * elects to use a nodeback, the result will be sent there.  If they do not
	     * pass a nodeback, they will receive the result promise.
	     * @param object a result (or a promise for a result)
	     * @param {Function} nodeback a Node.js-style callback
	     * @returns either the promise or nothing
	     */
	    Q.nodeify = nodeify;
	    function nodeify(object, nodeback) {
	        return Q(object).nodeify(nodeback);
	    }

	    Promise.prototype.nodeify = function (nodeback) {
	        if (nodeback) {
	            this.then(function (value) {
	                Q.nextTick(function () {
	                    nodeback(null, value);
	                });
	            }, function (error) {
	                Q.nextTick(function () {
	                    nodeback(error);
	                });
	            });
	        } else {
	            return this;
	        }
	    };

	    Q.noConflict = function () {
	        throw new Error("Q.noConflict only works when Q is used as a global");
	    };

	    // All code before this point will be filtered from stack traces.
	    var qEndingLine = captureLine();

	    return Q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(182), __webpack_require__(183).setImmediate, __webpack_require__(22)(module)))

/***/ },
/* 182 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {"use strict";

	var nextTick = __webpack_require__(182).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  timeout.close();
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function () {};
	Timeout.prototype.close = function () {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function (item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function (item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function (item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout) item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(183).setImmediate, __webpack_require__(183).clearImmediate))

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var isArray = __webpack_require__(179);
	var isEmpty = __webpack_require__(189);
	var GoogleChartLoader = __webpack_require__(180);

	var ColumnChart = React.createClass({
	  displayName: 'ColumnChart',


	  gc_id: null,
	  chart: null,
	  gc_data: null,
	  gc_options: null,

	  getInitialState: function getInitialState() {
	    this.gc_id = "column_chart_" + Math.floor(Math.random() * 1000000);
	    return null;
	  },

	  componentDidMount: function componentDidMount() {
	    var self = this;
	    GoogleChartLoader.init().then(function () {
	      self.drawChart();
	    });
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (GoogleChartLoader.is_loaded) {
	      this.drawChart();
	    };
	  },

	  drawChart: function drawChart() {
	    if (!this.chart) {
	      this.chart = new google.visualization.ColumnChart(document.getElementById(this.gc_id));
	      google.visualization.events.addListener(this.chart, 'select', this.handleSelect);
	    }

	    if (!isArray(this.props.data.data) || isEmpty(this.props.data.data)) {
	      return;
	    }

	    this.gc_data = google.visualization.arrayToDataTable(this.props.data.data);
	    this.gc_options = this.props.data.options;

	    this.chart.draw(this.gc_data, this.gc_options);
	  },

	  handleSelect: function handleSelect() {
	    var chart = this.chart;
	    var gc_data = this.gc_data;
	    var selected = chart.getSelection()[0];
	    if (selected && (selected.row || selected.row == 0) && (selected.column || selected.column == 0)) {
	      var value = gc_data.getValue(selected.row, 0) + ", " + gc_data.getValue(selected.row, 1);
	      this.props.onClick(value);
	    }
	  },

	  render: function render() {

	    var chartWrapStyle = {};

	    var chartStyle = {
	      position: "absolute",
	      width: "100%",
	      height: "100%"
	    };

	    return React.createElement(
	      'div',
	      { style: chartWrapStyle },
	      React.createElement(
	        'div',
	        { style: chartStyle, id: this.gc_id },
	        'Sorry, Google Chart API is not properly loaded.'
	      )
	    );
	  }

	});

	ColumnChart.defaultProps = {
	  data: { data: [], options: {} },
	  onClick: undefined
	};

	module.exports = ColumnChart;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var isArray = __webpack_require__(179);
	var isEmpty = __webpack_require__(189);
	var GoogleChartLoader = __webpack_require__(180);

	var GeoChart = React.createClass({
	  displayName: 'GeoChart',


	  gc_id: null,
	  chart: null,
	  gc_data: null,
	  gc_options: null,

	  getInitialState: function getInitialState() {
	    this.gc_id = "geo_chart_" + Math.floor(Math.random() * 1000000);
	    return null;
	  },

	  componentDidMount: function componentDidMount() {
	    var self = this;
	    GoogleChartLoader.init().then(function () {
	      self.drawChart();
	    });
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (GoogleChartLoader.is_loaded) {
	      this.drawChart();
	    };
	  },

	  drawChart: function drawChart() {
	    if (!this.chart) {
	      this.chart = new google.visualization.GeoChart(document.getElementById(this.gc_id));
	      google.visualization.events.addListener(this.chart, 'select', this.handleSelect);
	    }

	    if (!isArray(this.props.data.data) || isEmpty(this.props.data.data)) {
	      return;
	    }

	    this.gc_data = google.visualization.arrayToDataTable(this.props.data.data);
	    this.gc_options = this.props.data.options;

	    this.chart.draw(this.gc_data, this.gc_options);
	  },

	  handleSelect: function handleSelect() {
	    var chart = this.chart;
	    var gc_data = this.gc_data;
	    var selected = chart.getSelection()[0];
	    if (selected && (selected.row || selected.row == 0)) {
	      var value = gc_data.getValue(selected.row, 0) + ", " + gc_data.getValue(selected.row, 1);
	      this.props.onClick(value);
	    }
	  },

	  render: function render() {

	    var chartWrapStyle = {};

	    var chartStyle = {
	      position: "absolute",
	      width: "100%",
	      height: "100%"
	    };

	    return React.createElement(
	      'div',
	      { style: chartWrapStyle },
	      React.createElement(
	        'div',
	        { style: chartStyle, id: this.gc_id },
	        'Sorry, Google Chart API is not properly loaded.'
	      )
	    );
	  }

	});

	GeoChart.defaultProps = {
	  data: { data: [], options: {} },
	  onClick: undefined
	};

	module.exports = GeoChart;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var isArray = __webpack_require__(179);
	var isEmpty = __webpack_require__(189);
	var GoogleChartLoader = __webpack_require__(180);

	var TableView = React.createClass({
	  displayName: 'TableView',


	  gc_id: null,
	  chart: null,
	  gc_data: null,
	  gc_options: null,

	  getInitialState: function getInitialState() {
	    this.gc_id = "table_view_" + Math.floor(Math.random() * 1000000);
	    return null;
	  },

	  componentDidMount: function componentDidMount() {
	    var self = this;
	    GoogleChartLoader.init().then(function () {
	      self.drawChart();
	    });
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (GoogleChartLoader.is_loaded) {
	      this.drawChart();
	    };
	  },

	  drawChart: function drawChart() {
	    if (!this.chart) {
	      this.chart = new google.visualization.Table(document.getElementById(this.gc_id));
	      google.visualization.events.addListener(this.chart, 'select', this.handleSelect);
	    }

	    if (!isArray(this.props.data.data) || isEmpty(this.props.data.data)) {
	      return;
	    }

	    this.gc_data = google.visualization.arrayToDataTable(this.props.data.data);
	    this.gc_options = this.props.data.options;

	    this.chart.draw(this.gc_data, this.gc_options);
	  },

	  handleSelect: function handleSelect() {
	    var chart = this.chart;
	    var gc_data = this.gc_data;
	    var selected = chart.getSelection()[0];
	    if (selected && (selected.row || selected.row == 0)) {
	      var value = gc_data.getValue(selected.row, 0) + ", " + gc_data.getValue(selected.row, 1) + ", " + gc_data.getValue(selected.row, 2);
	      this.props.onClick(value);
	    }
	  },

	  render: function render() {

	    var chartWrapStyle = {};

	    var chartStyle = {
	      position: "absolute",
	      width: "100%",
	      height: "100%"
	    };

	    return React.createElement(
	      'div',
	      { style: chartWrapStyle },
	      React.createElement(
	        'div',
	        { style: chartStyle, id: this.gc_id },
	        'Sorry, Google Chart API is not properly loaded.'
	      )
	    );
	  }

	});

	TableView.defaultProps = {
	  data: { data: [], options: {} },
	  onClick: undefined
	};

	module.exports = TableView;

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var isArray = __webpack_require__(179);
	var isEmpty = __webpack_require__(189);
	var GoogleChartLoader = __webpack_require__(180);

	var ScatterChart = React.createClass({
	  displayName: 'ScatterChart',


	  gc_id: null,
	  chart: null,
	  gc_data: null,
	  gc_options: null,

	  getInitialState: function getInitialState() {
	    this.gc_id = "scatter_chart_" + Math.floor(Math.random() * 1000000);
	    return null;
	  },

	  componentDidMount: function componentDidMount() {
	    var self = this;
	    GoogleChartLoader.init().then(function () {
	      self.drawChart();
	    });
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (GoogleChartLoader.is_loaded) {
	      this.drawChart();
	    };
	  },

	  drawChart: function drawChart() {
	    if (!this.chart) {
	      this.chart = new google.visualization.ScatterChart(document.getElementById(this.gc_id));
	      google.visualization.events.addListener(this.chart, 'select', this.handleSelect);
	    }

	    if (!isArray(this.props.data.data) || isEmpty(this.props.data.data)) {
	      return;
	    }

	    this.gc_data = google.visualization.arrayToDataTable(this.props.data.data);
	    this.gc_options = this.props.data.options;

	    this.chart.draw(this.gc_data, this.gc_options);
	  },

	  handleSelect: function handleSelect() {
	    var chart = this.chart;
	    var gc_data = this.gc_data;
	    var selected = chart.getSelection()[0];
	    if (selected && (selected.row || selected.row == 0) && (selected.column || selected.column == 0)) {
	      var value = gc_data.getValue(selected.row, 0) + ", " + gc_data.getValue(selected.row, 1);
	      this.props.onClick(value);
	    }
	  },

	  render: function render() {

	    var chartWrapStyle = {};

	    var chartStyle = {
	      position: "absolute",
	      width: "100%",
	      height: "100%"
	    };

	    return React.createElement(
	      'div',
	      { style: chartWrapStyle },
	      React.createElement(
	        'div',
	        { style: chartStyle, id: this.gc_id },
	        'Sorry, Google Chart API is not properly loaded.'
	      )
	    );
	  }

	});

	ScatterChart.defaultProps = {
	  data: { data: [], options: {} },
	  onClick: undefined
	};

	module.exports = ScatterChart;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var isArray = __webpack_require__(179);
	var isEmpty = __webpack_require__(189);
	var GoogleChartLoader = __webpack_require__(180);

	var Gauge = React.createClass({
	  displayName: 'Gauge',


	  gc_id: null,
	  chart: null,
	  gc_data: null,
	  gc_options: null,

	  getInitialState: function getInitialState() {
	    this.gc_id = "gauge_" + Math.floor(Math.random() * 1000000);
	    return null;
	  },

	  componentDidMount: function componentDidMount() {
	    var self = this;
	    GoogleChartLoader.init().then(function () {
	      self.drawChart();
	    });
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (GoogleChartLoader.is_loaded) {
	      this.drawChart();
	    };
	  },

	  drawChart: function drawChart() {
	    if (!this.chart) {
	      this.chart = new google.visualization.Gauge(document.getElementById(this.gc_id));
	      google.visualization.events.addListener(this.chart, 'select', this.handleSelect);
	    }

	    if (!isArray(this.props.data.data) || isEmpty(this.props.data.data)) {
	      return;
	    }

	    this.gc_data = google.visualization.arrayToDataTable(this.props.data.data);
	    this.gc_options = this.props.data.options;

	    this.chart.draw(this.gc_data, this.gc_options);
	  },

	  handleSelect: function handleSelect() {
	    var chart = this.chart;
	    var gc_data = this.gc_data;
	    var selected = chart.getSelection()[0];
	    if (selected && (selected.row || selected.row == 0)) {
	      //var value = gc_data.getValue(selected.row, 0) + ", " + gc_data.getValue(selected.row, 1);
	      //this.props.onClick(value);     
	    }
	  },

	  render: function render() {

	    var chartWrapStyle = {};

	    var chartStyle = {
	      position: "absolute",
	      width: "100%",
	      height: "100%"
	    };

	    return React.createElement(
	      'div',
	      { style: chartWrapStyle },
	      React.createElement(
	        'div',
	        { style: chartStyle, id: this.gc_id },
	        'Sorry, Google Chart API is not properly loaded.'
	      )
	    );
	  }

	});

	Gauge.defaultProps = {
	  data: { data: [], options: {} },
	  onClick: undefined
	};

	module.exports = Gauge;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var convert = __webpack_require__(4),
	    func = convert('isEmpty', __webpack_require__(190), __webpack_require__(175));

	func.placeholder = __webpack_require__(7);
	module.exports = func;

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getTag = __webpack_require__(110),
	    isArguments = __webpack_require__(68),
	    isArray = __webpack_require__(43),
	    isArrayLike = __webpack_require__(70),
	    isBuffer = __webpack_require__(131),
	    isFunction = __webpack_require__(17),
	    isObjectLike = __webpack_require__(44),
	    isString = __webpack_require__(74),
	    keys = __webpack_require__(62);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value) || isBuffer(value))) {
	    return !value.length;
	  }
	  if (isObjectLike(value)) {
	    var tag = getTag(value);
	    if (tag == mapTag || tag == setTag) {
	      return !value.size;
	    }
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return !(nonEnumShadows && keys(value).length);
	}

	module.exports = isEmpty;

/***/ }
/******/ ]);