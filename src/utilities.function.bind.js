/**
 * Polyfill for Function.prototype.bind
 */
define(function() {

    'use strict';

    if (!('bind' in Function)) {
        /**
         * How bind works:
         *
         * arguments passed into the bind function get passed in the bonded function
         * any arguments passed into the bonded function are passed after that argument
         *
         * var fn = function(){ console.log(arguments) };
         *
         * $(document).click(fn.bind(this)) //=> log: [event]
         * $(document).click(fn.bind(this, 'foo', 'bar')) //=> log: ['foo', 'bar', event]
         */

        Function.prototype.bind = function(context) {
            if (arguments.length < 2 && typeof arguments[0] === 'undefined') return this;

            var _method = this;
            // remove first argument, which is the context
            var args = Array.prototype.slice.call(arguments, 1);

            return function() {
                // make a 'real' array from arguments
                var arArguments = Array.prototype.slice.call(arguments, 0);
                // add them to the aruments passed in the bind function
                var allArgs = args.concat(arArguments);
                return _method.apply(context, allArgs);
            }
        }
    }
});
