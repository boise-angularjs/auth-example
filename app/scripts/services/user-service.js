'use strict';

/**
 * @ngdoc function
 * @name promiseApp.service:userService
 * @description
 */
angular.module('promiseApp')
  .service('userService', function userService(localStorageService) {

    var self = this;

    /**
    * @ngdoc method
    * @methodOf promiseApp.service:userService
    * @name promiseApp.service:userService#init
    * @requires localStorageService
    * @description
    * Grabs the user data available in local store
    * and sets it in memory.
    */
    self.init = function init() {

      var user = localStorageService.get('user');

      self.name = user ? user.password.email : null;

    };


    /**
    * @ngdoc method
    * @methodOf promiseApp.service:userService
    * @name promiseApp.service:userService#clear
    * @requires localStorageService
    * @description
    * Set in memory user data to null.
    */
    self.clear = function clear() {
      self.name = null;
    };


    /*
    * If user data is available at runtime init
    * our user data in memory.
    */
    if (localStorageService.get('user')) {
      self.init();
    }

  });