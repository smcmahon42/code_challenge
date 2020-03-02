#!/usr/bin/node
var fs              = require('fs');
var es              = require('event-stream')
var Util            = require('./utilities/calculations');
var data_array      = [];
var data_count      = 0;

console.time("timsort");

/**
	Returns interquartile calculation from the array slice param given.
	See Util Calcuations JS for each helper function. 

*	@param Number[] data_slice - [478, 238, 344, ...]
*/
var calculate = function (data_slice, data_length) {
	var quartile_length_result = data_length / 4.0,
	    quartile_slice_result  = Util.quartile_slice(data_slice, quartile_length_result),
	    quartile_factor_result = Util.quartile_factor(quartile_slice_result, quartile_length_result),
	    quartile_mean_result   = Util.quartile_mean(quartile_slice_result, quartile_factor_result, quartile_length_result);

	console.log(`${data_slice.length}: ${quartile_mean_result.toFixed(2)}`);
};

var streamArray = fs.createReadStream('data.txt')
.pipe(es.split())
.pipe(es.mapSync(function(line) {
	// Make line a Number Type
	var line_value = Number(line);
	// Sort index by finding the mid point and traversing the array in batches
    var position = Util.sorted_index(data_array, line_value);
    // Inserting the new line value in the correct position order
    data_array.splice(position, 0, line_value);
    // if line count >= 4 start the calculations
    if( data_count >= 4 ) {
		calculate(data_array, data_count);
	}
	// console.log(line);
	data_count++;
}));

streamArray.on('error', error => {
	console.log("Stream Error");
});

streamArray.on('close', error => {
	console.timeEnd("timsort");
	// timsort: 33943.286ms 
	// 79.79% performance increse
});



 