'use strict';

angular.module('snekTrakr.services', [])

.constant("routeToAPI", {
  "url": "http://localhost:3000"
})

.service('AccountService', ['$http', function($http){
  var sv = this;
  //LOGIN FUNCTIONALITY GOES HERE



}])

.service('SnakesService', ['$http', function($http){
  var sv = this;
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
