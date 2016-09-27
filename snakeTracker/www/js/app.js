// Ionic snekTrakr App

'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'snekTrakr' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'snekTrakr.services' is found in services.js
// 'snekTrakr.controllers' is found in controllers.js
angular.module('snekTrakr', ['ionic', 'ngCordova', 'snekTrakr.controllers', 'snekTrakr.services', 'snekTrakr.directives'])

  //POSSIBLE NAME CLUTCH, snekTrakr;

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

//add authInterceptor to array
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
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

  .state('tab.account', {
    url: '/account',
    views: {
      'account': {
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'ac'
      }
    }
  })

  .state('tab.snakesList', {
      url: '/snakesList',
      views: {
        'snakesList': {
          templateUrl: 'templates/snakes-list.html',
          controller: 'snakesCtrl',
          controllerAs: 'sc'
        }
      }
    })
    .state('tab.snake-details', {
      url: '/snakesList/:snakeId',
      views: {
        'snakesList': {
          templateUrl: 'templates/snake-details.html',
          controller: 'snakesDetailsCtrl',
          controllerAs: 'sdc'
        }
      }
    })

    .state('tab.addSnake', {
      url: '/snakesList/new',
      views: {
        'snakesList': {
          templateUrl: 'templates/add-snake.html',
          controller: 'addSnakeCtrl',
          controllerAs: 'asc'
        }
      }
    })

  .state('tab.clutches', {
    url: '/clutches',
    views: {
      'clutches': {
        templateUrl: 'templates/clutches.html',
        controller: 'clutchesCtrl',
        controllerAs: 'cc'
      }
    }
  })

  .state('tab.clutch-details', {
    url: '/clutches/:clutchId',
    views: {
      'clutches': {
        templateUrl: 'templates/edit-clutch.html',
        controller: 'clutchDetailsController',
        controllerAs: 'cdc'
      }
    }
  })

  .state('tab.addClutch', {
    url: '/clutches/new',
    views: {
      'clutches': {
        templateUrl: 'templates/add-clutch.html',
        controller: 'addClutchCtrl',
        controllerAs: 'acc'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/account');

});
