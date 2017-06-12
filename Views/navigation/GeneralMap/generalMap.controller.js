(function () {
    'use strict';

    angular.module('FtsApp').controller('generalMapController', function ($scope, $location, stationsFactory) {

        var markerSize = {'sm': [28, 35], 'md': [35, 44], 'lg': [42, 53]};
        var markerAnchor = {'sm': [14, 35], 'md': [17, 44], 'lg': [21, 53]};
        var markerPopupAnchor = {'sm': [1, -35], 'md': [1, -44], 'lg': [2, -53]};

        $scope.stationsGeocoded = [];
        $scope.refineryStation = {};

        $scope.resource = null;

        // custome marker for the refinery station.
        var largeMarker = L.icon({
            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-lg-7B0099.png',
            iconRetinaUrl: 'https://assets.mapquestapi.com/icon/v2/marker-lg-7B0099@2x.png',
            iconSize: markerSize.lg,
            iconAnchor: markerAnchor.lg,
            popupAnchor: markerPopupAnchor.lg
        });

        var normalMarker = L.icon({
            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-md.png',
            iconRetinaUrl: 'https://assets.mapquestapi.com/icon/v2/marker-md@2x.png',
            iconSize: markerSize.md,
            iconAnchor: markerAnchor.md,
            popupAnchor: markerPopupAnchor.md
        });

        // make a leaflet map object
        $scope.myMap =  L.map('myMap', {
            center: [31.794696, 34.645896],
            zoom: 15,
            layers: MQ.mapLayer() // layer from mapquest api
        });

        // geocoding using mapquest api. from address to latlng. with custome marker for refinery
        //{ map: $scope.myMap , icon:largeMarker} ==> add this to geocode() to mark stations on the map



        $scope.LoadAllStationsFromDB = function () {

            console.log('getting stations')

            MQ.geocode({ map: $scope.myMap , icon:largeMarker})
                .search({city: 'אשדוד', street:'הנפט', postalCode: '77102'})
                .on('success', function (response) {
                    $scope.refineryStation = response.result.best;

                    var best = response.result.best,
                        latlng = best.latlng;

                    var customPopup = L.popup({ closeButton: false })
                        .setLatLng(latlng)
                        .setContent('<strong>Station: Refinery station</strong>' +
                            '<br/>' +
                            '<strong>Company: Paz</strong>' +
                            '<br/>' +
                            'Address: ' + best.adminArea5 + ', ' + best.adminArea3);

                    L.marker(latlng, {icon: largeMarker, title: 'Refinery station'}).bindPopup(customPopup).addTo($scope.myMap);

                })

            stationsFactory.LoadAllStations().then(function (stations) {
                //   console.log(stations)
                stations.forEach(function (station) {
                    geocodeStation(station);
                })
            })
        };

        if($location.url().indexOf('station') !== -1) {
            $scope.resource = $location.url().split('station/')[1];
            stationsFactory.GetStationById($scope.resource)
                .then(function (station) {
                    MQ.geocode({ map: $scope.myMap }) // { map: $scope.myMap } ==> marks the stations on the map when geocoding
                        .search(station.address)
                        .on('success', function (response) {
                            var best = response.result.best,
                                latlng = best.latlng;

                            $scope.myMap.setView(latlng, 12);

                            var customPopup = L.popup({ closeButton: false })
                                .setLatLng(latlng)
                                .setContent('<strong>Station: ' + station.name + '</strong>' +
                                    '<br/>' +
                                    '<strong>Company: ' + station.company + '</strong>' +
                                    '<br/>' +
                                    'Address: ' + best.adminArea5 + ', ' + best.adminArea3);

                            L.marker(latlng, {icon: normalMarker, title: station.name}).bindPopup(customPopup).addTo($scope.myMap);

                        });
                })
        }
        else {
            $scope.LoadAllStationsFromDB();
        }

        function geocodeStation(station) {
            MQ.geocode({ map: $scope.myMap }) // { map: $scope.myMap } ==> marks the stations on the map when geocoding
                .search(station.address)
                .on('success', function (response) {
                    $scope.stationsGeocoded.push(response.result.best);
                    //console.log($scope.stationsGeocoded)
                    var best = response.result.best,
                        latlng = best.latlng;

                    var customPopup = L.popup({ closeButton: false })
                        .setLatLng(latlng)
                        .setContent('<strong>Station: ' + station.name + '</strong>' +
                            '<br/>' +
                            '<strong>Company: ' + station.company + '</strong>' +
                            '<br/>' +
                            'Address: ' + best.adminArea5 + ', ' + best.adminArea3);

                    L.marker(latlng, {icon: normalMarker, title: station.name}).bindPopup(customPopup).addTo($scope.myMap);

                });
        };

    })
})();