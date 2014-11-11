define([
        'jquery',
        'routing',
        'controllers/default'
            ], function(
                $,
                config,
                defaultController
            ) {
                'use strict';
                var app = angular.module('angularApp', ['ngRoute']);
                app.config(config);
                app.controller('defaultController', defaultController);

                angular.bootstrap($('#content'), ['angularApp']);
});
