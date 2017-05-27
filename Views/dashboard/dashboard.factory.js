(function () {
    'use strict';

    angular.module('FtsApp').factory('dashboardFactory', function () {

        return {
            tabs: [
                { title: 'stations', state: 'home.dashboard.stations'},
                { title: 'orders', state: 'home.dashboard.orders'}
            ]
        }

    })

})();