requirejs.config({
    baseUrl: 'js',
    paths: {
        'angular': '../../../node_modules/angular/angular',
        'angular-route': '../../../node_modules/angular-route/angular-route',
        'jquery': '../../../node_modules/jquery/dist/jquery',
    },
    map: {
    },
    shim: {
        'angular-route': {
            deps: [ 'angular' ]
        },
        'someApp': {
            deps: [ 'angular', 'angular-route' ]
        }
    }
});
define('inline1', ['jquery'], function(myDollar) {
    return {
        demo: function() {
            myDollar.get('someData.json').then(function(data) {
                var mkDiv = function(withText) {
                    var theDiv = myDollar('<div></div>');
                    if (withText) {
                        theDiv.text(withText);
                    }
                    return theDiv;
                }
                var body = myDollar('body');
                var container = myDollar(mkDiv());
                body.append(container);
                container.append(mkDiv('myDollar.get result: ' + data.title));
                container.append(mkDiv('global $ object type: ' + typeof($)));
                // scroll down...
                body.animate({scrollTop: myDollar(document).height() }, 500);
                window.setTimeout(function() {
                    container.remove();
                }, 5000);
            });
        }
    }
});
require(['inline1'], function(mod) {
    mod.demo();
});   
