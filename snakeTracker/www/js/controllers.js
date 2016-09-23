'use strict';

angular.module('snekTrakr.controllers', [])

.controller('loginCtrl', ['$scope', 'LoginController', function($scope, LoginController) {


  var vm = this;

  vm.message = "This is the Controller for the login page";

  vm.login = LoginController.login;
  vm.logout = LoginController.logout;

  vm.signup = LoginController.signup;

}])

.controller('snakesCtrl', [ '$scope', 'SnakesService', '$state', function($scope, SnakesService, $state) {
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
  // vm.getSnakeInfo = SnakesService.getSnakeInfo;
  vm.$state = $state;

}])

.controller('snakesDetailsCtrl', ['$scope', '$stateParams', 'SnakesService', '$location', '$state', function($scope, $stateParams, SnakesService, $location, $state) {
  // $scope.chat = snakes.get($stateParams.chatId);
  var vm = this;
  vm.message = "This is the Snake Details page Controller Message";
  vm.showEditSnake = false;
  vm.showAddShed = false;
  vm.showAddWeight = false;
  vm.showAddFeeding = false;
  vm.showAddPairing = false;

  var path = $location.path().split('/');
  // console.log(path);
  // console.log(path[path.length - 1]);
  vm.getSnakeInfo = SnakesService.getSnakeInfo(path[path.length - 1]);
  vm.snake = SnakesService.snake;

  vm.deleteShedInfo = SnakesService.deleteShedInfo;
  vm.addShedInfo = SnakesService.addShedInfo;

  vm.deleteWeightInfo = SnakesService.deleteWeightInfo;
  vm.addWeightInfo = SnakesService.addWeightInfo;

  vm.deleteFeedingInfo = SnakesService.deleteFeedingInfo;
  vm.addFeedingInfo = SnakesService.addFeedingInfo;

  vm.deleteBreedingInfo = SnakesService.deleteBreedingInfo;
  vm.addBreedingInfoFemale = SnakesService.addBreedingInfoFemale;
  vm.addBreedingInfoMale = SnakesService.addBreedingInfoMale;

  vm.updateSnake = SnakesService.updateSnake;

  vm.$state = $state;
  vm.testGender = function(){
    // console.log(vm.snake.info.snake.sex);
    if (vm.snake.info.snake.sex === "female") {
      // console.log("Is Female");
      // console.log(vm.gender);
      return true;
    } else {
      // console.log("Is Male");
      return false;
    }
  };

  vm.snakes = SnakesService.snakes;
  // console.log(vm.snakes.males);
  // console.log(vm.snakes.females);

}])

.controller('AccountCtrl', function($scope) {
  // $scope.settings = {
  //   enableFriends: true
  // };

  var vm = this;
  vm.message = "This is the Controller for the Account page";

})

.controller('addSnakeCtrl', ['AddSnakeService', '$http', function(AddSnakeService, $http){
  var vm = this;
  vm.message = "ADD A NEW SNAKE!";
 // console.log(routeToAPI.url);

  vm.newSnake = AddSnakeService.newSnake;

}])

.controller('editSnakeCtrl', ['SnakesService', function($scope, SnakesService){
  var vm = this;
  vm.message = "EDIT SNAKE";


}])

.controller('clutchesCtrl', ['ClutchService', '$state', '$location', function(ClutchService, $state, $location){
  var vm = this;
  vm.message = "LIST CLUTCHES";

  // ClutchService.getClutches();

  vm.clutches = ClutchService.clutches;
  // console.log(vm.clutches);
  vm.getClutches = ClutchService.getClutches();
  vm.$state = $state;

}])

.controller('addClutchCtrl', function() {
  var vm = this;
  vm.message = "ADD CLUTCH";


})

.controller('editClutchCtrl', [ '$stateParams', 'ClutchService', '$location', '$state', function($stateParams, ClutchService, $location, $state) {
  var vm = this;
  vm.message = 'EDIT CLUTCH';
  // vm.clutch = {};

  var path = $location.path().split('/');
  // console.log(path);
  // console.log(path[path.length - 1]);
  vm.getClutch = ClutchService.getClutch(path[path.length - 1]);
  vm.clutch = ClutchService.clutch;

  vm.updateClutch = ClutchService.updateClutch;

  vm.deleteClutch = ClutchService.deleteClutch;

  
}])

.controller('pictureController', ['PictureService', function(PictureService){
  var vm = this;
  vm.takePicture = PictureService.openCamera;

  vm.openGallery = PictureService.openFilePicker;

}])

.controller('shedController', ['$http', 'SnakesService', function($http, SnakesService){
  var vm = this;



}])

.controller('addWeightController', ['$http', 'SnakesService', function($http, SnakesService){
  var vm = this;


}])

.controller('addFeedingController', ['$http', 'SnakesService', function($http, SnakesService){
  var vm = this;


}])

.controller('addPairingController', ['$http', 'SnakesService', '$location', function($http, SnakesService, $location){
  var vm = this;

  vm.snakes = SnakesService.snakes;
  vm.snake = SnakesService.snake;

  // console.log(vm.snake.gender);

  // var path = $location.path().split('/');
  // console.log(path);
  // console.log(path[path.length - 1]);
  // vm.getSnakeInfo = SnakesService.getSnakeInfo(path[path.length - 1]);
  // vm.snake = SnakesService.snake;
  //
  // console.log(vm.snake.info);

}])

.controller('clutchDetailsController', ['$http', function($http){
  var vm = this;

  vm.message = "CLUTCH DETAILS CONTROLLER";


}]);



//
