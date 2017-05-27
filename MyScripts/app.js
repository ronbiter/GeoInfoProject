/**
 * Created by ron on 5/1/2017.
 */
var app = angular.module('FtsApp',[
    'ngRoute',
    'ngCookies',
    'ngStorage',
    'ui.grid',
    'ui.grid.selection',
    'ui.router',
    'ngMaterial'
]);

app.run(function ($rootScope) {

    $('.nav a').on('click', function(){
        $('.nav').find('.active').removeClass('active');
        $(this).parent().addClass('active');
    });

    $rootScope.$on("$stateChangeError", console.log.bind(console));
    $rootScope.date = new Date();

})