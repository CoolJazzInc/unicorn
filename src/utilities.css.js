
/**
 * Get and set current css properties on elements.
 */
define(function(require) {

    'use strict';

    var typecheck = require('uni/utilities.object.typecheck');

    return {
        /**
         * Get the current value of a css property on an element
         * @param {Element} element The element.
         * @param {String} property The property to get the value from.
         * @return {String} The value.
         */
        get: function(element, property) {
            if (element.compareDocumentPosition(document.documentElement) & 1) { // not in DOM
                var value = element.style[property];
            }
            else if (window.getComputedStyle) {
                value = getComputedStyle(element, null).getPropertyValue(property);
            } else if (element.currentStyle) {
                value = element.currentStyle[property];
            }

            return value || '';
        },
        /**
         * Set the value of one or more css properties on an element.
         * @param {Element} element The element.
         * @param {Object | String} property Key-value pairs object of css properties or single property as string.
         * @param {String} value The value for the single property.
         */
        set: function(element, property, value) {
            var setter = element.style.setProperty ? 'setProperty' : 'setAttribute';
            if (typecheck.isObject(property)) {
                for (var prop in property) {
                    // if there's a value, set it.
                    if (property[prop]) element.style[setter](prop, property[prop]);
                    // else, remove the property.
                    else this.remove(element, prop);
                }
            } else if (typecheck.isString(property)) {
                if (value) {
                    element.style[setter](property, value);
                } else {
                    this.remove(element, property);
                }
            }
        },
        /**
         * Remove a style property from an element.
         * @param {Element} element The element to remove the property from.
         * @param {String} property The property to remove.
         */
        remove: function(element, property) {
            var remover = element.style.removeProperty ? 'removeProperty' : 'removeAttribute';
            element.style[remover](property);
        }
    };
});
