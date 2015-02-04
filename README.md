# Authentication Example [![Build Status](https://travis-ci.org/boise-angularjs/auth-example.svg?branch=master)](https://travis-ci.org/boise-angularjs/auth-example)

### Overview
This is an example of how you can use the promise api in AngularJS in both your authentication process and routing. This example uses the following:

* Firebase + AngularFire
* Angular-Local-Storage [see project](https://github.com/grevory/angular-local-storage)
* The $q constructor

### Local Setup

This demo uses [Firebase](https://www.firebase.com/), a nice little *free* JSON store with a slick GUI. While I'm using it here you can still apply the same techniques I use to other solutions (Django DRF, Oauth, etc).

To get this running locally do the following:

1. Create a Firebase account and create an app
2. Enable Email & Password Authentication *(Figure 1)*
3. Add a test user and pw *(Figure 2)*
4. Update the path to you point at your Firebase in `fb-constant.js`
5. Clone the repo locally and install deps

- - -

![Alt text](https://s3-us-west-2.amazonaws.com/tpopensource/boise-angularjs/check.png)

###### *Figure 1 - Enable username & pw*

- - -

![Alt text](https://s3-us-west-2.amazonaws.com/tpopensource/boise-angularjs/user.png)

###### *Figure 2 - Add a user*

- - -

### Putting Promises to work
> Promises are great as a callback replacement/alternative. Not only to they promise (IMO) a cleaner interface they also allow you to ensure certain async tasks perform in a synchronous manner.

*For more on promises see the [official documentation](https://docs.angularjs.org/api/ng/service/$q).*

The two places in the application where I use promises are in my *authentication pipeline* and in my *routing*.

##### Auth Pipeline
Located in `auth-service` I create methods that are already configured with the promise API plus a programmatic implementation in `saveLocal()`. Where this becomes really power is in it's implementation when these methods are **chained**. Please feel free to look at the code in detail in `login.js`, but here is the snippet.

```js

// Init Promise Chain in login.js
authService.postData(user, pw)
    .then(authService.saveLocal)
    .then(authService.redirect);
```

This allows me to perform some really neat, really powerful method chaining. I'm able to only save user-related data to localstore once authentication is successful and then only redirect the user once all the data is saved locally.

##### Route Control
Sometimes we want to restrict routes to users. For instance, we don't want un-authenticated users accessing any routes within the app until the authenticate themselves. We could check our `userService` or `localStorage` to see if that user in authenticated in the controller, but that would be redundant. Plus, we would allow that controller code to run–albeit brief. This is where Angular `$routeProvider` comes into play. `$routeProvider` takes a config key called "resolve" which is built to interface with promises.

###### *Intercepting*
This is where we get some really slick functionality out of the box with Angular. In `app.js` you can see the `auth` object which returns a method on my `authService`. This approach allows me to tap into a service from within my config block. This particular method performs a promise to ensure that the user is authenticated before allowing access to the template and controller. If the user isn't authenticated then that user is bounced to the login view.


```js
// app.js
var auth = {
    check: ['authService', function(authService) {
      return authService.isLoggedin();
    }]
};
```

```js
// app.js
.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: auth.check
      })
```

```js
// auth-service.js
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
```

### Extra Goodies
A couple other notable things are in this app. First is the `original-request-factory.js`, a neat little provider I created to stash requests users make when not authenticated. Once that user logs in we route them to their originally requested destination.
The other thing I would like to point out is the use of `karma-coverage` which uses `Istanbul` to create reports based on your unit test specs and how much they are actually covering. If you're serious about unit testing this tool is invaluable.
Disclaimer, I wasn't able to get everything in here to 100% code coverage with the amount of time I had to prepare this project. For anyone who is new to the tool please feel free to clone and play around and perhaps even submit a PR!

### Conclusion
Hopefully through this guide and by stepping through this code you are able to have a nice playground for both interaction with authentication as well as promises.
If there are any questions or comments please hit me up on the twitters at [@scott_sword](https://twitter.com/scott_sword). Cheers.
