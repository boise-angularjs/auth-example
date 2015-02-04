'use strict';

/**
 * @ngdoc function
 * @name promiseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the promiseApp
 */
angular.module('promiseApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
