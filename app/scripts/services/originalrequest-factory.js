'use strict';

/**
 * @ngdoc function
 * @name promiseApp.factory:originalRequest
 * @description
 */
angular.module('promiseApp')
  .factory('originalRequest', function originalRequest() {

    var path = null;

    return {

      /**
      * @ngdoc method
      * @methodOf promiseApp.factory:originalRequest
      * @name promiseApp.factory:originalRequest#set
      * @description
      * Stashes the requested path in memory.
      */
      set : function set(newPath) {
        path = newPath;
      },


      /**
      * @ngdoc method
      * @methodOf promiseApp.factory:originalRequest
      * @name promiseApp.factory:originalRequest#get
      * @description
      * Clears out any stashes path in memory.
      */
      get: function get() {
        return path;
      }

    };

  });