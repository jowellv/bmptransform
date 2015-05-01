'use strict';

var fs = require('fs');

function readBmp (filename) {
  var file = fs.readFileSync(filename);
  var bmpFile = {};


  // header is 14 bytes long
  bmpFile.header = file.readUInt16BE(0).toString(16);
  bmpFile.fileSize = file.readUInt32LE(2);
  bmpFile.width = file.readUInt32LE(18);
  bmpFile.height = file.readUInt32LE(22);
  bmpFile.bpp = file.readUInt32LE(28);
  var pixelStart = +file.readUInt32LE(10);

  var startOfcp = 14 + file.readUInt32LE(14);
  var sizeOfcp = file.readUInt32LE(46);
  // console.log("start of pix" + file.readUInt8(pixelStart));
  // console.log("start of cp: " + file.readUInt32LE(startOfcp + 8).toString(16));
  // console.log(file.readUInt32LE(startOfcp + 4 * 28).toString(16));

  bmpFile.colorPal = [];
  for(var i = 0; i < sizeOfcp; i++) {
    bmpFile.colorPal.push(file.readUInt32LE(startOfcp + 4 * i));
  }

  return bmpFile;
}


function readBmp24 (filename) {
  var file = fs.readFileSync(filename);
  var bmpFile = {};

  // header is 14 bytes long
  bmpFile.header = file.readUInt16BE(0).toString(16);
  bmpFile.fileSize = file.readUInt32LE(2);
  bmpFile.width = file.readUInt32LE(18);
  bmpFile.height = file.readUInt32LE(22);
  bmpFile.bpp = file.readUInt32LE(28);

  var pixelStart = +file.readUInt32LE(10);

  // console.log("bpp: " + bmpFile.bpp);
  // console.log("pixelStart : " + pixelStart);
  // console.log("fileLength: " + file.length);
  // console.log("width: " + bmpFile.width);
  // console.log("height: " + bmpFile.height);

  var pixels = [];
  for(var i = 0; i < 50; i++) {
    pixels[i] = file.readUInt8(54+i*3);
  }
  // console.log(pixels);
  return bmpFile;
}

function transformBmp (fileObject) {
  fileObject.colorPal.forEach(function(colorRow, i, arr) {
    arr[i] = 16777215 - colorRow;
  });

  return fileObject;
}

function writeBmp (fileObject, filename) {
  var file = fs.readFileSync(filename);
  var startOfcp = 14 + file.readUInt32LE(14);

  fileObject.colorPal.forEach(function(colorRow, i, arr) {
    file.writeUInt32LE(colorRow, startOfcp + i);
  });
  fs.writeFileSync('newbmp.bmp', file);
  var outFile = fs.readFileSync('./newbmp.bmp');
  return outFile.readUInt16BE(0).toString(16);
}

module.exports = {
  readBmp: readBmp,
  readBmp24: readBmp24,
  transformBmp: transformBmp,
  writeBmp: writeBmp
};
