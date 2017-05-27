(function () {
    'use strict';

    angular.module('FtsApp').controller('userController', function ($scope, $rootScope, $localStorage, $sessionStorage) {

        if($localStorage.user)
        {
            $rootScope.user = $localStorage.user;
        }
        else if($sessionStorage.user)
        {
            $rootScope.user = $sessionStorage.user;
        }

        $scope.Logout = function() {
            delete $rootScope.user;
            delete $sessionStorage.user;
            if($localStorage.user)
                delete $localStorage.user;
        }

    })
})();