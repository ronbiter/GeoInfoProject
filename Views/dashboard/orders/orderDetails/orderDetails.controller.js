/**
 * Created by ron on 5/27/2017.
 */
(function () {
    'use strict';

    angular.module('FtsApp').controller('orderDetilsController', orderDetilsController);

    function orderDetilsController ($scope, $stateParams, $location, $state, ordersFactory, stationsFactory, userFactory) {

        // [TODO] continue the controller

        console.log($stateParams.orderID);

        $scope.selectedOrder = {};
        $scope.orderStations = [];
        $scope.drivers = [];
        $scope.priorities = [
            { id: '1', name: 'normal' },
            { id: '2', name: 'urgent' }
        ];
        $scope.isEditOrder = false;

        userFactory.LoadAllDrivers()
            .then(function (response) {
                angular.forEach(response, function (driver) {
                    $scope.drivers.push(driver);
                })
            })

        if($stateParams.orderID) {
            $scope.loading = true;
            ordersFactory.GetOrderByID($stateParams.orderID)
                .then(function (response) {

                    $scope.selectedOrder = response;

                    $scope.selectedOrder.stations.forEach(function(stationId) {

                        stationsFactory.GetStationById(stationId)
                            .then(function (response) {
                                //console.log(response);
                                $scope.orderStations.push(response);
                            })
                        //console.log($scope.orderStations);

                    })
                    $scope.loading = false;
                })
        }

        $scope.closeOrder = function () {
            $location.url('/home/dashboard/dashboardOrders');
        }
        
        $scope.confirmOrder = function () {
            $scope.selectedOrder.status = 'confirmed';
            ordersFactory.UpdateOrder($scope.selectedOrder)
                .then(function (response) {
                    console.log(response);
                })
            console.log('order confirmed');
        }

        $scope.shipOutOrder = function () {
            console.log('order shipped');
            $scope.selectedOrder.status = 'shipped';
            ordersFactory.UpdateOrder($scope.selectedOrder)
                .then(function (response) {
                    console.log(response);

                })
            console.log('order shipped');
            $state.go('home.routeMap', { stations: $scope.orderStations })

        }


    }

})();