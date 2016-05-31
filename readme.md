### ReactDashboard
---
* A dashboard app made with ReactJS and Bootstrap.
* Structure is like : Dashboard -> Widget wrapper -> detailed widgets -> chart components.
* Schema is still under design, please refer to the example.
* Run the example by double clicking example/index.html.
* Use webpack to build source code, it outputs dist/ReactDashboard.js.
* Try the demo [here](http://gjk0090.github.io/ReactDashboard "ReactDashboard Example").
* Minimun requirement is IE 9.

### TODO
---
###### core feature
* drag and drop (react-dnd)
* wrap widget with grid for dnd
* get rid of React-Bootstrap
* fix validation in addWidget method
* more example widget
* input for different param type
* click popup modal: Widget or widget?
* height option
* no config mode
* manage widget list event with flux!!!!

###### google chart
* click event instead of select
* $(window).resize(function(){drawChart1();});
* unique id for gc using lodash.uniqueId('contact_');

###### improvement
* auto height
* use propTypes
* learn Flux

###### project
* tests
* refine webpack.config.js
* refine package.json
* minify and map
* beautiful readme

### Reference
---
* [Lifecycle Methods](https://facebook.github.io/react/docs/component-specs.html)
* [Component API](https://facebook.github.io/react/docs/component-api.html)
* [DOM Event Listener](https://facebook.github.io/react/tips/dom-event-listeners.html)
