
/**
 * Tests if the current browser supports a css property.
 * Test either one property like 'box-shadow' or multiple properties like
 * ['-webkit-box-shadow', '-moz-box-shadow', 'box-shadow'].
 *
 * If one of the properties is supported, the method returns true.
 */

define(function() {

    'use strict';

    /**
     * Test support for a css property and value.
     * @param {String | Array} properties The properties to check support for.
     * @return {String | Boolean} the property that is supported or false.
     */
    return function(properties, value) {
        var support = false;

        if (window.CSS && window.CSS.supports) {
            if (typeof properties == 'string') {
                support = window.CSS.supports(properties, value) ? properties : false;
            } else {
                for (var prop in properties) {
                    if (window.CSS.supports(properties[prop], value)) support = properties[prop];
                }
            }
        } else {
            var element = document.documentElement;
            if (typeof properties == 'string') {
                support = properties in element.style ? properties : false;
            } else {
                for (prop in properties) {
                    if (properties[prop] in element.style) support = properties[prop];
                }
            }
        }

        return support;
    };
});
