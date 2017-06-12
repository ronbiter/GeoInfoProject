/**
 * Created by ron on 5/23/2017.
 */
(function() {
    'use strict';

    angular.module('FtsApp').config(function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

        $('.nav a').on('click', function(){
            console.log('nav clicked')
            $('.nav').find('.active').removeClass('active');
            $(this).parent().addClass('active');
        });


        $locationProvider.hashPrefix('');

        $urlRouterProvider.otherwise('/home/welcome')

        // var indexState = {
        //     url: '/',
        //         templateUrl: 'Index.html'
        // };

        // [TODO] move all views to a provider
        var homeState = {
            url: '/home',
                templateUrl: 'Views/home/Home.html',
                controller: 'userController'
        };

        var welcomeState = {
            url: '/welcome',
                templateUrl: 'Views/home/welcome/welcome.html'
        };

        var dashboardState = {
            url: '/dashboard',
                templateUrl: 'Views/dashboard/Dashboard.html',
                controller: 'dashboardController'
        };

        var stationsState = {
            url: '/dashboardStations',
            templateUrl: 'Views/dashboard/stations/stations.html',
            controller: 'stationsController'
        };

        var ordersState = {
                url: '/dashboardOrders',
                templateUrl: 'Views/dashboard/orders/orders.html',
                controller: 'ordersController'
        };

        var selectedOrdersState = {
            url: '/order/:orderID',
            templateUrl: 'Views/dashboard/orders/orderDetails/orderDetails.html',
            controller: 'orderDetilsController'
        };

        var generalMapState = {
            url: '/generalMap',
                templateUrl: 'Views/navigation/GeneralMap/GeneralMap.html',
                controller: 'generalMapController'
        };
        var selectedStationState = {
            url: '/station/:stationId',
            templateUrl: 'Views/navigation/GeneralMap/GeneralMap.html',
            controller: 'generalMapController'
        };

         var routeMapState = {
            url: '/routeMap',
            templateUrl: 'Views/navigation/routeMap/routeMap.html',
            controller: 'routeMapController',
             params: {stations: { Array: true} }
        };

        var loginState = {
            url: '/login',
                templateUrl: 'Views/User/login/Login.html',
                controller: 'loginController'
        };


        $stateProvider
            .state('home', homeState)
            .state('home.welcome', welcomeState)
            .state('home.dashboard', dashboardState)
            .state('home.dashboard.stations', stationsState)
            .state('home.dashboard.orders', ordersState)
            .state('home.dashboard.orders.order', selectedOrdersState)
            .state('home.generalMap', generalMapState)
            .state('home.generalMap.station', selectedStationState)
            .state('home.routeMap', routeMapState)
            .state('home.login', loginState);

    });

})();