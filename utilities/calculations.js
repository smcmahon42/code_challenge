var Helper = require('./helpers');

/**
  Returns a position that the param value should be inserted into the array

* @param Number[] array - [238, 478, 597, ...]
* @param Number value - 12
*/
exports.sorted_index = function (array, value) {
    var low = 0,
        high = array.length;

    while (low < high) {
        var mid = (low + high) >>> 1;
        if (array[mid] < value) {
          low = mid + 1;
        } else {
          high = mid;
        } 
    }
    return low;
};

/**
	Returns a sliced array based on the quartile_length float.
	The quartile_sort param should be a sorted array of number types.

*	@param Number[] quartile_sort - [238, 478, 597, ...]
*	@param Number quartile_length - 12 || 15.2
*/
exports.quartile_slice = function (quartile_sort, quartile_length) {
  return quartile_sort.slice(Math.ceil(quartile_length)-1, Math.floor(3*quartile_length)+1);
};

/**
	Returns a float or whole number.

*	@param Number[] quartile_slice - [238, 478, 597, ...]
*	@param Number quartile_length - 12 || 15.2
*/
exports.quartile_factor = function (quartile_slice, quartile_length) {
  return quartile_length - (quartile_slice.length/2.0 - 1);
};

/**
	Returns a float or whole number.
	This function depends on helper functions in the Utitlites section to make calculations.

*	@param Number[] quartile_slice - [238, 478, 597, ...]
*	@param Number quartile_factor - 12 || 15.2
*	@param Number quartile_length - 12 || 15.2
*/
exports.quartile_mean = function (quartile_slice, quartile_factor, quartile_length) {
  var slice_result   = Helper.util_quartile_mean_slice(quartile_slice),
      reduce_result  = Helper.util_quartile_mean_reduce(slice_result),
      orderop_result = Helper.util_quartile_mean_orderop(reduce_result, quartile_slice, quartile_factor),
      result         = Helper.util_quartile_mean_result(orderop_result, quartile_length);
  return result;
};

