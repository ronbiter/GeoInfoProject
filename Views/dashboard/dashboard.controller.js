(function () {
    'use strict';

    angular.module('FtsApp').controller('dashboardController', dashboardController);

    function dashboardController($scope, dashboardFactory) {

        $scope.tabs = dashboardFactory.tabs;

        $scope.selectedIndex = 0;

        var selected = null,
            previous = null;

        $scope.$watch('selectedIndex', function(current, old){
            previous = selected;
            selected = tabs[current];
        });
    }
})();