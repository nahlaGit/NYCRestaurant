'use strict';

describe('page header:', function() {
  before(function() {
    return casper.start('http://localhost:9000');
  });

  it('should match title', function() {
    casper.waitForSelector('.container', function() {
      casper.then(function() {
        'NYCRestaurantBrowser'.should.matchTitle;
      });
    });
  });
});
