'use strict';

//constants
var WIDTH = 3;
var HEIGHT = 3;
var MATCH_COUNT = 3;  //how many in-a-row must match?

var neighborOffsets = [
  {x: -1, y: 0},
  {x: -1, y: -1},
  {x: 0, y: -1},
  {x: 1, y: -1}
];

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
  // setup properties
  $scope.width = WIDTH;
  $scope.height = HEIGHT;
  $scope.matchCount = MATCH_COUNT;
  var values = [];
  for (var i = 0; i < $scope.height; i++) {
    var innerValues = [];
    for (var j = 0; j < $scope.width; j++) {
      innerValues.push(' ');
    }
    values.push(innerValues);
  }
  $scope.values = values;

  // gameplay properties
  $scope.turnNum = 0;
  $scope.handleClick = function(values, index, parentIndex) {
    if ($scope.winningMessage) {
      alert('The game is already over... give up!');
      return;
    }
    if (values[index] === ' ') {
      var marking;
      if ($scope.turnNum % 2 == 0) {
        marking = 'X';
      } else {
        marking = 'O';
      }
      values[index] = marking;
      $scope.turnNum++;
      $scope.evaluateGrid(index, parentIndex);
    }
  };
  $scope.evaluateGrid = function(xIndex, yIndex) {
    var marking = $scope.values[yIndex][xIndex];
    for (var i = 0; i < neighborOffsets.length; i++) {
      var offset = neighborOffsets[i];
      var neighborX = offset.x + xIndex;
      var neighborY = offset.y + yIndex;
      var numMatches = 1;
      numMatches = $scope.addToMatchCount(marking, neighborX, neighborY, offset.x, offset.y, numMatches);

      var invertedOffsetX = offset.x * -1;
      var invertedOffsetY = offset.y * -1;
      var invertedNeighborX = invertedOffsetX + xIndex;
      var invertedNeighborY = invertedOffsetY + yIndex;
      numMatches = $scope.addToMatchCount(marking, invertedNeighborX, invertedNeighborY, invertedOffsetX, invertedOffsetY, numMatches);

      if (numMatches >= $scope.matchCount) {
        //todo: you win!
        $scope.winningMessage = marking + 'Won! ' + marking + ' Won!! ' + marking + ' Won!!!';
        setTimeout(function() {
          alert($scope.winningMessage)
        }, 100);
        break;
      }
    }
  };
  $scope.addToMatchCount = function(marking, xIndex, yIndex, deltaX, deltaY, numMatches) {
    if (xIndex >= 0 &&
        xIndex < $scope.width &&
        yIndex >= 0 &&
        yIndex < $scope.height &&
        marking === $scope.values[yIndex][xIndex]) {
      numMatches++;
      numMatches = $scope.addToMatchCount(marking, xIndex + deltaX, yIndex + deltaY, deltaX, deltaY, numMatches);
    }
    return numMatches;
  }
}]);