/**
 * Polyfill for Function.prototype.bind
 */
define(function() {

    'use strict';

    return function(element) {
        if (!element || !element.getBoundingClientRect) return null;

        var rect = element.getBoundingClientRect();
        if (!rect.height || !rect.width) {
            rect = {
                top: rect.top,
                bottom: rect.bottom,
                left: rect.left,
                right: rect.right,
                height: Math.abs(rect.top - rect.bottom),
                width: Math.abs(rect.left - rect.right)
            };
        }
        return rect;
    }
});
