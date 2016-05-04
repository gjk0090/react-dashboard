### ReactDashboard
---
* A dashboard app made with ReactJS and Bootstrap.
* Structure is like : Dashboard -> multiple Widget -> detailed widgets.
* Schema is still under design, please refer to the example.
* Run the example by double clicking example/index.html, it uses pure js.
* Use webpack to build source code, it reads the webpack.config.js file and outputs dist/ReactDashboard.js.
* Try the example page [here](http://gjk0090.github.io/ReactDashboard "ReactDashboard Example").
* Minimun IE 9.

### TODO
---
###### core
* auto height
* use propTypes
* learn Flux
* extract style to class
* drag and drop (react-dnd)
* wrap widget with grid for dnd
* refine AJAX -- Urgent
* add widget, Expose function: get widget list -- Urgent
* static function for widgets to return template for add new -- Urgent
* this.id, this.chart for gc widgets (var id outside component) -- Urgent
* encapsulate example buttons -- Urgent
* config for widget title -- Urgent
* why not refreshing in edit mode (componentDidMount&componentDidUpdate) / update gc error message -- Urgent
* because left/right ==> chart init, widget not init; up/down ==> both init

###### google charts
* Google Chart responsive
* smarter initial loading (react-google-charts: GoogleChartLoader.js) -- Urgent

###### project
* tests
* learn webpack
* learn package.json
* minify and map
* beautiful readme
* versioning, use branch


### Reference
---
* [Lifecycle Methods](https://facebook.github.io/react/docs/component-specs.html)
* [Component API](https://facebook.github.io/react/docs/component-api.html)
* [DOM Event Listener](https://facebook.github.io/react/tips/dom-event-listeners.html)
* [Load Initial Data via AJAX](https://facebook.github.io/react/tips/initial-ajax.html)
