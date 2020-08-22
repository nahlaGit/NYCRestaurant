'use strict';

angular.module('myApp')
  .factory('SelectedVenue', function() {
    return {
      // Not that undefined matters, but we are declaring here
      // what this service is going to keep as state
      venue: undefined
    };
  });