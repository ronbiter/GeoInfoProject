/**
 * Created by ron on 5/3/2017.
 */
var app = angular.module('FtsApp.Controllers', ['ngRoute'])

app.controller('MainCtrl', function ($scope, FtsDataService) {

    $scope.date = new Date(2017,10,5);

})

app.controller('DashboardCtrl', function ($scope, FtsDataService) {



})

app.controller('UserCtrl', function ($scope, $location, $window, FtsDataService) {

    $scope.user = FtsDataService.GetLogedUser();

    //console.log($scope.user)

    $scope.Login = function () {

        FtsDataService.Login($scope.user.email, $scope.user.password, $scope.user.remember)
            .then(function (user) {
                $scope.user = user;

                //console.log($scope.user);

                if($scope.user != undefined) {
                    $location.url('/');
                    $window.location.reload();
                    //console.log($scope.user.name);
                }
            })


    }

    $scope.Logout = function() {
        $scope.user = FtsDataService.Logout();
    }

})

app.controller('NavCtrl', function ($scope, $http) {

    // make a leaflet map object
    $scope.myMap =  L.map('myMap', {
        center: [31.794696, 34.645896],
        zoom: 15
    });

    // set the tiles for the map
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9uYml0ZXIiLCJhIjoiY2oyYTk2dW1tMDAwZTJ3bnR2d3FiMGZwYyJ9.Q7Lw7hFupsK69ZbVP0VV2w', {
        maxZoom: 18
    }).addTo($scope.myMap);

    // get the current location of the user.
    // $scope.myMap.locate({
    //     setView: true,
    //     watch: true
    // })

    $scope.getStations = function () {

        console.log('geting stations')

        var stations = {};

        $http.get('/api/stations')
            .then(function (response) {
                var cord = response.data[0].coords;
                for(var i=0; i< cord.length; i++) {
                    console.log(cord[i]);
                }
                console.log(response.data[0].coords);
            })

    }


    $scope.makRoute = function() {

        L.Routing.control({
            waypoints: [
                L.latLng(31.794696, 34.645896), // $scope.myMap.getCenter(), <-- this is for getting the current map center
                L.latLng(31.784071, 34.673281),
                L.latLng(31.766121, 34.666414),
                L.latLng(31.750431, 34.682443),
                L.latLng(31.794696, 34.645896)
            ],
        })
            .on('routesfound', function(e) {
                var routes = e.routes;
                if(routes.length > 0) {
                    console.log("total distance:" + routes[0].summary.totalDistance / 1000 + "km")
                    console.log("waypoints")
                }
                console.log(routes);
            })
            .addTo($scope.myMap);

    }

    $scope.waypoint = {
        lat: 31.794696,
        lng: 34.645896,
        alt: 15
    }

})