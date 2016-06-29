'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view3', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl'
    });
}])

.controller('View3Ctrl', ['$scope', function($scope) {
    $scope.people = [{
        name: 'Bob Odenkirk',
        city: 'New York'
    }, {
        name: 'Bob Chowder',
        city: 'Los Angeles'
    }, {
        name: 'Chuck Borris',
        city: 'San Francisco'
    }, {
        name: 'Mary Grill',
        city: 'Salt Lake City'
    }];
}]);