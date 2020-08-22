'use strict';

angular.module('myApp')
  .factory('FilterControls', function() {
    return {
      // Not that undefined matters, but we are declaring here
      // what this service is going to keep as state
      boroughSelector: undefined,
      categorySelector: undefined,
      nameSelector: undefined
    };
  });

