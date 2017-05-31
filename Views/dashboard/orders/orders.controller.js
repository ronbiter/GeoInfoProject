(function () {
    'use strict';

    angular.module('FtsApp').controller('ordersController', ordersController);

    function ordersController ($scope, $location, ordersFactory) {

        // [TODO] continue the controller

        $scope.ordersList = [];
        $scope.selectedOrder = {};

        $scope.getOrdersList = function() {

            $scope.loading = true;

            ordersFactory.LoadAllOrders()
                .then(function (orders) {
                    $scope.ordersList = orders;
                    //$scope.gridOptions.data = $scope.ordersList;

                    $scope.loading = false;
                })

        }
        $scope.getOrdersList();

        $scope.openOrder = function (orderId) {

            $location.url('/home/dashboard/dashboardOrders/order/' + orderId);

        }

        // angular ui grid test...
        // $scope.gridOptions = {
        //     enableSorting: true,
        //     enableFiltering: true,
        //     enableRowSelection: true,
        //     enableRowHeaderSelection: false,
        //     columnDefs: [
        //         { name:'ID', field: 'orderID' },
        //         { name:'Stations', field: 'stations' },
        //         { name:'Company', field: 'company'},
        //         { name:'Gas', field: 'orderDetails.gasType' },
        //         { name:'Amount (in galons)', field: 'orderDetails.amount' },
        //         { name:'Priority', field: 'priority' },
        //         { name:'Status', field: 'status' },
        //         { name:'Last Updated', field: 'lastUpdate' }
        //     ]
        // }
        //
        // $scope.gridOptions.multiSelect = false;
        // $scope.gridOptions.modifierKeysToMultiSelect = false;
        // $scope.gridOptions.noUnselect = true;

    }

})();