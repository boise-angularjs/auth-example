'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('promiseApp'));

  var LoginCtrl,
      scope,
      q,
      dfd,
      userService,
      authService,
      originalRequest,
      localStorageService,
      location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _userService_, _originalRequest_, $location, _authService_, $q, _localStorageService_) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
    userService = _userService_;
    originalRequest = _originalRequest_;
    location = $location;
    authService = _authService_;
    q = $q;
    localStorageService = _localStorageService_;
  }));

  afterEach(function() {
    localStorageService.set('user', null);
  });

  /*
  * Individually test each function
  * then call login and ensure that
  * all the functions are called via
  * watches.
  * */

});
