
/**
 * Loop through an array, object or nodelist.
 * @param {(Object|Array)} object The object to loop through.
 * @param {Function} func The function to execute on each item in the object.
 */

define(function(require) {

    'use strict';

    var typeCheck = require('uni/utilities.object.typecheck');

    return function(object, func) {
        // plain object.
        if (typeCheck.isObject(object)) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    func(key, object[key]);
                }
            }
        // array-like object.
        } else if (object.length) {
            for (var i = 0; i < object.length; i++) {
                func(object[i], i);
            }
        }
    };
});
