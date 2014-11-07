define(['angular'],
    function() {
        'use strict';
        var config = [
            '$routeProvider',
            function(routeProvider) {
                routeProvider
                .when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'homeController'
                })
                .when('/simple', {
                    templateUrl: 'views/simple.html',
                    controller: 'homeController'
                })
                .otherwise({
                        redirectTo: '/home'
                });

            }];
    return config;
});
