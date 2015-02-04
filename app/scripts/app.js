'use strict';

/**
 * @ngdoc overview
 * @name promiseApp
 * @description
 * # promiseApp
 *
 * Main module of the application.
 */
angular
  .module('promiseApp', [
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {

    // Authentication API
    var auth = {
        check: ['authService', function(authService) {
          return authService.isLoggedin();
        }]
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: auth.check
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: auth.check
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
