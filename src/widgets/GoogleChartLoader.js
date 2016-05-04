//GoogleChartLoader Singleton
//Based on https://github.com/RakanNimer/react-google-charts/blob/master/src/components/GoogleChartLoader.js

var q = require('q');

var GoogleChartLoader = function(){

	this.is_loading = false;
	this.is_loaded = false;
	this.google_promise = q.defer();

	var self = this;

	this.init = function(packages, version) {
		if (this.is_loading) {
			return this.google_promise.promise;
		}
		this.is_loading = true;
		
		google.charts.load('current', {'packages':['corechart','table','gauge']});
		google.charts.setOnLoadCallback(function() {
			self.is_loaded = true;
  		self.google_promise.resolve();
		});

		return this.google_promise.promise;
	};
};

module.exports = new GoogleChartLoader();

