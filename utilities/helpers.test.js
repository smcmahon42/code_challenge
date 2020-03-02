var Helper  = require('./helpers');

test('util_quartile_mean_slice', () => {
  var quartile_slice = [301, 286, 287, 292],
      result = Helper.util_quartile_mean_slice(quartile_slice);
  
  expect(result[0]).toBe(286);
  expect(result[1]).toBe(287);
});


test('util_quartile_mean_reduce', () => {
  var util_quartile_mean_slice = [287,292,297,299,301,303],
      result = Helper.util_quartile_mean_reduce(util_quartile_mean_slice);
  
  expect(result).toBe(1779);
});


test('util_quartile_mean_orderop', () => {
  var mean_reduce = 1492,
      quartile_slice = [287,292,297,299,301,303,311],
      quartile_factor = 0.75,
      result = Helper.util_quartile_mean_orderop(mean_reduce, quartile_slice, quartile_factor);
  
  expect(result).toBe(1940.5);
});

test('util_quartile_mean_result', () => {
  var mean_orderop = 1207,
      quartile_length = 2,
      result = Helper.util_quartile_mean_result(mean_orderop, quartile_length);
  
  expect(result).toBe(301.75);
});
