'use strict';

/**
 * @ngdoc function
 * @name promiseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the promiseApp
 */
angular.module('promiseApp')
  .controller('LoginCtrl', function LoginCtrl(
    $scope,
    fbDemo,
    authService) {

    var authData = fbDemo.ref.getAuth();

    /**
    * @ngdoc function
    * @methodOf promiseApp.controller:LoginCtrl
    * @name promiseApp.controller:LoginCtrl#login
    * @param {string} user Email acting as username
    * @param {string} pw User's password
    * @requires $firebaseAuth
    * @requires promiseApp.service:fbDemo
    * @description
    * Login function that passes in the scoped fields
    * and initializes the login promise chain.
    */
    $scope.login = function login(user, pw) {

      // Init Promise Chain
      authService.postData(user, pw)
        .then(authService.saveLocal)
        .then(authService.redirect);

    };


    /**
    * @ngdoc function
    * @methodOf promiseApp.controller:LoginCtrl
    * @name promiseApp.controller:LoginCtrl#isAuth
    * @requires $firebaseAuth
    * @description
    * Just a little function that lets you check
    * current state.
    */
    $scope.isAuth = function isAuth() {
      if (authData) {
        console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
      } else {
        console.log('User is logged out');
      }
    };

  });
