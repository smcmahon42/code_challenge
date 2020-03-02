#!/usr/bin/node
var fs = require('fs');
var f = fs.createWriteStream('data.txt');
var i;

for (i = 0; i < 100000; i++) {
  var v = Math.sin(i * Math.PI/80000) * 300 + 40*Math.random() + 280;
  if (v < 0) {
    v = 0;
  } else if (v > 600) {
    v = 600;
  }
  f.write(v.toFixed(0) + "\n");
}

f.on('finish', () => {
    console.log('wrote all data to file');
});

f.end();
