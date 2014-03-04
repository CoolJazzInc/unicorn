/**
 * Check the type of an object.
 */

define(function(){

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
            var list;
            if (typeof NodeList !== 'undefined') list = NodeList;
            else if (typeof StaticNodeList !== 'undefined') list = StaticNodeList; // ie8 calls it 'StaticNodeList'.
            return !!(list && object && object.constructor && (object.constructor === list));
        }
    };
});
