'use strict';

angular.module('snekTrakr.controllers', [])

.controller('loginCtrl', function($scope) {

//   $scope.scan = function() {
//   cordova.plugins.barcodeScanner.scan(
//     function(result) {
//       if (!result.cancelled) {
//         if (result.format == "QR_CODE") {
//           navigator.notification.prompt("Please enter name of data", function(input) {
//             var name = input.input1;
//             var value = result.text;
//
//             var data = localStorage.getItem("LocalData");
//             console.log(data);
//             data = JSON.parse(data);
//             data[data.length] = [name, value];
//
//             localStorage.setItem("LocalData", JSON.stringify(data));
//
//             alert("Done");
//           });
//         }
//       }
//     },
//     function(error) {
//       alert("Scanning failed: " + error);
//     }
//   );
// };

  var vm = this;

  vm.message = "This is the Controller for the login page"

})

.controller('snakesCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.snakesList = snakesList.all();
  // $scope.remove = function(chat) {
  //   snakesList.remove(chat);
  // };

  var vm = this;
  vm.message = "This is the Controller for the snakes-list page";

})

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
});
