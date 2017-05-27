(function () {
    'use strict';

    angular.module('FtsApp').controller('routeMapController', routeMapController);

    function routeMapController ($scope, $q, stationsFactory) {

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
        //{ map: $scope.myMap , icon:largeMarker}
        MQ.geocode()
            .search({city: 'אשדוד', street:'הנפט', postalCode: '77102'})
            .on('success', function (response) {
                $scope.refineryStation = response.result.best;
                console.log('refinery stations:')
                console.log($scope.refineryStation)
            })

        $scope.LoadAllStations = function () {

            console.log('geting stations')

            var defered = $q.defer();

            stationsFactory.LoadAllStations().then(function (stations) {
                //   console.log(stations)
                stations.forEach(function (station) {
                    MQ.geocode()
                        .search(station.address)
                        .on('success', function (response) {
                            $scope.stationsGeocoded.push(response.result.best);
                            //console.log($scope.stationsGeocoded)
                        })
                })

                defered.resolve($scope.stationsGeocoded);

            })

            return defered.promise;
        }

        $scope.navigate = function () {

            var dir = MQ.routing.directions()
                .on('success', function(data) {
                    // ==> this is for nerative. doesn't look good yet. maybe adress this later.
                    // var legs = data.route.legs,
                    //     html = '',
                    //     maneuvers,
                    //     i;
                    //
                    // if (legs && legs.length) {
                    //     maneuvers = legs[0].maneuvers;
                    //
                    //     for (i=0; i < maneuvers.length; i++) {
                    //         html += (i+1) + '. ';
                    //         html += maneuvers[i].narrative + '';
                    //     }
                    //
                    //     L.DomUtil.get('route-narrative').innerHTML = html;
                    // }
                });


            var finished = $q.all([$scope.LoadAllStations()]);

            finished.then(function () {

                // make a list of the stations (starting and ending in the refinery
                var loc = [$scope.refineryStation].concat($scope.stationsGeocoded).concat($scope.refineryStation);
                var latlngList = [];

                angular.forEach(loc, function (location) {
                    latlngList.push({ latLng: {lat:location.latlng.lat, lng:location.latlng.lng}})
                })

                dir.optimizedRoute({
                    locations: latlngList
                })

                $scope.myMap.addLayer(MQ.routing.routeLayer({
                    directions: dir,
                    fitBounds: true
                }));

            })
        }

    }

})();