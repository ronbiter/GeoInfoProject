(function () {
    'use strict';

    angular.module('FtsApp').controller('generalMapController', function ($scope, $location, stationsFactory) {

        var markerSize = {'sm': [28, 35], 'md': [35, 44], 'lg': [42, 53]};
        var markerAnchor = {'sm': [14, 35], 'md': [17, 44], 'lg': [21, 53]};
        var markerPopupAnchor = {'sm': [1, -35], 'md': [1, -44], 'lg': [2, -53]};

        $scope.stationsGeocoded = [];
        $scope.refineryStation = {};

        // custome marker for the refinery station.
        var largeMarker = L.icon({
            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-7B0099.png',
            iconRetinaUrl: 'https://assets.mapquestapi.com/icon/v2/marker-7B0099@2x.png',
            iconSize: markerSize.lg,
            iconAnchor: markerAnchor.lg,
            popupAnchor: markerPopupAnchor.lg
        });

        // make a leaflet map object
        $scope.myMap =  L.map('myMap', {
            center: [31.794696, 34.645896],
            zoom: 15,
            layers: MQ.mapLayer() // layer from mapquest api
        });

        // geocoding using mapquest api. from address to latlng. with custome marker for refinery
        //{ map: $scope.myMap , icon:largeMarker} ==> add this to geocode() to mark stations on the map
        MQ.geocode({ map: $scope.myMap , icon:largeMarker})
            .search({city: 'אשדוד', street:'הנפט', postalCode: '77102'})
            .on('success', function (response) {
                $scope.refineryStation = response.result.best;
                console.log('refinery stations:')
                console.log($scope.refineryStation)
            })


        $scope.LoadAllStationsFromDB = function () {

            console.log('getting stations')

            stationsFactory.LoadAllStations().then(function (stations) {
                //   console.log(stations)
                stations.forEach(function (station) {
                    MQ.geocode({ map: $scope.myMap }) // { map: $scope.myMap } ==> marks the stations on the map when geocoding
                        .search(station.address)
                        .on('success', function (response) {
                            $scope.stationsGeocoded.push(response.result.best);
                            //console.log($scope.stationsGeocoded)
                        })
                })
            })
        };
        $scope.LoadAllStationsFromDB();

    })
})();