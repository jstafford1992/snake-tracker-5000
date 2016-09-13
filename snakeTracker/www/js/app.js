// Ionic snekTrakr App
'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'snekTrakr' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'snekTrakr.services' is found in services.js
// 'snekTrakr.controllers' is found in controllers.js
angular.module('snekTrakr', ['ionic', 'snekTrakr.controllers', 'snekTrakr.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.login', {
    url: '/login',
    views: {
      'login': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('tab.snakesList', {
      url: '/snakesList',
      views: {
        'snakesList': {
          templateUrl: 'templates/snakes-list.html',
          controller: 'snakesCtrl'
        }
      }
    })
    .state('tab.snake-details', {
      url: '/snakesList/:snakesId',
      views: {
        'snakesList': {
          templateUrl: 'templates/snake-details.html',
          controller: 'snakesDetailsCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'account': {
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.add-snake', {
    url: '/snakesList/new',
    views: {
      'add-snake': {
        templateUrl: 'templates/add-snake.html',
        controller: 'addSnakeCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
