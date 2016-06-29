angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.evalRegex = /^([0-9]+ [\+\-*/] )*[0-9]+$/g;
  $scope.appendRegex = /^([0-9]+( [\+\-*/] )?)+$/g;
  $scope.calcText = '';
  $scope.values = [
      ['1', '2', '3', ' + '],
      ['4', '5', '6', ' - '],
      ['7', '8', '9', ' * '],
      ['=', 'C', '0', ' / ']
  ];
  $scope.handleClick = function(value) {
    if (value === '=') {
      $scope.evalText();
    } else if (value === 'C') {
      $scope.calcText = '';
      $scope.answer = '';
    } else {
      $scope.appendText(value);
    }
  };
  $scope.appendText = function(text) {
    var newText = $scope.calcText + text;
    if (newText.replace($scope.appendRegex, '&') === '&') {
      $scope.calcText = newText;
    }
  };
  $scope.evalText = function() {
    var text = $scope.calcText;
    if (text.replace($scope.evalRegex, '&') === '&') {
      $scope.answer = eval('(' + text + ')');
    }
  }
}]);