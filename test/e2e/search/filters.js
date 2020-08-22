'use strict';

describe('search:', function() {
  before(function() {
    casper.start('http://localhost:9000');
    casper.waitForSelector('form#filter-form');
  });

  describe('filters:', function() {
    beforeEach(function() {
      casper.fill('form#filter-form', {
        'boroughSelector': [],
        'categorySelector': [],
        'nameSelector': ''
      }, true);
    });

    it('should have borough choices in page', function() {

      casper.then(function() {
        'Borough'.should.be.textInDOM;
        'Bronx'.should.be.textInDOM;
        'Brooklyn'.should.be.textInDOM;
        'Manhattan'.should.be.textInDOM;
        'Queens'.should.be.textInDOM;
      });
    });

    it('should have category choices in page', function() {
      var upcase = function(string) {
        if (!string) {
          return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      var categories = ['asian', 'mexican', 'sandwiches', 'thai', 'american', 'cuban', 'italian', 'diner', 'seafood',
             'south american', 'café', 'BBQ', 'ice cream', 'gastropub', 'bakery', 'greek', 'ramen / noodles',
             'vegetarian / vegan', 'latin american', 'new american', 'french', 'pizza'];
      casper.then(function() {
        'Category'.should.be.textInDOM;
        for (var i = 0; i < categories.length; i++) {
          upcase(categories[i]).should.be.textInDOM;
        }
      });
    });

    it('should have name selector in page', function() {

      casper.then(function() {
        'Name'.should.be.textinDOM;
      });
    });

    it('should filter by multiple boroughs', function() {
      casper.then(function(){
        this.fill('form#filter-form', {
          'boroughSelector': ['0', '1', '2']
        }, true);

        'p#results-count'.should.have.text('Showing 1-20 of 30 results');
      });
    });

    it('should filter by multiple categories', function() {
      casper.then(function(){
        this.fill('form#filter-form', {
          'categorySelector': ['0', '2'] // American, Bakery
        }, true);

        'p#results-count'.should.have.text('Showing 1-6 of 6 results');
      });
    });

    it('should filter by name', function() {
      casper.then(function(){
        this.fill('form#filter-form', {
          'nameSelector': 'thai' //Thai
        }, true);
        'p#results-count'.should.have.text('Showing 1-1 of 1 results');
      });
    });
  });
});
