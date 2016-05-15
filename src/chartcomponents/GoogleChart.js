var React = require('react');
var isArray = require('lodash/fp/isArray');
var isEmpty = require('lodash/fp/isEmpty');
var GoogleChartLoader = require('./GoogleChartLoader');

var GoogleChart = React.createClass({

	gc_id: null,
	chart: null,
	gc_data: null,
	gc_options: null,

	getInitialState: function(){
		this.gc_id = "google_chart_"+Math.floor(Math.random() * 10000000);
		return null;
	},

	componentDidMount: function(){
		var self = this;
		GoogleChartLoader.init().then(function(){
			self.drawChart();
		});
	},

	componentDidUpdate: function(){
		if (GoogleChartLoader.is_loaded){
			this.drawChart();
		};
	},

	drawChart: function(){
		if(!this.chart){
			if(!google.visualization[this.props.chartFunction]){
				console.warn('ReactDashboard: Google Chart Type "' + this.props.chartFunction + '" not defined in Google API');
				return;
			}
			this.chart = new google.visualization[this.props.chartFunction](document.getElementById(this.gc_id));
			if(!!this.props.onClick){
				google.visualization.events.addListener(this.chart, 'select', this.handleSelect);
			}
		}

		if(!isArray(this.props.data) || isEmpty(this.props.data)){return;}

		this.gc_data = google.visualization.arrayToDataTable(this.props.data);
		this.gc_options = this.props.options;

		this.chart.draw(this.gc_data, this.gc_options);
	},

	handleSelect: function(){
		var chart = this.chart;
		var gc_data = this.gc_data;
		var selected = chart.getSelection()[0];
		this.props.onClick(selected, gc_data);      
	},

	render: function() {

		var chartWrapStyle = {};

		var chartStyle = {
			position: "absolute",
			width: "100%",
			height: "100%"
		};

		return (
			<div style={chartWrapStyle}>
			<div style={chartStyle} id={this.gc_id}>Sorry, Google Chart is not properly rendered.</div>
			</div>
			);
	}

});

GoogleChart.defaultProps = {
	data      		: [],
	options 		: {},
	chartFunction	: undefined,
	onClick   		: undefined
};

module.exports = GoogleChart;
