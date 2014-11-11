define(['dep', 'nested/dep2'], function(config1, config2) {
    document.getElementsByTagName('body')[0].innerHTML = config1.name + '<br/>' + config2.text;
});
