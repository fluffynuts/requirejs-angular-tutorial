define(['config'],
    function(config) {
        'use strict';
        var routing = [
            '$routeProvider',
            function(routeProvider) {
                function viewNameFor(tocItem) {
                    var hashUrl = tocItem[1];
                    return hashUrl.replace(/^#\//, '');
                }
                function routeUrlFor(tocItem) {
                    var hashUrl = tocItem[1];
                    return hashUrl.replace(/^#/, '');
                }
                function viewFor(tocItem) {
                    return ['views/', viewNameFor(tocItem), '.html'].join('');
                }
                function controllerFor(tocItem) {
                    return tocItem[2] || "defaultController";
                }
                config.TOC.forEach(function(item) {
                    routeProvider.when(routeUrlFor(item), {
                        templateUrl: viewFor(item),
                        controller:  controllerFor(item)
                    });
                });
                routeProvider.otherwise({
                        redirectTo: routeUrlFor(config.TOC[0][1])
                });
            }];
    return routing;
});
