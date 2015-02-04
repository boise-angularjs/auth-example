'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('promiseApp'));

  var AdminCtrl,
      scope,
      localStorageService,
      userService,
      originalRequest,
      location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _localStorageService_, _userService_, _originalRequest_, $location) {
    scope = $rootScope.$new();
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
    localStorageService = _localStorageService_;
    userService = _userService_;
    originalRequest = _originalRequest_;
    location = $location;
  }));

  afterEach(function() {
    localStorageService.set('user', null);
  });

  it('when event the LOGIN_SUCCESS fires', function() {
    localStorageService.set('user', {
      password: {
        email: 'Boba Fett'
      }
    });
    userService.init();
    scope.$emit('LOGIN_SUCCESS', true);
    scope.$apply();
    expect(scope.loggedin).toBe(true);
    expect(scope.username).toBe('Boba Fett');
  });

  it('when user isnt authenticated', function() {
    localStorageService.set('user', null);
    userService.init();
    scope.$apply();
    expect(scope.loggedin).toBe(false);
    expect(scope.username).toBe(null);
  });

  it('when user is authenticated', function() {
    localStorageService.set('user', {
      password: {
        email: 'Boba Fett'
      }
    });
    userService.init();
    scope.init();
    scope.$apply();
    expect(scope.loggedin).toBe(true);
  });

  it('when logout fires', function() {
    // Ensure user is logged in.
    localStorageService.set('user', {
      password: {
        email: 'Boba Fett'
      }
    });
    userService.init();
    scope.init();
    scope.$apply();
    expect(scope.loggedin).toBe(true);
    spyOn(userService, 'clear');

    // Log user out.
    scope.logout();
    scope.$apply();
    expect(scope.loggedin).toBe(false);
    expect(scope.username).toBe(null);
    expect(localStorageService.get('user')).toBe(null);
    expect(originalRequest.get()).toBe(null);
    expect(userService.clear).toHaveBeenCalled();
    expect(location.path()).toBe('/login');
  });

});
