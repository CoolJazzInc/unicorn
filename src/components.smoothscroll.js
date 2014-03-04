
/**
 * SmoothScroll
 *
 * Scrolls the page with an animation instead of jumping to the new position.
 */

define(function(require) {

    'use strict';

    var object = require('utilities.object'),
        easing = require('utilities.easing');

     function Scroller() {
        this.init.apply(this, arguments);
    }

    /**
     * The default settings.
     */
    var DEFAULTS = {
        speed: 2500, // pixels per second,
        minDuration: 250,
        maxDuration: 1000,
        relativeSpeed: true, // duration of the scroll depends on the distance scrolled.
        offsetTop: 0,
        offsetLeft: 0,
        easing: 'linear'
    };

    /**
     * Initialize the component and set it options.
     * @param {Object} options The custom settings.
     */
    Scroller.prototype.init = function(options) {
        this.settings = object.extend({}, DEFAULTS, options || {});
    }

    /**
     * Scroll to an element on the page.
     * @param {Element} target The element to scroll to.
     */
    Scroller.prototype.scrollTo = function(target) {
        if (target) {
            var offsets = this.getOffsets(),
                position = this.getPosition(target, offsets),
                duration = this.getDuration(position),
                scrollX = offsets.left !== position.left,
                scrollY = offsets.top !== position.top;

            this.scroll(position, duration, offsets, scrollX, scrollY);
        }
    }

    /**
     * Get the window's left and top scrolloffsets.
     * @return {Object} left and top scrolloffsets.
     */
    Scroller.prototype.getOffsets = function() {
        return {
            left: window.pageXOffset || document.documentElement.scrollLeft,
            top: window.pageYOffset || document.documentElement.scrollTop
        };
    }

    /**
     * Scroll the page to the targeted element.
     * @param {Object} position The top and left position of the target.
     * @param {Number} duration The duration of the scroll animation in milliseconds.
     * @param {Object} current The current scrolloffsets.
     * @param {Boolean} scrollX do a horizontal scroll.
     * @param {Boolean} scrollY do a vertical scroll.
     */
    Scroller.prototype.scroll = function(position, duration, current, scrollX, scrollY) {
        var percentage = 0,
            total = 0,
            easing = this.settings.easing,
            animation = setInterval(function() {
                var offsetY = scrollY ?
                        easing[easing](percentage * duration, 0, 1, duration) * position.top :
                        current.top,
                    offsetX = scrollX ?
                        easing[easing](percentage * duration, 0, 1, duration) * position.left :
                        current.left;

                window.scrollTo(current.left + offsetX, current.top + offsetY);

                if (percentage >= 1) clearInterval(animation);
                total += 1000 / 60;
                percentage = (total / duration);
            }, 1000 / 60); // 60fps.
    }

    /**
     * Get the position of the target
     * @param {Element} target The element to scroll to.
     * @param {Object} offsets The current page offsets.
     * @return {Object} The top and left position of the target.
     */
    Scroller.prototype.getPosition = function(target, offsets) {
        var rect = target.getBoundingClientRect();

        return {
            top: offsets.top + (rect.top - offsets.top - this.settings.offsetTop),
            left: offsets.left + (rect.left + offsets.left - this.settings.offsetLeft)
        };
    }

    /**
     * Calculate the duration of the scroll animation.
     * Longer distances take more time.
     * @param {Object} position The top and left position of the target.
     * @return {Number} The duration of the scroll animation in milliseconds.
     */
    Scroller.prototype.getDuration = function(position) {
        if (!this.settings.relativeSpeed) return this.settings.speed;

        // see in what direction we have to scroll the most, horizontally or vertically.
        var distance = Math.max(Math.abs(position.top), Math.abs(position.left)),
            duration = distance / this.settings.speed;

        // keep the duration between the min and max settings.
        duration = Math.min(Math.max(duration * 1000, this.settings.minDuration), this.settings.maxDuration);

        return duration;
    }

    return Scroller;
});
