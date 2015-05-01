'use strict';
var expect = require('chai').expect;
var transform = require('../transform');

describe('transforms bmp files', function(){

  it('should bmp file header correctly', function() {
    expect(transform.readBmp('./tru256.bmp')).to.eql('424d');
  });
});
