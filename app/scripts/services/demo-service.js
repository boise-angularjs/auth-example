'use strict';

/**
 * @ngdoc function
 * @name promiseApp.service:fbDemo
 * @description
 */
angular.module('promiseApp')
  .service('fbDemo', ['FB', function fbDemo(FB) {
    this.ref = new Firebase(FB);
  }]);
