'use strict';

angular.module('snekTrakr.directives', [])

.directive('loginDirective', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/login.html',
    controller: 'loginCtrl',
    controllerAs: 'lc'
  };
})

.directive('addSnakeDirective', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/add-snake.html',
    controller: 'addSnakeCtrl',
    controllerAs: 'asc'
  };
})

.directive('editSnakeDirective', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/edit-snake.html',
    controller: 'editSnakeCtrl',
    controllerAs: 'esc'
  };
})

.directive('addClutchDirective', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/add-clutch.html',
    controller: 'addClutchCtrl',
    controllerAs: 'acc'
  };
})

.directive('editClutchDirective', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/edit-clutch.html',
    controller: 'editClutchCtrl',
    controllerAs: 'ecc'
  };
})
