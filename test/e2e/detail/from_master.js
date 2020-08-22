'use strict';

describe('detail:', function() {
  before(function() {
    return casper.start('http://localhost:9000');
  });

  describe('Navigate from master:', function() {
    it('should display detail for clicked restaurant', function() {
      var venue = xpath('//a[text()="Hard Rock Cafe Yankee Stadium"]');
      casper.then(function() {
        casper.waitForSelector(venue,
          function success() {
            expect(this.exists(venue)).to.equal(true);
            this.click(venue);
          },
          function fail() {
            expect(this.exists(venue)).to.equal(true);
          }
        );
      });

      casper.then(function() {
        expect(this.getCurrentUrl()).to.equal('http://localhost:9000/detail/4ab659aff964a520b17620e3#top');
        });
      });
  });
});
