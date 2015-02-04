'use strict';

/**
 * @ngdoc function
 * @name promiseApp.service:authService
 * @description
 */
angular.module('promiseApp')
  .service('authService', [
    'userService',
    '$location',
    '$rootScope',
    '$q',
    '$firebaseAuth',
    'originalRequest',
    'localStorageService',
    'fbDemo',
    function authService(
      userService,
      $location,
      $rootScope,
      $q,
      $firebaseAuth,
      originalRequest,
      localStorageService,
      fbDemo
    ) {

    var auth = $firebaseAuth(fbDemo.ref);


    /**
    * @ngdoc method
    * @methodOf promiseApp.service:authService
    * @name promiseApp.service:authService#isLoggedin
    * @requires $q
    * @requires userService
    * @requires originalRequest
    * @description
    * Promise that checks to ensure that user is
    * authenticated. If not, redirect to /login.
    * Also, leverages the originalRequest service
    * to direct the user where they wanted to go
    * once authenticated.
    */
    this.isLoggedin =  function isLoggedin() {

      var dfd = $q.defer(),
        requestedPath = $location.url();

      if (userService.name) {
        dfd.resolve(requestedPath);
      } else {
        dfd.reject();
        originalRequest.set(requestedPath);
        $location.path('/login');
      }

      return dfd.promise;

    };


    /**
    * @ngdoc method
    * @methodOf promiseApp.service:authService
    * @name promiseApp.service:authService#postData
    * @requires $firebaseAuth
    * @requires fbDemo
    * @description
    * Performs a post to the Firebase auth endpoint
    * via AngularFire.
    */
    this.postData = function postData(user, pw) {

      var userObject = {
        email: user,
        password: pw
      };

      return auth.$authWithPassword(userObject)
              .then(function(rsp) {
                console.log('User authenticated with firebase.');
                return rsp;
              });

    };


    /**
    * @ngdoc method
    * @methodOf promiseApp.service:authService
    * @name promiseApp.service:authService#saveLocal
    * @requires $q
    * @requires localStorageService
    * @description
    * Saves the returned user data to local store.
    */
    this.saveLocal = function saveLocal(data) {

      var dfd = $q.defer();

      localStorageService.set('user', data);

      dfd.resolve();

      console.log('Saved to localstore ', data);

      return dfd.promise;

    };


    /**
    * @ngdoc method
    * @methodOf promiseApp.service:authService
    * @name promiseApp.service:authService#redirect
    * @requires $rootScope
    * @requires userService
    * @requires originalRequest
    * @description
    * Updates the user object in memory via userService
    * and emits LOGIN_SUCCESS to the admin control.
    * If the user has requested a route and was bounced
    * due to not being authenticated to grab that route
    * and redirect them there.
    */
    this.redirect = function redirect() {

      userService.init();
      $rootScope.$emit('LOGIN_SUCCESS', true);
      console.log('Redirecting');

      var path = originalRequest.get(),
          newPath;

          newPath = path ? path : '/';

      return $location.path(newPath);
    };


  }]);
