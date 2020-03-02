var Util  = require('./calculations');

test('sorted_index', () => {
  var arraySet = [774,328,903,261],
      value = 399,
  	  result = Util.sorted_index(arraySet, value);
  
  expect(result).toBe(2);
});


test('quartile_slice', () => {
  var quartile_sort = [286,287,292,301,303,311,314],
      quartile_length = 1.75,
      result = Util.quartile_slice(quartile_sort, quartile_length);

  expect(result[0]).toBe(287);
  expect(result[1]).toBe(292);
  expect(result[2]).toBe(301);
  expect(result[3]).toBe(303);
  expect(result[4]).toBe(311);
});


test('quartile_factor', () => {
  var quartile_slice = [287,292,297,299,301,303,311],
      quartile_length = 2.75,
      result = Util.quartile_factor(quartile_slice, quartile_length);

  expect(result).toBe(0.25);
});


test('quartile_mean', () => {
  var quartile_slice = [287,292,297,299,301,303,311],
  	  quartile_factor = 0.75,
      quartile_length = 3.25,
      result = Util.quartile_mean(quartile_slice, quartile_factor, quartile_length);

  expect(result).toBe(298.53846153846155);
});

