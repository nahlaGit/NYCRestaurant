'use strict';

describe('Service: SelectedVenue', function () {

  // load the service's module
  beforeEach(module('myApp'));

  // instantiate service
  var SelectedVenue;
  beforeEach(inject(function (_SelectedVenue_) {
    SelectedVenue = _SelectedVenue_;
  }));

  it('should return an empty object', function () {
    expect(!!SelectedVenue).toBe(true);
    expect(angular.equals(SelectedVenue, {venue: undefined})).toBeTruthy();
  });

});
