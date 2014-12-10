
/**
 * Number utilities.
 */
define(function() {

    'use strict';

    return {
        /**
         * Round a number to a maximum of x decimal places.
         * @example round(1, 2) -> 1
         *          round(1.55, 2) -> 1.55
         *          round(1.55555555, 2) -> 1.56
         *
         *
         * @param {Number} number The number to round.
         * @param {Number} decimals Teh maximum number of decimal places.
         * @return {Number} the rounded number.
         */
        round: function(number, decimals) {
            return +(Math.round(number + 'e+' + decimals) + 'e-' + decimals);
        },

        /**
         * Format a number with a specific thousand separator and a specific decimal point.
         * @example formatLocale(10000000000.55, ',') -> '10,000,000,000.55'
         *          formatLocale(10000000000.55, '.') -> '10.000.000.000,55'
         *
         * @param {Number} number The number to format.
         * @param {String} separator The thousands separator.
         * @return {String} The formatted number.
         */
        formatLocale: function(number, separator, decimals) {
            var decimal = separator == ',' ? '.' : ',',
                number_string = typeof decimals != 'undefined' ? number.toFixed(decimals) : number.toString(),
                parts = number_string.split('.');
            return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator) + (parts[1] ? decimal + parts[1] : '');
        }

    };
});
