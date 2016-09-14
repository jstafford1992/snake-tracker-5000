'use strict';

angular.module('snekTrakr.services', [])

.constant("routeToAPI", {
  "url": "http://localhost:3000"
})

.service('AccountService', ['$http', function($http){
  var vm = this;
  //LOGIN FUNCTIONALITY GOES HERE



}])

.service('SnakesListService', ['$http', function($http){
  var vm = this;
  //SNAKE-LIST FUNCTIONALITY HERE





  ///TODO this is for the QR scanner if I make it that far
  //   vm.scan = function() {
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

}])

.service('ClutchSerive', ['$http', function($http){
  var vm = this;
  // Clutch List functionality here

}])

.service('authInterceptor', ['$q', '$window', function($q, $window){
  var vm = this;
  //for JWTs
  return {
    request: function(config){
      config.headers = config.headers || {};
      if($window.sessionStorage.token){
        config.headers.Authorization  = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function(response){
      if(response.status === 404){
        console.log(response);
      }
      return response || $q.when(response);
    }
  };
}]);
