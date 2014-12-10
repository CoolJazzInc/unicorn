/**
 * Check the type of an object.
 */

define(function() {

    'use strict';

    return {
        /**
         * Check if the object is an array.
         * @param {Object} object The object to check.
         * @return {boolean} The object is an array.
         */
        isArray: function(object) {
            if (Array.isArray) return Array.isArray(object);
            else {
                return !!(object && object.constructor && object.constructor === Array);
            }
        },
        /**
         * Check if the object is an html element.
         * @param {Object} object The object to check.
         * @return {boolean} The object is a html element.
         */
        isElement: function(object) {
            return !!(object && object.nodeType === 1);
        },
        /**
         * Check if the object is an function.
         * @param {Object} object The object to check.
         * @return {boolean} The object is a function.
         */
        isFunction: function(object) {
            return !!(object && object.constructor && object.constructor === Function);
        },
        /**
         * Check if the object is a plain object.
         * @param {Object} object The object to check.
         * @return {boolean} The object is a plain object.
         */
        isObject: function(object) {
            return !!(object && object.constructor && object.constructor === Object);
        },
        /**
         * Check if the object is a string.
         * @param {Object} object The object to check.
         * @return {boolean} The object is a string.
         */
        isString: function(object) {
            return !!(object && object.constructor && object.constructor === String);
        },
        /**
         * Check if the object is a nodelist.
         * @param {Object} object The object to check.
         * @return {boolean} The object is a nodelist.
         */
        isNodelist: function(object) {
            function isMatch(obj, type) {
                return obj && obj.constructor && (obj.constructor === type);
            }
            var match = false;

            if (typeof NodeList !== 'undefined') {
                match = isMatch(object, NodeList);
            }
            if (!match && typeof HTMLCollection !== 'undefined') {
                match = isMatch(object, HTMLCollection);
            }
            if (!match && typeof StaticNodeList !== 'undefined') {
                match = isMatch(object, StaticNodeList);
            }

            return match;
        }
    };
});
