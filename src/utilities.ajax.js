
define(function(require) {

    /**
     * Create and send Ajax requests.
     * @module ajax
     * @requires utilities.object
     */

    'use strict';

    var object = require('uni/utilities.object');

    /** @lends module:ajax */
    return {
        /**
         * Create the request object.
         * @param {Object} options The options for the request.
         * @return {XMLHttpRequest} The request object.
         */
        createRequest: function(options) {
            var xhr = new XMLHttpRequest();
            options = options || {};

            xhr.onreadystatechange = function(event) {
                if (xhr.readyState == 4) {
                    if (typeof options.ready == 'function') {
                        options.ready(xhr, event);
                    }
                    if (xhr.status == 200) {
                        if (typeof options.success == 'function') {
                            options.success(xhr, event);
                        }
                    } else if (typeof options.error == 'function') {
                        options.error(xhr, event);
                    }
                }
            }

            if (options.progress) {
                xhr.addEventListener('progress', options.progress.bind(this, xhr), false);
            }
            if (options.cancel) {
                xhr.addEventListener('abort', options.cancel.bind(this, xhr), false);
            }

            return xhr;
        },
        /**
         * Send the request.
         * @param {String} method post or get.
         * @param {String} url The url for the request.
         * @param {Object} options The request options.
         */
        sendRequest: function(url, method, options) {
            options = options || {};
            if (!url) return;
            var xhr = this.createRequest(options),
                data;

            if (method == 'get' && options.data) {
                url += ('?' + object.serialize(options.data));
            }

            xhr.open(method || 'get', url, true);

            if (options.contentType) {
                xhr.setRequestHeader('Content-Type', options.contentType);
            } else if (method == 'post' && options.data) {
                data = options.data;
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            }

            xhr.send(data);
        },
        /**
         * proxy for sendRequest using 'GET'.
         * @param {String} url The url for the request.
         * @param {Object} options The request options.
         */
        get: function(url, options) {
            this.sendRequest(url, 'get', options);
        },
        /**
         * proxy for sendRequest using 'POST'.
         * @param {String} url The url for the request.
         * @param {Object} options The request options.
         */
        post: function(url, options) {
            this.sendRequest(url, 'post', options);
        }
    };
});
