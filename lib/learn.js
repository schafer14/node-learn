'use strict';
/*!
 * node-learn
 * Copyright(c) 2014 Banner Schafer <banner.schafer@gmail.com>
 * MIT Licensed
 */

var _ = require('lodash');

exports.kmeans = function(vec, opts, cb) {
	var clusters = opts.clusters || 2;
	var n = vec.length;
	var m = vec[0].length;
	var centroids = [];

	if (typeof clusters != 'number') return cb(Error('Clusters must be a number'));

	// Initiate clusters
	for (var i = 0; i < clusters; i += 1) {
		centroids.push({
			center: [],
			last: [],
			datasets: []
		});
		for (var j = 0; j < m; j+= 1) {
			centroids[i].center[j] = vec[Math.floor(Math.random() * n)][j];
			centroids[i].last[j] = centroids[i].center[j];
		}
	};

	function catagorize() {
		_.forEach(vec, function(x) {
			var cents = [];
			_.forEach(centroids, function(centroid, loc) {
				cents[loc] = 0;
				for(var dim = 0; dim < m; dim += 1) {
					cents[loc] += Math.abs(centroid.center[dim] - x[dim])
				}
			});
			var index = cents.indexOf(Math.min.apply(Math, cents));
			centroids[index].datasets.push(x);
		});

		move();
	}

	function move() {
		_.forEach(centroids, function(centroid) {
			for(var dim = 0; dim < m; dim+= 1) {
				var sum = centroid.datasets.reduce(function(sum, x) {
					return sum + x[dim];
				}, 0);
				
				if (centroid.datasets.length != 0) {
					centroid.last[dim] = centroid.center[dim];
					centroid.center[dim] = sum / centroid.datasets.length;
				}
			}
		});
		check();
	}

	function check() {
		var end = true;
		for(var dim = 0; dim < m; dim+= 1) {
			_.forEach(centroids, function(centroid) {
				if (Math.floor(centroid.center[dim]) != Math.floor(centroid.last[dim])) {
					end = false;
				}
				centroid.datasets = [];
			});
		}

		if (end) {
			cb(null, centroids);
		} else {
			catagorize();
		}

	}
	catagorize();
};

