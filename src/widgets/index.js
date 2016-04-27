var React = require('react');

var WidgetList = {
  PieChart : require('./PieChart'),
  ColumnChart : require('./ColumnChart'),
  GeoChart : require('./GeoChart'),
  TableView : require('./TableView'),
  ScatterChart : require('./ScatterChart'),
  Gauge : require('./Gauge')
};



//below are for adding custom widgets

/**
 * Add a Widget
 *
 * @param  type      name     Name of Widget
 * @param  Component instance Widget Component
 */
WidgetList.addWidget = (name, instance) => {
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
WidgetList.addWidgets = (widgets) => {
  if (typeof widgets !== 'object') {
    throw new Error('ReactDashboard: First parameter of addWidgets must be of type object');
  }

  for (var name in widgets) {
    WidgetList.addWidget(name, widgets[name]);
  }
};

module.exports = WidgetList;