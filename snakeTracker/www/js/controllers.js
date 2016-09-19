'use strict';

angular.module('snekTrakr.controllers', [])

.controller('loginCtrl', ['$scope', 'LoginController', function($scope, LoginController) {


  var vm = this;

  vm.message = "This is the Controller for the login page";

  vm.login = LoginController.login;
  vm.logout = LoginController.logout;

  vm.signup = LoginController.signup;

}])

.controller('snakesCtrl', [ '$scope', 'SnakesService', function($scope, SnakesService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});



  var vm = this;
  vm.message = "This is the Controller for the snakes-list page";
  vm.getSnakes = SnakesService.getSnakes();
  vm.snakes = SnakesService.snakes;



}])

.controller('snakesDetailsCtrl', function($scope, $stateParams) {
  // $scope.chat = snakesList.get($stateParams.chatId);
  var vm = this;
  vm.message = "This is the Snake Details page Controller Message";

})

.controller('AccountCtrl', function($scope) {
  // $scope.settings = {
  //   enableFriends: true
  // };

  var vm = this;
  vm.message = "This is the Controller for the Account page";

})

.controller('addSnakeCtrl', function($scope){
  var vm = this;
  vm.message = "ADD A NEW SNAKE!";


})

.controller('editSnakeCtrl', function($scope){
  var vm = this;
  vm.message = "EDIT SNAKE";
})

.controller('clutchesCtrl', function(){
  var vm = this;
  vm.message = "LIST CLUTCHES";
})

.controller('addClutchCtrl', function() {
  var vm = this;
  vm.message = "ADD CLUTCH";
})

.controller('editClutchCtrl', function() {
  var vm = this;
  vm.message = 'EDIT CLUTCH';
})

.controller('pictureController', ['PictureService', function(PictureService){
  var vm = this;
  vm.takePicture = PictureService.openCamera;

  vm.openGallery = PictureService.openFilePicker;

}]);
