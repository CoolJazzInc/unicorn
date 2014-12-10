
/**
 * String mutations.
 */

define(function() {

    'use strict';

    return {
        /**
         * Return scroll position
         */
        getPosition: function() {
            var target = (document.documentElement || document.body.parentNode || document.body),
                x = (window.pageXOffset !== undefined) ? window.pageXOffset : target.scrollLeft,
                y = (window.pageYOffset !== undefined) ? window.pageYOffset : target.scrollTop;

            return {
                // catering to multiple reflexes
                x: x,
                y: y,
                left: x,
                top: y
            }
        }
    };
});
