
/**
 * Tests if the current device supports touch events.
 * @return {boolean} is touch device.
 */

define(function() {

    'use strict';

    return function() {
        return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    };
});
