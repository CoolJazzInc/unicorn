
/**
 * Check if an element matches a selector.
 *
 * @param {Element} element The element to check.
 * @param {String} selector The selector to match.
 * @return {Boolean} match.
 */
define(function() {

    'use strict';

    return function(element, selector) {
        // Check if native matches function is available.
        var pt = Element.prototype,
            native = pt.matches ||
                pt.webkitMatchesSelector ||
                pt.mozMatchesSelector ||
                pt.msMatchesSelector ||
                pt.oMatchesSelector;


        // Check if the element matches the selector.
        if (native) {
            return native.call(element, selector);
        } else {
            var doc = document.createDocumentFragment();
            doc.appendChild(element.cloneNode(false));
            return !!doc.querySelector(selector);
        }
    }
});
