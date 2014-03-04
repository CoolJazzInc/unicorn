
/**
 * Url utilities.
 */
define(function() {

    'use strict';

    return {
        /**
         * Returns an object with key-value pairs of the parameters passed in the current url.
         * @return {Object} key-value pairs of the parameters passed in the current url.
         */
        getParameters: function() {
            var result = {};
            if (window.location.search.length) {
                var params = window.location.search.substring(1);
                if (params) {
                    var pairs = params.split('&');
                    for (var i = 0; i < pairs.length; i++) {
                        var pair = pairs[i].split('=');
                        result[pair[0]] = decodeURIComponent(pair[1]);
                    }
                }
            }
            return result;
        }
    };
});
