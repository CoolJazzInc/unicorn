
/**
 * Convert one color format into another.
 */
define(function() {

    'use strict';

    return {
        /**
         * Convert rgb values to a hex color string.
         * A missing value will be converted to 00.
         * @param {Number} r The value for red 0-255.
         * @param {Number} g The value for green 0-255.
         * @param {Number} b The value for blue 0-255.
         * @return {String} The hex color string in lowercase.
         */
        rgbToHex: function(r, g, b) {
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        /**
         * Convert a hex format color to a rgb object.
         * @param {String} hex The hex color string.
         * @return {Object | Null} An object with values for red, green and blue.
         */
        hexToRgb: function(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                red: parseInt(result[1], 16),
                green: parseInt(result[2], 16),
                blue: parseInt(result[3], 16)
            } : null;
        }
    };
});
