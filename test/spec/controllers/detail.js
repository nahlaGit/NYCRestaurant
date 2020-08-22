'use strict';

describe('Controller: DetailCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var controllerFactory,
    scope,
    $httpBackend,
    sourcedVenue,
    _SelectedVenue;

  function createController() {
    return controllerFactory('DetailCtrl', {
      $scope: scope,
      // for smith canteen, may not be used if venue set in shared service
      $routeParams: {id: '4decca141f6e3ddebe06c5ef'}
    });
  }

  // Initialize the controller and a mock scope
  beforeEach(function() {
    module(function($provide) {
      $provide.value('SelectedVenue', {venue: undefined});
    });
    inject(function (_$httpBackend_, $controller, $rootScope, SelectedVenue) {
      jasmine.getJSONFixtures().fixturesPath ='base/test/mock';
      sourcedVenue = getJSONFixture('4decca141f6e3ddebe06c5ef.json');

      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();

      // Store injected services in outermost describe for access in all tests
      _SelectedVenue = SelectedVenue;

      controllerFactory = $controller;
    });
  });

  describe('SelectedVenue integration:', function() {
    it('should set selected to point to shared Service: SelectedVenue', function () {
      createController();
      expect(scope.selected).toBe(_SelectedVenue);
    });
  });

  describe('Common between sourcing and no-sourcing case: ', function() {
    it('should provide base skeleton for leaflet if venue not set', function() {
      createController();

      expect(scope.center).toBeDefined();
      expect(scope.markers).toBeDefined();
      expect(scope.defaults).toBeDefined();
    });
  });

  describe('No sourcing required case: ', function(){
    it('should simply take selected from SelectedVenue service and setup leaflet', function() {
      _SelectedVenue.venue = sourcedVenue;
      createController();

      expect(scope.selected.venue).toBe(_SelectedVenue.venue);

      expect(angular.equals(_SelectedVenue, scope.selected)).toBeTruthy();
      expect(angular.equals(scope.selected.venue, sourcedVenue)).toBeTruthy();

      // Leaflet setup verification
      expect(scope.center).toBeDefined();
      expect(scope.markers).toBeDefined();
      expect(scope.defaults).toBeDefined();

      expect(scope.center.lat).toBe(scope.selected.venue.location.lat);
      expect(scope.center.lng).toBe(scope.selected.venue.location.lng);

      expect(scope.markers.venueMarker).toBeDefined();
      expect(scope.markers.venueMarker.lat).toBe(scope.selected.venue.location.lat);
      expect(scope.markers.venueMarker.lng).toBe(scope.selected.venue.location.lng);
    });
  });

  describe('Sourcing required case: ', function(){
    it('should set selected to the resourced venue if not already set', function() {
      createController();

      $httpBackend.expectGET('api/venues/4decca141f6e3ddebe06c5ef').respond(sourcedVenue);
      $httpBackend.flush();
      expect(angular.equals(_SelectedVenue, scope.selected)).toBeTruthy();
      expect(angular.equals(scope.selected.venue, sourcedVenue)).toBeTruthy();
    });

    it('should furthermore set leaflet center and markers when venue is set', function() {
      createController();

      expect(scope.center).toBeDefined();
      expect(scope.markers).toBeDefined();
      expect(scope.defaults).toBeDefined();

      $httpBackend.expectGET('api/venues/4decca141f6e3ddebe06c5ef').respond(sourcedVenue);
      $httpBackend.flush();
      expect(angular.equals(_SelectedVenue, scope.selected)).toBeTruthy();
      expect(angular.equals(scope.selected.venue, sourcedVenue)).toBeTruthy();

      expect(scope.center.lat).toBe(scope.selected.venue.location.lat);
      expect(scope.center.lng).toBe(scope.selected.venue.location.lng);

      expect(scope.markers.venueMarker).toBeDefined();
      expect(scope.markers.venueMarker.lat).toBe(scope.selected.venue.location.lat);
      expect(scope.markers.venueMarker.lng).toBe(scope.selected.venue.location.lng);
    });
  });
});
