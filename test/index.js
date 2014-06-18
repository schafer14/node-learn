var nl = require('../');
var should = require('should');
var assert = require('assert');


var data3D =  [ 
  [-10, 5, 100],
  [-11, 6, 101],
  [-10.5, 6.5, 102],
  [-9.5, 5.5, 103],
  [-9.75, 6.25, 104],

  [200, 12, -11],
  [205, 11.8, -10.8],
  [202, 11.5, -10],
  [208, 11, -12],
  [198, 11.15, -11],

  [40, -200, 568],
  [38, -190, 578],
  [39.5, -205, 556],
  [41, -200, 561],
  [40.25, -198, 562]  
];

nl.kmeans(data3D, {clusters: 3}, function(err, res) {
	if(err) throw err;
	console.log(res);
});

// describe('kmeans', function() {
// 	it('should return an array of results', function() {
// 		nl.kmeans(data3D, {}, function(err, res) {
// 			res.result.should.exist();
// 			res.result.length.should.equal(data3D.length);
// 			data3D[0].length.should.equal(data3D[0].length);
// 		});
// 	});

// 	it('should append the cluster id to the array if specified', function() {
// 		nl.kmeans(data3D, {'out': 'append'}, function(err, res) {
// 			data3D[0].length.should.not.equal(data3D[0].length);
// 		});
// 	});
// });