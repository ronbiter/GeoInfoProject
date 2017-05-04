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

    $scope.myMap.locate({
        setView: true,
        watch: true
    })

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9uYml0ZXIiLCJhIjoiY2oyYTk2dW1tMDAwZTJ3bnR2d3FiMGZwYyJ9.Q7Lw7hFupsK69ZbVP0VV2w', {
        maxZoom: 20
    }).addTo($scope.myMap);

    L.Routing.control({
        waypoints: [
            $scope.myMap.getCenter(),
            L.latLng(31.794689, 34.645889)
        ]
    }).addTo($scope.myMap);

    $scope.waypoint = {
        lat : 31.794696,
        lng : 34.645896,
        alt : 15
    }

})