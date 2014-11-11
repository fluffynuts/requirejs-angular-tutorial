(function() {
    define([
            'jquery'
        ], function($) {
                function convertCodeBlocks() {
                    var idx = 0;
                    $('pre').each(function() {
                        if ($(this).attr('data-prettify') === 'false') {
                            return;
                        }
                        $(this).addClass('prettyprint');
                        $(this).addClass('linenums');
                        if ($(this).attr('data-no-run') === "true") {
                            return;
                        }
                        var scriptText = $(this).text();
                        var scriptBlock = $('<scr' + 'ipt></scr' + 'ipt>');
                        scriptBlock.attr('type', 'text/javascript');
                        scriptText = 'function auto_' + idx + '() {\ntry { \ntry { clearLogs(); } catch (e) {console.log(e);}\n' + scriptText + '\n} catch (e) { log(\'Uncaught exception: \' + e); }}';
                        scriptBlock.text(scriptText);
                        $(this).after(scriptBlock);
                        if ($(this).attr("data-auto-run") === "true") {
                            eval('auto_' + idx + '();');
                            return;
                        }
                        var p = $('<p></p>');
                        p.css('text-align', 'right');
                        var runButton = $('<button></button>');
                        runButton.text('Run example...');
                        p.append(runButton);
                        var toRun = 'auto_' + idx + '();';
                        runButton.on('click', function() {
                            eval(toRun);
                        });
                        $(this).after(p);
                        idx++;
                    });
                }
                var consoleHeight = '250px';
                function zeroPad(str, places) {
                str = str + '';
                places = places || 2;
                while (str.length < places) {
                    str = '0' + str;
                }
                return str;
                }
                function timestamp() {
                var d = new Date();
                return [
                    zeroPad(d.getHours()),
                    zeroPad(d.getMinutes()),
                    zeroPad(d.getSeconds()) + '.' + zeroPad(d.getMilliseconds(), 3)
                    ].join(':');
                }
                function ibdiv() {
                var result = $('<div></div>');
                result.css('display', 'inline-block');
                return result;
                }
                function createCloseButton() {
                    var closeButton = $('<button></button>');
                    closeButton.text('X');
                    closeButton.attr('title', 'Close');
                    closeButton.css({
                        position: 'absolute',
                        right: '0px'
                    });
                    closeButton.on('click', function() {
                        $('div#consoleWrapper').remove();
                    });
                    return closeButton;
                }
                function createFakeConsoleWrapper() {
                    var wrapper = $('<div></div>');
                    wrapper.attr('id', 'consoleWrapper');
                    wrapper.css({
                    width: '99%',
                    height: consoleHeight,
                    backgroundColor: '#111',
                    color: '#eee',
                    overflow: 'clip',
                    bottom: '0px',
                    position: 'fixed',
                    zIndex: '9999',
                    borderTop: '5px solid white',
                    });
                    return wrapper;
                }
                function createFakeConsoleHeader() {
                    var header = $('<div></div>');
                    header.text('[Console output]');
                    header.css({
                    background: '#444',
                    height: '25px;'
                    });
                    header.append(createCloseButton);
                    return header;
                }
                function createFakeConsole() {
                    var fakeConsole = $('<div></div>');
                    fakeConsole.attr('id', 'console');
                    fakeConsole.css({
                    overflow: 'scroll',
                    height: '225px'
                    });
                    return fakeConsole;
                }
                window.log = function(str) { 
                var fakeConsole = $('div#console');
                if (fakeConsole.length === 0) {
                    var wrapper = createFakeConsoleWrapper();
                    wrapper.append(createFakeConsoleHeader());
                    fakeConsole = createFakeConsole();
                    wrapper.append(fakeConsole);
                    $('body').append(wrapper);
                    var padder = $('<div></div>');
                    padder.css('height', consoleHeight);
                    padder.css('border-top', '5px solid white');
                    $('body').append(padder);
                }
                var logLine = $('<div></div>');
                var ts = ibdiv();
                var spacer = ibdiv();
                var log = ibdiv();
                ts.text(timestamp());
                spacer.css('width', '20px');
                log.text(str);
                logLine.append([ts, spacer, log]);
                fakeConsole.append(logLine);
                fakeConsole.scrollTop(fakeConsole[0].scrollHeight);
                console.log(str); 
                };
                window.clearLogs = function() {
                var fakeConsole = $('div#console');
                if (fakeConsole.length) {
                    fakeConsole.children().remove();
                }
                };
                function addStyle() {
                    var cssSource = 'css/site.css';
                    if ($('link[href="' + cssSource + '"]').length) {
                        return;
                    }
                    var link = $('<link></link>');
                    link.attr('type', 'text/css');
                    link.attr('rel', 'stylesheet');
                    link.attr('href', cssSource);
                    $('head').append(link);
                }
                function refreshCodeBlocks() {
                    convertCodeBlocks();
                    prettyPrint();
                    $(document).trigger('magic-complete');
                }
                $(document).ready(function() {
                    addStyle();
                    refreshCodeBlocks();
                });
                return refreshCodeBlocks;
    });
})();
