/**
 * Utilities for manipulating objects.
 */

define(function(require) {

    'use strict';

    var typeCheck = require('uni/utilities.object.typecheck');

    return {
        /**
         * Based on jQuery's Object.extend.
         * @return {Object} the extended object.
         */
        extend: function() {
            var src, copyIsArray, copy, name, options, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            if (length < 2) return target;

            // Handle a deep copy situation
            if (typeof target === 'boolean') {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== 'object' && !typeCheck.isFunction(target)) {
                target = {};
            }

            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && (typeCheck.isObject(copy) || (copyIsArray = typeCheck.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && typeCheck.isArray(src) ? src : [];

                            } else {
                                clone = src && typeCheck.isObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            target[name] = this.extend(deep, clone, copy);

                            // Don't bring in undefined values
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        },

        /**
         * Convert an key-value type object into a querystring.
         * @param {Object} object The object to serialize.
         *  {apple: 'green', cherry: 'red} -> 'apple=green&cherry=red'.
         * @return {String} The serialzed object.
         */
        serialize: function(object) {
            var pairs = [];
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
                }
            }
            return pairs.join('&');
        }
    };
});
