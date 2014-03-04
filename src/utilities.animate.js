
/**
 * Animate a numeric property from on value to another.
 * The duration of the animation and the easing function to use can be set.
 */

define(function(require) {

    'use strict';

    var object = require('uni/utilities.object'),
        now = require('uni/utilities.date.now'), // polyfill for Date.now().
        raf = require('uni/utilities.requestanimationframe'), // polyfill for requestAnimationFrame.
        easing = require('uni/utilities.easing'),

    /**
     * The default settings.
     */
        _DEFAULTS = {
            easing: 'linear',
            duration: 1000,
            beforeStart: null,
            onTick: null,
            complete: null
        };

    /**
     * Constructor, sets the basic options.
     */
    function Animator(options) {
        this.settings = object.extend({}, _DEFAULTS, options || {});
    }

    /**
     * Initialize the animator.
     * @param {Number} valuestart The current value.
     * @param {Number} valueend The value to animate to.
     * @param {Number} duration The duration of the animation.
     * @param {String | Function} easingFunc The easing function to use.
     * Either a method in the easing object as string or a function.
     */
    Animator.prototype.animate = function(valuestart, valueend, duration, easingFunc) {

        var multiplier = (valueend < valuestart) ? -1 : 1, // value getting smaller or bigger.
            timestart = Date.now(),
            timecurrent = 0,
            change = Math.abs(valuestart - valueend),
            valuenew = 0;

        easingFunc = typeof easingFunc == 'function' ? easingFunc :
            (typeof easingFunc == 'string' ? easing[easingFunc] : easing[this.settings.easing]);
        duration = typeof duration !== 'undefined' ? duration : this.settings.duration;

        // process one frame in the animation.
        function tick() {
            var now = Date.now();
            timecurrent = Math.max(now - timestart, 1); // make sure timecurrent is not 0 for the first step.
            if (timecurrent > duration) timecurrent = duration; // don't go beyond the set duration.

            // calculate the new position.
            valuenew = valuestart + (multiplier *
                Math.abs(easingFunc(timecurrent, valuestart, change, duration) - valuestart));

            // execute a function after each tick.
            if (typeof this.settings.onTick == 'function') {
                this.settings.onTick(valuenew, timecurrent);
            }

            // if the target hasn't been reached, do another tick.
            if (valuenew != valueend) {
                this.frameId = requestAnimationFrame(tick.bind(this));
            } else {
                this.onAnimationEnd();
            }
        }

        // execute optional function before the animation starts.
        if (typeof this.settings.beforeStart == 'function') this.settings.beforeStart.call(this);

        // start the animation.
        if (valuestart !== valueend) tick.call(this);
    }

    /**
     * Stop the animation.
     */
    Animator.prototype.stop = function() {
        cancelAnimationFrame(this.frameId);
    }

    /**
     * Execute when the animation has ended.
     */
    Animator.prototype.onAnimationEnd = function() {
        if (typeof this.settings.complete == 'function') this.settings.complete.call(this);
    }

    // return the module's function.
    return function(settings) {
        return new Animator(settings);
    };

});
