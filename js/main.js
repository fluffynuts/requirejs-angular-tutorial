(function() {
    requirejs.config({
        baseUrl: 'js',
        paths: {
            'angular': '../node_modules/angular/angular',
            'angular-route': '../node_modules/angular-route/angular-route',
            'jquery': '../node_modules/jquery/dist/jquery',
            'prettify': '../bower_components/google-code-prettify/bin/prettify.min'
        },
        shim: {
            'angular-route': {
                deps: [ 'angular' ]
            },
            'toc': {
                deps: [ 'jquery' ]
            },
            'magic': {
                deps: [ 'jquery', 'prettify' ]
            },
            'app': {
                deps: [ 'angular', 'angular-route', 'toc', 'magic' ]
            }
        }
    });
    define('lib/namedModule', [], function() {
        return { info: 'this is a named module' };
    });
    require([
            'app',
            'lib/namedModule'
    ], function(app, nm) {
        angular.bootstrap($('#content'), ['angularApp']);
    });
})();
