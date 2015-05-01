'use strict';
var expect = require('chai').expect;
var transform = require('../transform');

describe('read bitmaps', function() {
  // describe('transforms bitmap1', function() {
  //   it('read file header 424d', function() {
  //     expect(transform.readBmp('./bitmap1.bmp').header).to.eql('424d');
  //   });
  //   it('read file size 11078', function() {
  //     expect(transform.readBmp('./bitmap1.bmp').fileSize).to.eql(11078);
  //   });
  //   it('read picture width 100px', function() {
  //     expect(transform.readBmp('./bitmap1.bmp').width).to.eql(100);
  //   });
  //   it('read picture height 100px', function() {
  //     expect(transform.readBmp('./bitmap1.bmp').height).to.eql(100);
  //   });
  //   it('read picture bits per pixel of 8', function() {
  //     expect(transform.readBmp('./bitmap1.bmp').bpp).to.eql(8);
  //   });
  // });

  describe('transforms non palette bitmap', function() {
    // it('read file header 424d', function() {
    //   expect(transform.readBmp24('./non-palette-bitmap.bmp').header).to.eql('424d');
    // });
    // it('read file size 30054', function() {
    //   expect(transform.readBmp24('./non-palette-bitmap.bmp').fileSize).to.eql(30054);
    // });
    it('read picture width 100px', function() {
      expect(transform.readBmp24('./non-palette-bitmap.bmp').width).to.eql(100);
    });
    // it('read picture height 100px', function() {
    //   expect(transform.readBmp24('./non-palette-bitmap.bmp').height).to.eql(100);
    // });
    // it('read picture bits per pixel of 24', function() {
    //   expect(transform.readBmp('./non-palette-bitmap.bmp').bpp).to.eql(24);
    // });
  });

});
