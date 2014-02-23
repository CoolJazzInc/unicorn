/**
 * Polyfill for Date.now.
 */
define(function() {
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        };
    }
});
