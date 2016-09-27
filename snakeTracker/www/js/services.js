'use strict';

angular.module('snekTrakr.services', [])

.constant("routeToAPI", {
  "url": "http:10.7.80.106:3000"
})

// .constant("routeToAPI", {
//   "url": "http://localhost:3000"
// })

// .constant("routeToAPI", {
//   "url": "https://snek-trakr.herokuapp.com"
// })
.service('LoginService', ['$http', '$window', 'routeToAPI', '$location', '$ionicHistory', function($http, $window, routeToAPI, $location, $ionicHistory){
  var sv = this;

  sv.login = function(email, password){
    return new Promise(function(resolve, reject){
      $http.post(routeToAPI.url + '/login', {email: email, password: password})
      .then(function(data) {
        // console.log(data);

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
      // console.log(err.data.message);

    });

  };

  sv.logout = function(){
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    $location.path('/tab/login');
  };

}])

.service('AccountService', ['$http', 'routeToAPI', '$state', '$window', function($http, routeToAPI, $state, $window){
  var sv = this;
  //LOGIN FUNCTIONALITY GOES HERE
  sv.account = {};

  sv.getAccountInfo = function(){
    $http.get(routeToAPI.url + '/user')
    .then(function(data){
      // console.log(data.data);
      sv.account.info = data.data[0];
    }).catch(function(err){
      console.log(err);
    });
  };

  sv.getAccountInfo();

  sv.updateAccount = function(id, email, confirmPassword){
    $http.put(routeToAPI.url + '/user/' + id, {
      id: id,
      email: email,
      password: confirmPassword
    }).then(function(data){
      console.log(data);
      sv.logout();
      $state.go('tab.account');

    }).catch(function(err){
      console.log(err);

    });

  };

  sv.logout = function(){
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    // $location.path('/tab/login');
  };

}])

.service('SnakesService', ['$http', 'routeToAPI', '$location', '$state', function($http, routeToAPI, $location, $state){
  var sv = this;
  sv.snakes = {};
  sv.snake = {};
  //SNAKE-LIST FUNCTIONALITY HERE

  sv.getSnakes = function(){
    $http.get(routeToAPI.url + '/snakes')
    .then(function(data){
      // console.log(data.data);
      sv.snakes.arr = data.data;
      sv.snakes.males = [];
      sv.snakes.females = [];
      for(var i = 0; i < sv.snakes.arr.length; i++){
        if(sv.snakes.arr[i].group === "breeder" && sv.snakes.arr[i].sex === "male"){
          sv.snakes.males.push(sv.snakes.arr[i]);
        } else {
          sv.snakes.females.push(sv.snakes.arr[i]);
        }
      }

      // console.log(sv.snakes.arr);
      // console.log(sv.snakes.males);
      // console.log(sv.snakes.females);
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
      // console.log(data);
      sv.snake.info = data.data;
      console.log(sv.snake.info);
      if (sv.snake.info.snake.sex === "male") {
        sv.snake.gender = true;
        // console.log(sv.snake.gender);
      } else {
        sv.snake.gender = false;
        // console.log(sv.snake.gender);
      }
    });
  };

  //BREEDING CRUD
  sv.addBreedingInfoFemale = function(sire,  date_paired){
    $http.post(routeToAPI.url + '/breeding', {
      snake_id: sv.snake.info.snake.id,
      sire: sire,
      date_paired: date_paired
    })
    .then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);
    });

  };

  sv.addBreedingInfoMale = function(snake_id, date_paired){
    $http.post(routeToAPI.url + '/breeding', {
      snake_id: snake_id,
      sire: sv.snake.info.snake.id,
      date_paired: date_paired
    })
    .then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);
    });

  };

  sv.deleteBreedingInfo = function(id){
    $http.delete(routeToAPI.url + '/breeding/' + id)
    .then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);
    });
  };


  //FEEDING CRUD

  sv.addFeedingInfo = function(rat_size, successful, attempted, amount){
    $http.post(routeToAPI.url + '/feeding', {
      snake_id: sv.snake.info.snake.id,
      rat_size: rat_size,
      successful: successful,
      attempted: attempted,
      amount: amount
    }).then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);

    });
  };

  sv.deleteFeedingInfo = function(id){
    $http.delete(routeToAPI.url + '/feeding/' + id)
    .then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);
    });
  };


  //WEIGHT CRUD
  sv.addWeightInfo = function(weight, date_weighed){
    $http.post(routeToAPI.url + '/weight', {
      snake_id: sv.snake.info.snake.id, weight: weight, date_weighed: date_weighed})
      .then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);

    });
  };

  sv.deleteWeightInfo = function(id){
    $http.delete(routeToAPI.url + '/weight/' + id)
    .then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);
    });
  };


  //SHED CRUD
  sv.addShedInfo = function(date_shed){
    $http.post(routeToAPI.url + '/shed', {
      snake_id: sv.snake.info.snake.id,
      date_shed: date_shed
    }).then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);

    });
  };

  sv.deleteShedInfo = function(id){
    $http.delete(routeToAPI.url + '/shed/' + id)
    .then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);
    });
  };


  //DELETE SNAKE
  sv.deleteSnake = function(id){
    $http.delete(routeToAPI.url + '/snakes/' + id)
    .then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);
    });
  };



  sv.updateSnake = function(id, name, notes, sex, year_hatched, group, image_url){
    $http.put(routeToAPI.url + '/snakes/' + id, {
      id: id,
      name: name,
      notes: notes,
      sex: sex,
      year_hatched: year_hatched,
      group: group,
      image_url: image_url
    }).then(function(data){
      console.log(data);
      $state.reload();
    }).catch(function(err){
      console.log(err);

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

}])

.service('AddSnakeService', ['$http', 'routeToAPI', '$location', '$state', function($http, routeToAPI, $location, $state){

  var sv = this;

  sv.newSnake = function(name, sex, hatch_year, group, notes, url, image_url){
    $http.post(routeToAPI.url + '/snakes', {
      name: name,
      sex: sex,
      year_hatched: hatch_year,
      group: group,
      notes: notes,
      url: url,
      image_url: image_url
    }).then(function(data){
      console.log(data);
      $state.go('tab.snakesList');
    }).catch(function(err){
      console.log(err);

    });
  };
}])

.service('ClutchService', ['$http', 'routeToAPI', '$location', '$state', 'SnakesService', 'PictureService', function($http, routeToAPI, $location, $state, SnakesService, PictureService){
  var sv = this;
  // Clutch List functionality here
  sv.clutches = {};

  sv.clutch = {};

  sv.snakes = {};

  sv.snakes.females = SnakesService.snakes.females;

  // console.log(sv.snakes.females);

  sv.getClutches = function(){
    $http.get(routeToAPI.url + '/clutches').then(function(data){
      // console.log(data.data);
      sv.clutches.arr = data.data;
    });
  };


  sv.getClutch = function(id){
    $http.get(routeToAPI.url + '/clutches/' + id).then(function(data){
      // console.log(data.data[0]);
      sv.clutch.info = data.data[0];
      // $state.reload();
    }).catch(function(err){
      console.log(err);

    });
  };

  sv.updateClutch = function(id, snake_id, date_layed, notes, number_layed, bad_eggs, number_hatched, image_url){
    $http.put(routeToAPI.url + '/clutches/' + id, {
      id: id,
      snake_id: snake_id,
      date_layed: date_layed,
      notes: notes,
      number_layed: number_layed,
      bad_eggs: bad_eggs,
      number_hatched: number_hatched,
      image_url: image_url
    }).then(function(data){
      console.log(data);
      // $state.reload();
      $state.go('tab.clutches');
    }).catch(function(err){
      console.log(err);
    });
  };

  sv.deleteClutch = function(id){
    $http.delete(routeToAPI.url + '/clutches/' + id)
    .then(function(data){
      console.log(data);
      $state.go('tab.clutches');
    }).catch(function(err){
      console.log(err);

    });
  };

  sv.addClutch = function(snake_id, notes, date_layed, number_layed, bad_eggs, image_url){
    // "bad_eggs", "date_layed", "notes", "number_hatched", "number_layed", "snake_id"
    console.log(notes);
    $http.post(routeToAPI.url + '/clutches/new', {
      snake_id: snake_id,
      notes: notes,
      date_layed: date_layed,
      number_layed: number_layed,
      bad_eggs: bad_eggs,
      image_url: image_url
    }).then(function(data){
      console.log(data);

      $state.go('tab.clutches');
    }).catch(function(err){
      console.log(err);

    });
  };


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

.service('CalendarService', ['$cordovaCalendar', '$scope', function($cordovaCalendar, $scope){

    var sv = this;
    // window.plugins.calendar.createEventInteractively(title,eventLocation,notes,startDate,endDate,success,error);
    // sv.createEvent = function() {
    //     $cordovaCalendar.createEvent({
    //         title: 'Hello world',
    //         location: 'Home',
    //         notes: 'Bring sandwiches',
    //         startDate: new Date(2016, 8, 24, 18, 30, 0, 0, 0),
    //         endDate: new Date(2016, 8, 25, 12, 0, 0, 0, 0)
    //     }).then(function (result) {
    //         alert("Event created successfully");
    //         console.log(result);
    //     }, function (err) {
    //       console.log(err);
    //         alert("There was an error: ", err );
    //     });
    // };

}])

.service('PictureService', ['$cordovaCamera', function($cordovaCamera){
  var sv = this;

  sv.photo = {};

  sv. displayImage = function(imgUri) {

      var elem = document.getElementById('imageFile');
      elem.src = imgUri;
  };

  sv.openCamera = function() {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 100,
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
      sv.photo.image_url = data;
      return data;
    });
};

  sv.openFilePicker = function() {

      var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
      var options = {
          // Some common settings are 20, 50, and 100
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          // In this app, dynamically set the picture source, Camera or photo gallery
          sourceType: srcType,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true  //Corrects Android orientation quirks
      };
      // options.targetHeight = 100;
      // options.targetWidth = 100;
      // var func = createNewFileEntry;

      // if (selection == "picker-thmb") {
      //     // To downscale a selected image,
      //     // Camera.EncodingType (e.g., JPEG) must match the selected image type.
      //     options.targetHeight = 100;
      //     options.targetWidth = 100;
      // }

      return $cordovaCamera.getPicture(options).then(function(data){
        console.log(data);
        sv.photo.image_url = data;
        return data;
      });
  };

}]);
