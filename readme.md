### ReactDashboard
---
* A dashboard app made with ReactJS and Bootstrap.
* Structure is like : Dashboard -> multiple Widget -> detailed widgets.
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
* config for less refresh
* wrap basic widgets with business wrapper component
* param, name & displayName
* ajax in wrapper widget?

###### improvement
* auto height
* use propTypes
* learn Flux
* extract style to class

###### google charts
* Google Chart responsive
* separate data & options

###### project
* tests
* refine webpack.config.js
* refine package.json
* minify and map
* beautiful readme
* versioning, use branch


### Reference
---
* [Lifecycle Methods](https://facebook.github.io/react/docs/component-specs.html)
* [Component API](https://facebook.github.io/react/docs/component-api.html)
* [DOM Event Listener](https://facebook.github.io/react/tips/dom-event-listeners.html)
* [Load Initial Data via AJAX](https://facebook.github.io/react/tips/initial-ajax.html)
