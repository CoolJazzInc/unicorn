
/**
 * Shuffle an array using the Fisher–Yates shuffle.
 * The original array is shuffled and returned.
 * If a non-array(like) object is passed in, it returns the unchanged object.
 *
 * @param {Array} array The array to shuffle.
 * @return {Array} The shuffled array.
 */
define(function() {

    'use strict';

    return function(array) {
        // the Fisher-Yates shuffle algorithm.
        function fisherYates(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var rand = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[rand];
                array[rand] = temp;
            }
            return array;
        }

        return array && array[0] ? fisherYates(array) : array;
    };
});
