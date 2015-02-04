'use strict';

/**
 * @ngdoc function
 * @name promiseApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the promiseApp
 */
angular.module('promiseApp')
  .controller('AdminCtrl', function AdminCtrl(
    $rootScope,
    $scope,
    $firebaseAuth,
    $location,
    localStorageService,
    userService,
    fbDemo,
    originalRequest) {

    $rootScope.$on('LOGIN_SUCCESS', function loginSuccess() {
      $scope.loggedin = true;
      $scope.username = userService.name;
    });


    $scope.init = function init() {

      if (userService.name) {
        $scope.loggedin = true;
        $scope.username = userService.name;
      } else {
        $scope.loggedin = false;
        $scope.username = null;
      }

    };


    $scope.logout = function logout() {
      console.log('Attempted to log user out.');
      fbDemo.ref.unauth();
      $scope.loggedin = false;
      $scope.username = null;
      localStorageService.set('user', null);
      userService.clear();
      originalRequest.set(null);
      $location.path('/login');
    };


    // Init Controller
    $scope.init();

  });
