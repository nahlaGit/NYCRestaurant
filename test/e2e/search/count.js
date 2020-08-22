'use strict';

describe('search:', function() {
  before(function() {
    return casper.start('http://localhost:9000');
  });

  describe('count:', function() {
    it('should contain 40 results', function() {
      casper.waitForSelector('.container', function() {
        casper.then(function() {
          'p#no-results'.should.not.be.visible;
          'p#results-count'.should.be.inDOM.and.be.visible;
          'p#results-count'.should.have.text('Showing 1-20 of 40 results');
        });
      });
    });
  });
});
