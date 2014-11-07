define([],
    function() {
        return [
            '$scope',
            function(scope) {
                scope.buttonText = 'Click me';
                scope.sayHello = function() {
                    alert('hello');
                    scope.buttonText = 'Click me again';
                };
            }
        ];
});

