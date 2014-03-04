/**
 * Polyfill for requestAnimationFrame.
 */
define(function() {

    'use strict';

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 1000 / 60); // go for 60fps.
            };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            window.clearTimeout(id);
        };
    }
});
