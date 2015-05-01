'use strict';
var expect = require('chai').expect;
var transform = require('../transform');

describe('transforms bmp files', function(){

  it('should read the file header correctly', function() {
    expect(transform.readBmp('./tru256.bmp').header).to.eql('424d');
    expect(transform.readBmp('./tru256.bmp').fileSize).to.eql('49206');
  });
});
