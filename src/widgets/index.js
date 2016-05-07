var React = require('react');

var WidgetManager = {};

WidgetManager.WidgetList = { 
    PieChart : require('./PieChart'),
    ColumnChart : require('./ColumnChart'),
    GeoChart : require('./GeoChart'),
    TableView : require('./TableView'),
    ScatterChart : require('./ScatterChart'),
    Gauge : require('./Gauge')
};

/**
 * Add a Widget
 *
 * @param  type      name     Name of Widget
 * @param  Component instance Widget Component
 */
WidgetManager.addWidget = (name, instance) => {
  if (typeof name !== 'string') {
    throw new Error('ReactDashboard: First parameter of addWidget must be of type string');
  }

  //this validation does not work
  if (!React.isValidElement(instance)) {
    throw new Error('ReactDashboard: Cannot not assign "' + name + '" as an widget. Second paramter expects a React component');
  }

  WidgetManager.WidgetList[name] = instance;
};

/**
 * Add multiple Widgets
 *
 * @param  object widgets, Widgets to add. string => Component
 */
WidgetManager.addWidgets = (widgets) => {
  if (typeof widgets !== 'object') {
    throw new Error('ReactDashboard: First parameter of addWidgets must be of type object');
  }

  for (var name in widgets) {
    WidgetManager.addWidget(name, widgets[name]);
  }
};

module.exports = WidgetManager;