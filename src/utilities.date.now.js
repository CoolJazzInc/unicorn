/**
 * Polyfill for Date.now.
 */
define(function() {

    'use strict';

    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        };
    }
});
