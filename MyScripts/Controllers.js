/**
 * Created by ron on 5/3/2017.
 */
var app = angular.module('FtsApp.Controllers', [])

app.controller('MainCtrl', function ($scope) {
    
})

app.controller('NavCtrl', function ($scope) {

    $scope.center = {
        lat: 51.505,
        lng: -0.09,
        zoom: 4
    };

    $scope.markers = {
        home: {
            lat: 31.79424368884862,
            lng: 34.64602947235108
        }
    }

})