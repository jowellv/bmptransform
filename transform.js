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

  // console.log('pixelStart: ' + pixelStart);
  // console.log('startOfcp: ' + startOfcp);
  // console.log('sizeOfcp: ' + sizeOfcp);

  bmpFile.colorPal = [];
  for(var i = 0; i < sizeOfcp; i++) {
    bmpFile.colorPal.push(file.readUInt32LE(startOfcp + 4 * i));
  }

  return bmpFile;
}


function readBmp24 (filename) {
  var file = fs.readFileSync(filename);
  var bmpFile = {};

  bmpFile.header = file.readUInt16BE(0).toString(16);
  bmpFile.fileSize = file.readUInt32LE(2);
  bmpFile.width = file.readUInt32LE(18);
  bmpFile.height = file.readUInt32LE(22);
  bmpFile.bpp = file.readUInt32LE(28);
  bmpFile.pixelLength = file.readUInt32LE(34);

  var pixelStart = +file.readUInt32LE(10);

  // console.log("bpp: " + bmpFile.bpp);
  // console.log("pixelStart : " + pixelStart);
  // console.log("fileLength: " + file.length);
  // console.log("width: " + bmpFile.width);
  // console.log("height: " + bmpFile.height);
  // console.log('pixelLength : ' + bmpFile.pixelLength);
  // console.log('file length: ' + file.length);

  bmpFile.pixels = [];
  for( var i = 0 ; i < 10000 ; i++) {
    bmpFile.pixels.push(file.readUInt8(54 + i * 3));
  }

  // console.log('pix# : ' + bmpFile.pixels[9998]);
  // console.log('pixels length: ' + bmpFile.pixels.length);
  return bmpFile;
}

function transformBmp24 (fileObject) {
  fileObject.pixels.forEach(function(pixel, i, arr) {
    arr[i] = 256-pixel;
  });
  return fileObject;
}

function writeBmp24 (fileObject, filename) {
  var file = fs.readFileSync(filename);
  var pixelStart = +file.readUInt32LE(10);

  fileObject.pixels.forEach(function(pixel, i, arr) {
    file.writeUInt32LE(pixel, pixelStart + (i * 3) - 3); // -1=red, -2=grn, -3=blu
  });
  fs.writeFileSync('newbmp24.bmp', file);
  var outFile = fs.readFileSync('./newbmp24.bmp');
  return outFile.readUInt16BE(0).toString(16);
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
    file.writeUInt32LE(colorRow, startOfcp + 4 * i);
  });
  fs.writeFileSync('newbmp.bmp', file);
  var outFile = fs.readFileSync('./newbmp.bmp');
  return outFile.readUInt16BE(0).toString(16);
}

module.exports = {
  readBmp: readBmp,
  readBmp24: readBmp24,
  transformBmp: transformBmp,
  transformBmp24: transformBmp24,
  writeBmp: writeBmp,
  writeBmp24: writeBmp24
};
