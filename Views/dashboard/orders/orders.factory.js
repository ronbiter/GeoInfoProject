/**
 * Created by ron on 5/27/2017.
 */
(function () {
    'use strict';

    angular.module('FtsApp').factory('ordersFactory', function ($http) {

        var orders = {};

        return {

            LoadAllOrders: function () {

                return $http.get('/api/orders')
                    .then(function (response) {

                        orders = response.data;

                        if(orders.length > 0)
                            return orders;
                        else
                            return undefined;

                    });
            }

        }



    })

})();