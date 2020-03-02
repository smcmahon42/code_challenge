/**
	Returns a sliced array based on the quartile_slice

*	@param Number[] quartile_slice - [238, 478, ..]
*/
exports.util_quartile_mean_slice = function (quartile_slice) {
	return quartile_slice.slice(1, quartile_slice.length - 1);
};


/**
	Returns a number based on the JS reduce function.

*	@param Number[] util_quartile_mean_slice - [238, 478, ..]
*/
exports.util_quartile_mean_reduce = function (util_quartile_mean_slice) {
	return util_quartile_mean_slice.reduce((sum, x) => sum + x);
};

/**
	Returns a float or whole number.

*	@param Number mean_reduce - 12 || 15.2
*	@param Number[] util_quartile_mean_slice - [238, 478, ..]
*	@param Number quartile_factor - 12 || 15.2
*/
exports.util_quartile_mean_orderop = function (mean_reduce, quartile_slice, quartile_factor) {	
	return mean_reduce + (quartile_slice[0] + quartile_slice[quartile_slice.length - 1]) * quartile_factor;
};

/**
	Returns a float or whole number.

*	@param Number mean_orderop - 12 || 15.2
*	@param Number quartile_length - 12 || 15.2
*/
exports.util_quartile_mean_result = function (mean_orderop, quartile_length) {
	return mean_orderop / (2 * quartile_length);
};
