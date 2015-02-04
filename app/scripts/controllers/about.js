'use strict';

/**
 * @ngdoc function
 * @name promiseApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the promiseApp
 */
angular.module('promiseApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
