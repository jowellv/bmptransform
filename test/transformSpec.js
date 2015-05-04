'use strict';
var expect = require('chai').expect;
var transform = require('../transform');

function transformBmp (bmpFile) {
  if(bmpFile.pixels) {
    bmpFile.pixels.forEach(function(pixel, i, arr) {
      arr[i] = 256-pixel;
    });
  } else {
    bmpFile.colorPal.forEach(function(colorRow, i, arr) {
      arr[i] = 16777215 - colorRow;
    });
  }
  return bmpFile;
}

describe('read bitmaps', function() {
  it('read file header 424d; 8bpp-file', function() {
    expect(transform.readBmp('./bitmap1.bmp', transformBmp).header).to.eql('424d');
  });
  // it('read file size 11078', function() {
  //   expect(transform.readBmp('./bitmap1.bmp').fileSize).to.eql(11078);
  // });
  // it('read picture width 100px', function() {
  //   expect(transform.readBmp('./bitmap1.bmp').width).to.eql(100);
  // });
  // it('read picture height 100px', function() {
  //   expect(transform.readBmp('./bitmap1.bmp').height).to.eql(100);
  // });
  // it('read picture bits per pixel of 8', function() {
  //   expect(transform.readBmp('./bitmap1.bmp').bpp).to.eql(8);
  // });
  // it('transforms the file', function() {
  //   expect(transform.transformBmp(transform.readBmp('./bitmap1.bmp')).colorPal[28]).to.eql(16777215-14243683);
  // });
  it('writes the file by checking the first bytes of the new file', function() {
    expect(transform.writeBmp(transform.readBmp('./bitmap1.bmp', transformBmp),'./bitmap1.bmp')).to.eql('424d'); //
  });

  describe('transforms non palette bitmap', function() {
    it('read file header 424d; 24bpp-file', function() {
      expect(transform.readBmp('./non-palette-bitmap.bmp', transformBmp).header).to.eql('424d');
    });
    // it('read file size 30054', function() {
    //   expect(transform.readBmp24('./non-palette-bitmap.bmp').fileSize).to.eql(30054);
    // });
    // it('read picture width 100px', function() {
    //   expect(transform.readBmp24('./non-palette-bitmap.bmp').width).to.eql(100);
    // });
    // it('read picture height 100px', function() {
    //   expect(transform.readBmp24('./non-palette-bitmap.bmp').height).to.eql(100);
    // });
    // it('read picture bits per pixel of 24', function() {
    //   expect(transform.readBmp('./non-palette-bitmap.bmp').bpp).to.eql(24);
    // });
    it('writes the file by checking the first bytes of the new file', function() {
      expect(transform.writeBmp(transform.readBmp('./non-palette-bitmap.bmp', transformBmp),'./non-palette-bitmap.bmp')).to.eql('424d'); //
    });
  });

});
