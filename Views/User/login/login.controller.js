(function () {
    'use strict';

    angular.module('FtsApp').controller('loginController', function ($scope, $rootScope, $location, $http, $localStorage,
                                                                     $sessionStorage) {

        if($sessionStorage.user)
            $scope.user = $localStorage.user;

        $scope.user = {};

        $scope.Login = function () {

            $http.get('/api/User/Login?email=' + $scope.user.email + '&password=' + $scope.user.password + '&remember=' + $scope.user.remember)
                .then(function (response) {

                    if(response.data != undefined) {

                        $rootScope.user = response.data;
                        $sessionStorage.user = response.data;

                        if($scope.user.remember) {
                            $localStorage.user = response.data;
                            console.log('logedUser saved to local storage')
                        }

                        $location.url('/');

                    }
                });


        }




    })
})();