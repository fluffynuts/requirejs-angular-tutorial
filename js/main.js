(function() {
    requirejs.config({
        baseUrl: 'js',
        paths: {
            'angular': '../node_modules/angular/angular',
            'angular-route': '../node_modules/angular-route/angular-route',
            'jquery': '../node_modules/jquery/dist/jquery',
            'prettify': '../bower_components/google-code-prettify/bin/prettify.min'
        },
        map: {
            '*': { 'jquery': 'jquery-private' },
            'jquery-private': { 'jquery' : 'jquery' }
        },
        shim: {
            'angular-route': {
                deps: [ 'angular' ]
            },
            'magic': {
                deps: [ 'prettify' ]
            },
            'app': {
                deps: [ 'angular', 'angular-route', 'toc', 'magic' ]
            }
        }
    });


    // example named module
    define('lib/namedModule', ['jquery'], function($) {
        return { info: 'this is a named module' };
    });

    require([
            'app',
            'lib/namedModule',
            'jquery'
    ], function(app, nm, $) {
        window.console.log(JSON.stringify(nm));
        angular.bootstrap($('#content'), ['angularApp']);
    });
})();
