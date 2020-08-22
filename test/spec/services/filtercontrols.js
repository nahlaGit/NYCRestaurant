'use strict';

describe('Service: FilterContols', function () {

  // load the service's module
  beforeEach(module('myApp'));

  // instantiate service
  var FilterControls;
  beforeEach(inject(function (_FilterControls_) {
    FilterControls = _FilterControls_;
  }));

  it('should return an empty object', function () {
    expect(!!FilterControls).toBe(true);
    expect(angular.equals(FilterControls, {boroughSelector: undefined, categorySelector: undefined, nameSelector: undefined})).toBeTruthy();
  });

});
