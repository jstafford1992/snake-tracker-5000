'use strict';

angular.module('snekTrakr.controllers', [])

.controller('loginCtrl', ['$scope', 'LoginService', function($scope, LoginService) {


  var vm = this;



  vm.message = "This is the Controller for the login page";

  vm.login = LoginService.login;
  vm.logout = LoginService.logout;

  vm.signup = LoginService.signup;

  vm.loggedIn = LoginService.login.loggedIn;

}])

.controller('snakesCtrl', [ '$scope', 'SnakesService', '$state', function($scope, SnakesService, $state) {

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

.controller('snakesDetailsCtrl', ['$scope', '$stateParams', 'SnakesService', '$location', '$state', 'PictureService', function($scope, $stateParams, SnakesService, $location, $state, PictureService) {
  var vm = this;
  vm.message = "This is the Snake Details page Controller Message";
  vm.showEditSnake = false;
  vm.showAddShed = false;
  vm.showAddWeight = false;
  vm.showAddFeeding = false;
  vm.showAddPairing = false;

  var path = $location.path().split('/');

  vm.getSnakeInfo = SnakesService.getSnakeInfo(path[path.length - 1]);
  vm.snake = SnakesService.snake;

  vm.deleteSnake = SnakesService.deleteSnake;


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
  // console.log(vm.snakes.notBreeders);

  vm.openCamera = function(){
    PictureService.openCamera().then(function(data){
      // console.log(data);
      vm.photo.image_url = data;
    });
  };

  vm.openFilePicker = function(){

    PictureService.openFilePicker().then(function(data){
      vm.photo.image_url = data;
    });

  };


  vm.photo = {};

  // console.log(vm.snake.info.snake.id);
  vm.testGroup = function(){
    for(var i = 0; i < vm.snakes.notBreeders.length; i++){
      // console.log(vm.snakes.notBreeders[i].id);
      // console.log(vm.snake.info.snake.id);
      if(vm.snakes.notBreeders[i].id === vm.snake.info.snake.id) {
        // console.log("inside if");
        // console.log(vm.snakes.notBreeders[i].id);
        return true;
      }
    }
  };



}])

.controller('AccountCtrl', ['AccountService', 'LoginService', function(AccountService, LoginService) {

  var vm = this;
  vm.message = "This is the Controller for the Account page";

  vm.showEdit = false;

  vm.getAccountInfo = AccountService.getAccountInfo;

  vm.account = AccountService.account;

  vm.updateAccount = AccountService.updateAccount;

  vm.loggedIn = LoginService.login.loggedIn;

}])

.controller('addSnakeCtrl', ['AddSnakeService', '$http', 'PictureService', function(AddSnakeService, $http, PictureService){
  var vm = this;
  vm.message = "ADD A NEW SNAKE!";
 // console.log(routeToAPI.url);

  vm.newSnake = AddSnakeService.newSnake;

  vm.photo = {};

  vm.openCamera = function(){
    PictureService.openCamera().then(function(data){
      // console.log(data);
      vm.photo.image_url = data;
    });
  };

  vm.openFilePicker = function(){

    PictureService.openFilePicker().then(function(data){
      vm.photo.image_url = data;
    });

  };




}])

.controller('editSnakeCtrl', ['SnakesService', 'PictureService', function($scope, SnakesService, PictureService){
  var vm = this;
  vm.message = "EDIT SNAKE";


  // vm.openCamera = PictureService.openCamera;
  //
  // vm.openFilePicker = PictureService.openFilePicker;

}])

.controller('clutchesCtrl', ['ClutchService', '$state', '$location', 'SnakesService', function(ClutchService, $state, $location, SnakesService){
  var vm = this;
  vm.message = "LIST CLUTCHES";

  // ClutchService.getClutches();

  vm.clutches = ClutchService.clutches;
  // console.log(vm.clutches);
  vm.getClutches = ClutchService.getClutches();
  vm.$state = $state;

}])

.controller('addClutchCtrl', ['SnakesService', 'ClutchService', 'PictureService', function(SnakesService, ClutchService, PictureService) {
  var vm = this;
  vm.message = "ADD CLUTCH";

  vm.snakes = {};

  vm.snakes.females = SnakesService.snakes.females;

  vm.addClutch = ClutchService.addClutch;

  vm.openCamera = function(){
    PictureService.openCamera().then(function(data){
      // console.log(data);
      vm.photo.image_url = data;
    });
  };

  vm.openFilePicker = function(){

    PictureService.openFilePicker().then(function(data){
      vm.photo.image_url = data;
    });

  };


  vm.photo = {};

}])

.controller('editClutchCtrl', [ '$stateParams', 'ClutchService', '$location', '$state', 'SnakesService', 'PictureService', function($stateParams, ClutchService, $location, $state, SnakesService, PictureService) {
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

  vm.showAddEvent = false;

  vm.snakes = {};

  vm.snakes.females = SnakesService.snakes.females;

  vm.openCamera = function(){
    PictureService.openCamera().then(function(data){
      // console.log(data);
      vm.photo.image_url = data;
    });
  };

  vm.openFilePicker = function(){

    PictureService.openFilePicker().then(function(data){
      vm.photo.image_url = data;
    });

  };


  vm.photo = {};

}])

// .controller('pictureController', ['PictureService', function(PictureService){
//   var vm = this;
//   vm.takePicture = PictureService.openCamera;
//
//   vm.openGallery = PictureService.openFilePicker;
//
// }])

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


}])

.controller('calendarCtrl', ['$cordovaCalendar', function($cordovaCalendar){
  var vm = this;

  vm.event = {};

  vm.message = "calendarCtrl"
  // console.log(vm.event);
  // vm.createEvent = CalendarService.createEvent;
  // console.log("calendarCtrl");
  vm.createEvent = function(title, location, notes, days) {


    var d = new Date();
    var d2 = new Date();
    // console.log(d.setDate(d.getDate() + 50));
    var days1 = d.setDate(d.getDate() + Number(days));
    var days2 = d2.setDate(d2.getDate() + (Number(days) + 1));

    var newEvent = {
      title: title,
      location: location,
      notes: notes,
      startDate: days1,
      endDate: days2
    };

    // console.log("inside create Event", newEvent);

      $cordovaCalendar.createEvent({
          title: newEvent.title,
          location: newEvent.location,
          notes: newEvent.notes,
          startDate: days1,
          endDate: days2
      }).then(function (result) {
          alert("Event created successfully");
          // console.log(result);
      }, function (err) {
        // console.log(err);
          alert("There was an error: ", err );
      });
  };

}]);



//
