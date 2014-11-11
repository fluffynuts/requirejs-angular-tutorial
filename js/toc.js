define([
        'config',
        'jquery',
        'angular'
       ], function(config, $) {
    var target = $("ol#toc");
    if (target.length === 0) {
        return;
    }
    function mkLink(url, title) {
        return $("<a></a>")
                .attr("href", url)
                .text(title);
    }
    function createTOC() {
        $(target).children().remove();
        config.TOC.forEach(function(item) {
            var li = $("<li></li>");
            var doc = window.location.hash;
            li.attr("data-url", item[1]);
            if (doc == item[1]) {
                li.text(item[0]);
                li.css("font-weight", "bold");
            } else {
                li.append(mkLink(item[1], item[0]));
            }
            $(target).append(li);
        });
    }
    function createRelativeLinks() {
        var currentHash = window.location.hash;
        var hashes = config.TOC.reduce(function(acc, item) {
            acc.push(item[1]);
            return acc;
        }, []);
        var titles = config.TOC.reduce(function(acc, item) {
            acc.push(item[0]);
            return acc;
        }, []);
        var currentIdx = hashes.indexOf(currentHash);
        var result = {
            prev: null,
            next: null
        };
        if (currentIdx > 0) {
            result.prev = mkLink(hashes[currentIdx-1], "<< " + titles[currentIdx-1]);
        }
        if (currentIdx < (hashes.length-1)) {
            result.next = mkLink(hashes[currentIdx+1], titles[currentIdx+1] + " >>");
        }
        return result;
    }

    function createFooter() {
        var copyQuickNavToHeading = $('body [data-no-copy-toc="true"]').length == 0;
        var relativeLinks = createRelativeLinks();
        var footer = $("div#footer");
        if (footer.length == 0) {
            footer = $("<div></div>");
            footer.attr("id", "footer");
            footer.css({
                bottom: "20px",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "10px"
            });
        }
        footer.children().remove();
        var prevWrapper = $("<div></div>");
        prevWrapper.css({
                width: "40%",
                display: "inline-block",
                textAlign: "left"
        });
        if (relativeLinks.prev) {
            prevWrapper.append(relativeLinks.prev);
        }
        footer.append(prevWrapper);
        var middleWrapper = $("<div></div>");
        middleWrapper.css({
                width: "20%",
                display: "inline-block",
                textAlign: "center"
        });
        footer.append(middleWrapper);

        var nextWrapper = $("<div></div>");
        nextWrapper.css({
                width: "40%",
                display: "inline-block",
                textAlign: "right"
        });
        if (relativeLinks.next) {
            nextWrapper.append(relativeLinks.next);
        }
        footer.append(nextWrapper);
        $("body").append(footer);
        var existingClone = $("#footer-clone");
        if (existingClone.length) {
            existingClone.remove();
        }
        if (copyQuickNavToHeading) {
            var clone = footer.clone();
            clone.attr("id", "footer-clone");
            clone.insertAfter("ol#toc");
        }
        window.setTimeout(function() {
            if (footer.offset().top > window.innerHeight) {
                var middleAnchor = $("<a></a>");
                middleAnchor.attr("href", "#");
                middleAnchor.text("Top");
                middleAnchor.on("click", function() {
                    $(document).scrollTop(0);
                    return false;
                });
                middleWrapper.append(middleAnchor);
            }
        }, 1000);
    }

    function makeLinksResponsive() {
        $(window).on('hashchange', function() {
            createTOC();
            createFooter();
        });
    }
    $(document).ready(function() {
        createTOC();
        createFooter();
        makeLinksResponsive();
    });
});
