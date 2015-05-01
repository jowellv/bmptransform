'use strict';

var fs = require('fs');
var img = './tru256.bmp';
var img2 = './tweety78.bmp';
var pixels = [];

function readBmp (filename) {
  var file = fs.readFileSync(filename);
  var bmpFile = {};
  // header is 14 bytes long
  bmpFile.header = file.readUInt16BE(0).toString(16);
  bmpFile.fileSize = file.readUInt32LE(2).toString(10);
  bmpFile.width = file.readUInt32LE(18).toString(10);
  bmpFile.height = file.readUInt32LE(22).toString(10);
  bmpFile.bpp = file.readUInt32LE(28).toString(10);
  var palette = file.readUInt32LE(46).toString(10);

  var pixelStart = +file.readUInt32LE(10).toString(10);

  bmpFile.px1 = file.readUInt8(pixelStart);
  bmpFile.px2 = file.readUInt8(pixelStart+1);
  bmpFile.px3 = file.readUInt8(pixelStart+2);
  for(var i = 0; i < 20; i++) {
    pixels[i] = file.readUInt8(pixelStart+i+100);
  }
  console.log(pixels);
  console.log('pixstart: ' + pixelStart);
  console.log('palette: ' + palette);
  console.log('R: ' + bmpFile.px1);
  console.log('G: ' + bmpFile.px2);
  console.log('B: ' + bmpFile.px3);
  return bmpFile;
}

function processBmp (fileObject) {
  // body...
}



module.exports = {
  readBmp: readBmp
};
