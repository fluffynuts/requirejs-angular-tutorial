define([
        'angularConfig',
        'controllers/home'
            ], function(
                config,
                homeController
            ) {
                'use strict';
                var app = angular.module('angularApp', ['ngRoute']);
                app.config(config);
                app.controller('homeController', homeController);
                return app;
});
