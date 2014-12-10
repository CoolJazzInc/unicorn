
/**
 * Url utilities.
 */
define(function() {

    'use strict';

    var _object = require('uni/utilities.object');

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
        },

        /**
         * Returns an object with key-value pairs of the parameters in a url string.
         * @param {String} url Teh url-like string.
         * @return {Object} key-value pairs of the parameters passed in the url string.
         */
        getParametersFromUrlString: function(url) {
            var result = {},
                search = /\?(.+)/.exec(url);

            if (search && search.length) {
                var pairs = search[1].split('&');
                for (var i = 0, l = pairs.length; i < l; i++) {
                    var pair = pairs[i].split('=');
                    result[pair[0]] = decodeURIComponent(pair[1]);
                }
            }
            return result;
        },

        /**
         * Constructs a url with the specified parameters and values.
         * @param {String} url The url.
         * @param {Object} params Key-value pairs of parameters.
         * @return {String} The url with the parameters in it.
         */
        setParametersToUrlString: function(url, params) {
            var originalParams = this.getParametersFromUrlString(url);
            var updatedParams = _object.extend(originalParams, params);

            var baseUrl = /([^?]+)/.exec(url)[1] + '?';
            var newUrl = baseUrl + _object.serialize(updatedParams);

            return newUrl;
        }
    };
});
