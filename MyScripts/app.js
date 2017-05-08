/**
 * Created by ron on 5/1/2017.
 */
var app = angular.module('FtsApp',  ['ngRoute', 'ngCookies', 'FtsApp.Controllers', 'FtsApp.Services']);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'Views/Dashboard.html',
            controller: 'MainCtrl'
         })
        .when('/NavMap', {
            templateUrl: 'Views/NavMap.html',
            controller: 'NavCtrl'
        })

    $locationProvider.hashPrefix('');


})

app.run(function () {

    $('.nav a').on('click', function(){
        $('.nav').find('.active').removeClass('active');
        $(this).parent().addClass('active');
    });

})