var React = require('react');

var WidgetManager = {};

WidgetManager.WidgetList = { 
    GithubAuthor : require('./GithubAuthor'),
    GithubCommit : require('./GithubCommit')
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
  if (!React.Component instanceof instance.constructor) {
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