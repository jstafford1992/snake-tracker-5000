'use strict';

angular.module('snekTrakr.services', [])

.constant("routeToAPI", {
  "url": "http://localhost:3000"
})

// .constant("routeToAPI", {
//   "url": "https://snek-trakr.herokuapp.com/"
// })
.service('LoginController', ['$http', '$window', 'routeToAPI', '$location', '$ionicHistory', function($http, $window, routeToAPI, $location, $ionicHistory){
  var sv = this;

  sv.login = function(email, password){
    return new Promise(function(resolve, reject){
      $http.post(routeToAPI.url + '/login', {email: email, password: password})
      .then(function(data) {
        console.log(data);

        $window.sessionStorage.token = data.data.token;
        $window.sessionStorage.id = data.data.id;
        $location.path('/tab/snakesList');
        resolve();
      })
      .catch(function(err) {
        console.log(err);
        delete $window.sessionStorage.token;
        reject();
      });
    });
  };

  sv.signup = function(email, password){
    $http.post(routeToAPI.url + '/signup', {email: email, password: password})
    .then(function(data){
      console.log(data);
      $window.sessionStorage.token = data.data.token;
      $window.sessionStorage.token = data.data.id;
      $ionicHistory.goBack();
      // $location.path('/tab/snakes');
    })
    .catch(function(err){
      console.log(err);
      console.log(err.data.message);

    });

  };

  sv.logout = function(){
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    $location.path('/tab/login');
  };

}])

.service('AccountService', ['$http', function($http){
  var sv = this;
  //LOGIN FUNCTIONALITY GOES HERE



}])

.service('SnakesService', ['$http', 'routeToAPI', '$location', function($http, routeToAPI, $location){
  var sv = this;
  sv.snakes = {};
  sv.snake = {};
  //SNAKE-LIST FUNCTIONALITY HERE

  sv.getSnakes = function(){
    $http.get(routeToAPI.url + '/snakes')
    .then(function(data){
      // console.log(data.data);
      sv.snakes.arr = data.data;
      console.log(sv.snakes.arr);
    })
    .catch(function(err){
      console.log(err);
    });
  };

  // var path = $location.path().split('/');
  // console.log(path);
  // console.log(path[path.length - 1]);

  sv.getSnakeInfo = function(id){
    $http.get(routeToAPI.url + '/snakes/' + id)
    .then(function(data){
      console.log(data);
      sv.snake.info = data.data;
      console.log(sv.snake.info);
    });
  };


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

.service('SnakeDetailsService', ['$http', '$location', 'routeToAPI', function($http, $location, routeToAPI){
  var sv = this;


  sv.getSnakeInfo = function(id){
    $http.get(routeToAPI.url + '/snakes/' + id)
    .then(function(data){
      console.log(data.data);
      sv.snake.info = data.data;
      console.log(sv.snake.info);
    });
  };

}])

.service('ClutchSerive', ['$http', function($http){
  var sv = this;
  // Clutch List functionality here

}])

.service('authInterceptor', ['$q', '$window', function($q, $window){
  var sv = this;
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
}])

.service('PictureService', ['$cordovaCamera', function($cordovaCamera){
  var sv = this;

  sv. displayImage = function(imgUri) {

      var elem = document.getElementById('imageFile');
      elem.src = imgUri;
  };

  sv.openCamera = function() {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    };



    var srcType = Camera.PictureSourceType.CAMERA;
    // var func = createNewFileEntry;



    return $cordovaCamera.getPicture(options).then(function(data){
      console.log(data);
      return 'data:image/jpeg;base64,' + data;
    });
};

  sv.openFilePicker = function() {

      var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
      var options = {
          // Some common settings are 20, 50, and 100
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          // In this app, dynamically set the picture source, Camera or photo gallery
          sourceType: srcType,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true  //Corrects Android orientation quirks
      };
      options.targetHeight = 100;
      options.targetWidth = 100;
      // var func = createNewFileEntry;

      // if (selection == "picker-thmb") {
      //     // To downscale a selected image,
      //     // Camera.EncodingType (e.g., JPEG) must match the selected image type.
      //     options.targetHeight = 100;
      //     options.targetWidth = 100;
      // }

      return $cordovaCamera.getPicture(options).then(function(data){
        console.log(data);
        return 'data:image/jpeg;base64,' + data;
      });
  };

}]);
