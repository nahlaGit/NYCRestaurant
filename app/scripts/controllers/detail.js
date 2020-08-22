'use strict';

require('../services/selectedvenue');

angular.module('myApp')
  .controller('DetailCtrl', (['$scope', '$http', '$location', '$resource', '$routeParams', 'SelectedVenue',
      function($scope, $http, $location, $resource, $routeParams, SelectedVenue) {

    // Scroll to top no matter how the controller originates
    $location.hash('top');

    $scope.selected = SelectedVenue;

    if (! $scope.selected.venue) {
      // We have been invoked directly, fetch 1 record
      $resource('api/venues/' + $routeParams.id, {}, {}).get(function(venue) {
        // Promise resolved, refocus center and add marker
        $scope.selected.venue = venue;
        $scope.center.lat = venue.location.lat;
        $scope.center.lng = venue.location.lng;

        angular.extend($scope.markers, {
          venueMarker: {
            lat: venue.location.lat,
            lng: venue.location.lng,
            message: venue.location.address,
            focus: true,
            draggable: false
          }
        });
      });
    }

    // Define $scope skeleton to support leaflet, choose NYC for center, if venue not set
    angular.extend($scope, {
      center: {
        lat: $scope.selected.venue ? $scope.selected.venue.location.lat : 40.67,
        lng: $scope.selected.venue ? $scope.selected.venue.location.lng : -73.94,
        zoom: 16
      },
      markers: {
      },
      defaults: {
        scrollWheelZoom: false,
      }
    });

    // Add a marker if the venue is set
    if ($scope.selected.venue) {
      angular.extend($scope.markers, {
        venueMarker: {
          lat: $scope.selected.venue.location.lat,
          lng: $scope.selected.venue.location.lng,
          message: $scope.selected.venue.location.address,
          focus: true,
          draggable: false
        }
      });
    }

    $scope.goBack = function() {
      $scope.selected.venue = undefined;
      $location.path('/');
    };
  }
  ]));
