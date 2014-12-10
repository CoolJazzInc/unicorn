define(function() {

    /**
     * Lets you accurately simulate a keyboard event.
     * IE9+
     *
     * @example
     * var my_input = document.getElementById('my-input');
     * simulate(13, my_input); -> simulates pressing the enter key on the input.
     */

    'use strict';

    return {
        /**
         * Simulate a keyboard event.
         * @param {Number} keycode The keycode of the key to simulate
         * @param {*|Element} trigger The object that should fire the event. Defaults to document.
         * @param {*|String} eventname The event to fire (keydown, keyup, keypress) Defaults to keydown
         * @param {*|Object} properties Any additional properties to set to the event object.
         */
        simulate: function(keycode, trigger, eventname, properties) {
            eventname = eventname || 'keydown';
            trigger = trigger || document;

            var event = document.createEvent('KeyboardEvent');

            // Fix a bug in Chrome that always sets the 'keyCode' and 'which' properties to 0.
            Object.defineProperty(event, 'keyCode', {
                get: function() {
                    return this.keyCodeVal;
                }
            });
            Object.defineProperty(event, 'which', {
                get: function() {
                    return this.keyCodeVal;
                }
            });

            if (event.initKeyboardEvent) {
                event.initKeyboardEvent(eventname, true, true, window, keycode, keycode, '', '', false, '');
            } else if (event.initKeyEvent) {
                event.initKeyEvent(eventname, true, true, window, keycode, keycode, '', '', false, '');
            }

            event.keyCodeVal = keycode;

            // set any additional properties to the event object.
            if (properties) {
                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        event[key] = properties[key];
                    }
                }
            }

            if (event.keyCode !== keycode) {
                //console.log('could not simulate key press ', event.keyCode, event.which);
            }

            trigger.dispatchEvent(event);
        }
    };

});
