//'use strict';

var angular = require('angular');
var ngResource = require('angular-resource');

angular.module('myApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'localytics.directives',
  'leaflet-directive'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/detail/:id', {
        templateUrl: 'partials/detail',
        controller: 'DetailCtrl',

      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope) {

    var upcase = function(string) {
      if (!string) {
        return '';
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    var filterByBorough = function(venues, boroughs) {
      if (!boroughs || (boroughs.length === 0)) {
        return venues;
      }

      return venues.filter(function(venue) {
        for (var i = 0; i < boroughs.length; i++) {
          if (venue.location.city === upcase(boroughs[i])) {
            return true;
          }
        }

        return false;
      });
    };

    var filterByCategory = function(venues, categories) {
      if (!categories || (categories.length === 0)) {
        return venues;
      }

      return venues.filter(function(venue) {
        for (var i = 0; i < categories.length; i++) {
          if (venue.categories[0].shortName.toLowerCase() === categories[i].toLowerCase()) {
            return true;
          }
        }

        return false;
      });
    };

    var filterByName = function(venues, name) {
      if (!name || name.length < 3) {
        return venues;
      }

      var names = name.split(' ');

      return venues.filter(function(venue) {
        for (var i = 0; i < names.length; i++) {
          var lhs = venue.name.toLowerCase();
          var rhs = names[i].toLowerCase();
          if(lhs.indexOf(rhs) !== -1) {
            return true;
          }
        }

        return false;
      });
    };


    $rootScope.utils = {
      upcase: upcase,
      filterByBorough: filterByBorough,
      filterByCategory: filterByCategory,
      filterByName: filterByName
    };
  });

  require('./controllers/main');
  require('./controllers/detail');
  require('./controllers/navbar');
