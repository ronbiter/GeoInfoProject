(function () {
    'use strict';

    angular.module('FtsApp').factory('stationsFactory', function ($http) {

        var stations = {};

        return {

            LoadAllStations: function () {

                return $http.get('/api/stations')
                    .then(function (response) {

                        stations = response.data;

                        if(stations.length > 0)
                            return stations;
                        else
                            return undefined;

                    });
            }

        }



    })

})();