(function () {
    'use strict';

    angular.module('FtsApp').controller('stationsController', stationsController);

    function stationsController($scope, stationsFactory) {

        $scope.stationsList = [];

        $scope.getStationsList = function() {

            $scope.loading = true;

            stationsFactory.LoadAllStations()
                .then(function (stations) {
                    $scope.stationsList = stations;
                    //$scope.gridOptions.data = $scope.stationsList;

                    $scope.loading = false;
                })

        }
        $scope.getStationsList();

        $scope.GoToStation = function(stationId) {
            console.log('going to station #' + stationId);
        }

        // angular ui grid test...
        // $scope.gridOptions = {
        //     enableSorting: true,
        //     enableFiltering: true,
        //     enableRowEditing: false,
        //     columnDefs: [
        //         { name:'ID', field: 'stationId' , enableFiltering: false},
        //         { name:'Name', field: 'name' },
        //         { name:'Company', field: 'company'},
        //         { name:'City', field: 'address.city' },
        //         { name:'Street', field: 'address.street' }
        //     ]
        // }

    }

})();