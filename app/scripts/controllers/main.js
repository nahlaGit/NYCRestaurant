'use strict';

require('../filters');
require('../services/selectedvenue');
require('../services/filtercontrols');


angular.module('myApp')
  .controller('MainCtrl', (['$scope', '$http', '$resource', '$filter', '$location', '$rootScope', 'SelectedVenue', 'FilterControls',
    function ($scope, $http, $resource, $filter, $location, $rootScope, SelectedVenue, FilterControls) {

    // Store shared state on $scope
    $scope.filterControls = FilterControls;
    $scope.selected = SelectedVenue;

    // Source the filters
    var boroughFilter = $filter('boroughFilter');
    var categoryFilter = $filter('categoryFilter');
    var nameFilter = $filter('nameFilter');
    var paginateFilter = $filter('paginateFilter');
    var casecmp = $filter('casecmp');

    $scope.static = {
      boroughs: ['bronx', 'brooklyn', 'manhattan', 'queens'],
      categories: ['asian', 'mexican', 'sandwiches', 'thai', 'american', 'cuban', 'italian', 'diner', 'seafood',
                   'south american', 'café', 'BBQ', 'ice cream', 'gastropub', 'bakery', 'greek', 'ramen / noodles',
                   'vegetarian / vegan', 'latin american', 'new american', 'french', 'pizza'].sort(casecmp),
      pageSize: 20
    };

    $scope.data = {
      currentPage: 0,
      venues: {}
    };

    // Fetch the venues
    $scope.data.venues = $resource('api/venues', {}, {}).query();

    // Setup watch to circle back to 0 everytime groupedResults change
    $scope.$watch('data.groupedResults().length', function() {
      $scope.data.currentPage = 0;
    });

    $scope.data.numPages = function() {
      return Math.ceil($scope.data.groupedResults().length / $scope.static.pageSize);
    };

    $scope.data.pages = function() {
      if (!$scope.data.groupedResults()) {
        return ['1'];
      }

      var pages = [];

      for(var page = 0; page < $scope.data.numPages(); page++) {
        pages.push((page+1).toString());
      }
      return pages;
    };

    $scope.data.groupedResults = function() {
      var result = boroughFilter($scope.data.venues, $scope.filterControls.boroughSelector);
      result = categoryFilter(result, $scope.filterControls.categorySelector);
      result = nameFilter(result, $scope.filterControls.nameSelector);

      return result;
    };

    $scope.data.pagedResults = function() {
      return paginateFilter($scope.data.groupedResults(), $scope.data.currentPage, $scope.static.pageSize);
    };

    $scope.jumpToPage = function(page) {
      if (page >= 1 && page <= $scope.data.numPages())
      {
        $scope.data.currentPage = page - 1;
      }
    };

    $scope.prevPage = function () {
      if ($scope.data.currentPage === 0) {
        return;
      }
      $scope.data.currentPage -= 1;
    };

    $scope.nextPage = function () {
      if ($scope.data.numPages() === 0) {
        return;
      }

      if ($scope.data.currentPage === ($scope.data.numPages() - 1)) {
        return;
      }

      $scope.data.currentPage += 1;
    };

    $scope.changeView = function(view, selected) {
      // Store selected state on the shared service
      $scope.selected.venue = selected;

      // Append resource
      view += window.encodeURIComponent(selected.id);

      // Activate detail view
      $location.path(view);
    };
  }
  ]));
