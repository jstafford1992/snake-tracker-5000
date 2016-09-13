'use strict';

angular.module('snekTrakr.services', [])

.constant("routeToAPI", {
  "url": "http://localhost:3000"
})

.service('LoginService', ['$http', function($http){
  var vm = this;
  //LOGIN FUNCTIONALITY GOES HERE



}])

.service('SnakesListService', ['$http', function($http){
  var vm = this;
  //SNAKE-LIST FUNCTIONALITY HERE


}]);
