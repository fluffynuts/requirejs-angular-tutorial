(function() {
    define(['magic', 'jquery'],
        function(magic, $) {
            return [
                '$scope',
                function(scope) {
                    scope.$watch('assignments', function(value) {
                        magic();
                        window.setTimeout(function() {
                            if ($(document).height() <= $(window).height()) {
                                return;
                            }
                            var scrollTopEl = $("div#footer-clone").length ? $("div#footer-clone") : $("body");
                            $('body').animate({
                                scrollTop: scrollTopEl.offset().top
                            }, 500);
                        }, 100);
                    });
                }
            ];
    });
})();
