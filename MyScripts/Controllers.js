/**
 * Created by ron on 5/3/2017.
 */
var app = angular.module('FtsApp.Controllers', [])

app.controller('MainCtrl', function ($scope) {
    
})

app.controller('NavCtrl', function ($scope) {



    $scope.myMap =  L.map('myMap', {
        center: [31.794696, 34.645896],
        zoom: 15
    });


    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9uYml0ZXIiLCJhIjoiY2oyYTk2dW1tMDAwZTJ3bnR2d3FiMGZwYyJ9.Q7Lw7hFupsK69ZbVP0VV2w', {
        maxZoom: 18
    }).addTo($scope.myMap);

    $scope.myMap.locate({
        setView: true,
        watch: true
    })



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

    console.log();

    console.log($scope.myMap.getCenter())


    $scope.waypoint = {
        lat: 31.794696,
        lng: 34.645896,
        alt: 15
    }

})