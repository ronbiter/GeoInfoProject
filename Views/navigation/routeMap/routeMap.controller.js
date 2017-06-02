(function () {
    'use strict';

    angular.module('FtsApp').controller('routeMapController', routeMapController);

    function routeMapController ($scope, $q, $stateParams, $timeout, $mdStepper, stationsFactory) {


        $scope.stationsGeocoded = [];
        $scope.refineryStation = {};
        $scope.locations = [];
        $scope.navigationStarted = false;
        $scope.loading = false;
        $scope.steppers = {};
        $scope.curStep = 0;





        var markerSize = {'sm': [28, 35], 'md': [35, 44], 'lg': [42, 53]};
        var markerAnchor = {'sm': [14, 35], 'md': [17, 44], 'lg': [21, 53]};
        var markerPopupAnchor = {'sm': [1, -35], 'md': [1, -44], 'lg': [2, -53]};


        // custome markers for the route.
        var refineryMarker = L.icon({
            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-7B0099.png',
            iconRetinaUrl: 'https://assets.mapquestapi.com/icon/v2/marker-7B0099@2x.png',
            iconSize: markerSize.lg,
            iconAnchor: markerAnchor.lg,
            popupAnchor: markerPopupAnchor.lg
        });

        var passedMarker = L.icon({
            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start.png',
            iconRetinaUrl: 'https://assets.mapquestapi.com/icon/v2/marker-start@2x.png',
            iconSize: markerSize.md,
            iconAnchor: markerAnchor.md,
            popupAnchor: markerPopupAnchor.md
        });

        var stopMarker = L.icon({
            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-end.png',
            iconRetinaUrl: 'https://assets.mapquestapi.com/icon/v2/marker-end@2x.png',
            iconSize: markerSize.md,
            iconAnchor: markerAnchor.md,
            popupAnchor: markerPopupAnchor.md
        });

        var startMarker = L.icon({
            iconUrl: 'https://assets.mapquestapi.com/icon/v2/flag-start.png',
            iconRetinaUrl: 'https://assets.mapquestapi.com/icon/v2/flag-start@2x.png',
            iconSize: markerSize.md,
            iconAnchor: markerAnchor.md,
            popupAnchor: markerPopupAnchor.md
        });

        var endMarker = L.icon({
            iconUrl: 'https://assets.mapquestapi.com/icon/v2/flag-end.png',
            iconRetinaUrl: 'https://assets.mapquestapi.com/icon/v2/flag-end@2x.png',
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
        //{ map: $scope.myMap , icon:largeMarker}
        MQ.geocode()
            .search({city: 'אשדוד', street:'הנפט', postalCode: '77102'})
            .on('success', function (response) {
                $scope.refineryStation = response.result.best;
                $scope.refineryStation.name = 'refinery station';
                console.log('refinery stations:');
                console.log($scope.refineryStation);
            })

        $scope.LoadAllStations = function () {

            console.log('geting stations')

            var defered = $q.defer();

                $stateParams.stations.forEach(function (station) {
                    MQ.geocode()
                        .search(station.address)
                        .on('success', function (response) {
                            response.result.best.name = station.name;
                            $scope.stationsGeocoded.push(response.result.best);
                            //console.log($scope.stationsGeocoded)
                        })
                })

                defered.resolve($scope.stationsGeocoded);


            return defered.promise;
        }

        $scope.navigate = function () {

            $scope.loading = true;

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
                $scope.locations = [$scope.refineryStation].concat($scope.stationsGeocoded).concat($scope.refineryStation);
                var latlngList = [];

                angular.forEach($scope.locations, function (location) {
                    latlngList.push({ latLng: {lat:location.latlng.lat, lng:location.latlng.lng},
                                      completed: false
                                    });
                });

                dir.optimizedRoute({
                    locations: latlngList
                });

                var CustomRouteLayer = MQ.Routing.RouteLayer.extend({
                    createStopMarker: function(location, stopNumber) {
                        var custom_icon,
                            marker;

                        custom_icon = L.icon({
                            iconUrl: 'https://assets.mapquestapi.com/icon/v2/marker-7B0099.png',
                            iconRetinaUrl: 'https://assets.mapquestapi.com/icon/v2/marker-7B0099@2x.png',
                            iconSize: markerSize.md,
                            iconAnchor: markerAnchor.md,
                            popupAnchor: markerPopupAnchor.md
                        });

                        marker = L.marker(location.latLng, { icon: custom_icon })
                            .bindPopup('City: ' + location.adminArea5 + ', Street: ' + location.street)
                            .openPopup()
                            .addTo($scope.myMap);

                        return marker;
                    }
                });


                $scope.myMap.addLayer(new CustomRouteLayer({
                    directions: dir,
                    fitBounds: true
                }));

                $scope.loading = false;
                $scope.navigationStarted = true;

                $scope.steppers = $mdStepper('stepper-route');

                $scope.curStep = 0;
                $scope.numOfSteps = latlngList.length;
                $timeout(simulateShipment, 4000);


            });
        };

        function simulateShipment() {
            //console.log($scope.steppers);
            if ($scope.curStep < $scope.numOfSteps) {
                //console.log('simulating step #' + $scope.curStep);
                $scope.steppers.next();
                $scope.curStep++;
                $timeout(simulateShipment, 4000);
            }
        }

    }

})();