/**
 * Let's you execute a callback with a maximum frequency.
 * For instance, when you bind a callback to a window resize event,
 * this let's you execute the callback not on every resize event, but only every x milliseconds.
 *
 * @example
 * // execute resizeAction no more than once in every 100 milliseconds.
 * var resizeAction = function() {
 *      // magic on window resize
 * }
 * var resizeHandler = new Throttle(resizeAction, 100);
 * _event.on('resize', resizeHandler);
 */

define(function() {

    'use strict';

    /**
     * Create and return the 'timed' function.
     * @class Throttle
     * @param {Function} callback The callback to execute.
     * @param {Number} frequency The maximum frequency, in milliseconds, for executing the callback.
     * @return {Function} A function that executes the callback no more than once every x milliseconds.
     */
    var Throttle = function(callback, frequency) {
        return function(callback, frequency) {
            clearTimeout(this.timer);
            this.timer = setTimeout(callback, frequency);
        }.bind(this, callback, frequency);
    };

    return Throttle;
});
