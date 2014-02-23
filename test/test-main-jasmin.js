
define('tests', function(require) {

    // all tests here.
    var str = require('test/utilities.string.test'),
        color = require('test/utilities.color.test'),
        css = require('test/utilities.css.test'),
        storage = require('test/utilities.storage.test'),
        checker = require('test/utilities.object.typecheck.test'),
        dom = require('test/utilities.dom.query.test'),
        dom2 = require('test/utilities.dom.manipulate.test'),
        classlist = require('test/utilities.element.classlist.test');
        objext = require('test/utilities.object.extend.test');
        objser = require('test/utilities.object.serialize.test');


    /* Run jasmin unit tests */
    return function() {
        var jasmineEnv = jasmine.getEnv(),
            htmlReporter = new jasmine.HtmlReporter();

        jasmineEnv.updateInterval = 1000;

        jasmineEnv.addReporter(htmlReporter);

        jasmineEnv.specFilter = function(spec) {
            return htmlReporter.specFilter(spec);
        };

        function execJasmine() {
            jasmineEnv.execute();
        }

        execJasmine();
    };

});

requirejs.config({
    baseUrl: '../',

    paths: {
        uni: 'unicorn'
    }
});

requirejs(['tests'], function(runner) {
    runner();
});
