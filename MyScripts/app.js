/**
 * Created by ron on 5/1/2017.
 */
var app = angular.module('FtsApp',  ['ngRoute', 'ngCookies', 'FtsApp.Controllers', 'FtsApp.Services']);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'Views/Home.html',
            //controller: 'UserCtrl'
         })
        .when('/Dashboard', {
            templateUrl: 'Views/Dashboard.html',
            controller: 'DashboardCtrl'
        })
        .when('/NavMap', {
            templateUrl: 'Views/NavMap.html',
            controller: 'NavCtrl'
        })
        .when('/Login', {
            templateUrl: 'Views/Login.html',
            controller: 'UserCtrl'
        })

    $locationProvider.hashPrefix('');


})

app.run(function () {

    $('.nav a').on('click', function(){
        $('.nav').find('.active').removeClass('active');
        $(this).parent().addClass('active');
    });

})