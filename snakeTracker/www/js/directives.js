'use strict';

angular.module('snekTrakr.directives', [])

.directive('loginDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    controllerAs: 'lc'
  };
})

.directive('addSnakeDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/add-snake.html',
    controller: 'addSnakeCtrl',
    controllerAs: 'asc'
  };
})

.directive('editSnakeDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/edit-snake.html',
    controller: 'editSnakeCtrl',
    controllerAs: 'esc'
  };
})

.directive('addClutchDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/add-clutch.html',
    controller: 'addClutchCtrl',
    controllerAs: 'acc'
  };
})

.directive('editClutchDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/edit-clutch.html',
    controller: 'editClutchCtrl',
    controllerAs: 'ecc'
  };
})

.directive('addShedDir', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/add-shed.html',
    controller: 'shedController',
    controllerAs: 'shedctrl'
  };
})

.directive('addWeightDir', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/add-weight.html',
    controller: 'addWeightController',
    controllerAs: 'awc'
  };
})

.directive('addFeedingDir', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/add-feeding.html',
    controller: 'addFeedingController',
    controllerAs: 'afc'
  };
})

.directive('addPairingDir', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/add-pairing.html',
    controller: 'addPairingController',
    controllerAs: 'apc'
  };
});
