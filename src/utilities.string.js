
/**
 * String mutations.
 */

define(function() {

    'use strict';

    return {
        /**
         * Capitalize the first character in the string: tomato -> Tomato
         * @param {String} string The string.
         * @return {String} The capitilized string.
         */
        capitalize: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        /**
         * Camelize the string: border-top-width -> borderTopWidth
         * @param {String} string The string.
         * @return {String} The camilized string.
         */
        camelize: function(string) {
            return string.replace(/-(.)/g, function($0, $1) {
                return $1.toUpperCase();
            });
        }
    };
});
