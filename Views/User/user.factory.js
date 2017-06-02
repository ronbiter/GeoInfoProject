/**
 * Created by ron on 5/28/2017.
 */
(function () {
    'use strict';

    angular.module('FtsApp').factory('userFactory', function ($http) {

        return {

            LoadAllDrivers: function () {

                return $http.get('/api/drivers')
                    .then(function (response) {

                        return response.data;

                    });
            },

            GetDriverByID: function (driverID) {

                return $http.get('api/drivers/order?driverID=' + driverID)
                    .then(function (response) {

                        return response.data;

                    });

            }

        }


    })

})();