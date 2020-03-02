#!/usr/bin/node
var readline = require('readline');
var fs = require('fs');

var rl = readline.createInterface({
  input: fs.createReadStream('data.txt')
});

var data = [];

console.time("timsort");

rl.on('line', (line) => {

  data.push(Number(line));

  if( data.length >= 4 ) {
    var q = data.length / 4.0;
    var ys = data.sort((a, b) => a - b).slice(Math.ceil(q)-1, Math.floor(3*q)+1);
    var factor = q - (ys.length/2.0 - 1);
    var mean = (ys.slice(1, ys.length - 1).reduce((sum, x) => sum + x) + (ys[0] + ys[ys.length - 1]) * factor) / (2 * q);
    console.log(`${data.length}: ${mean.toFixed(2)}`);    
  }
});

rl.on('close', () => {
	console.timeEnd("timsort"); // 167971.359ms
});



