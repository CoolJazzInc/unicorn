
/**
 * Fire and observe events.
 * Both DOM event and events on regular objects.
 *
 * For events on plain objects, only the data send with the event are passed into the callback:
 *  event.on(obj, 'ready', function(data) {//my magic})
 *
 * For events on DOM elements, the event and the data send with the event, are passed into the callback:
 *  event.on(el, 'click', function(event, data) {//my magic})
 *
 */

define(function(require) {

    'use strict';

    var matches = require('uni/utilities.element.matches'),
        storage = require('uni/utilities.storage'),
        typecheck = require('uni/utilities.object.typecheck');

    // private function that executes all registered handlers for the eventtype.
    function _executeCallbacks(object, handlers, event, data) {
        // see what arguments to pass into the callback.
        var extra = [];
        if (event) extra.push(event);
        if (data) extra.push(data);
        if (event && event.detail) extra.push(event.detail);

        for (var i = 0; i < handlers.length; i++) {
            if (!handlers[i].selector || matches(event.target, handlers[i].selector)) {
                handlers[i].callback.apply(object, extra);
            }
        }
    }

    return {
        /**
         * The key with which the events get stored in the object's storage.
         */
        storage_key: 'events_handlers',

        /**
         * Fire an event.
         * @param {Element | Object} object The object that fires the event.
         * @param {String} eventName The event name.
         * @param {*} data The data to send with the event.
         * @param {Boolean} bubbles The event bubbles (for dom-events).
         * @param {Boolean} cancelable The event is cancelable (for dom-events).
         */
        fire: function(object, eventName, data, bubbles, cancelable) {
            if (!object) return;

            // if the object is a dom-node,
            // dispatch the dom-event on the element.
            if (typecheck.isElement(object)) {
                // construct the event.
                var event,
                    eventInitDict = {
                        bubbles: bubbles || true,
                        cancelable: cancelable,
                        detail: data
                    };

                // Event contructor is supported.
                if (typeof Event == 'function') {
                    event = new CustomEvent(eventName, eventInitDict);
                } else if (document.createEvent) {
                    // the old-fashioned way.
                    event = document.createEvent('Event');
                    event.initEvent(eventName, bubbles || true, cancelable);
                    event.detail = data;
                }

                if (document.createEvent) {
                    object.dispatchEvent(event);
                }
            } else {
                // if the object is a some other object,
                // execute the eventhandler for this event-type.
                var events = storage.get(object, this.storage_key);
                if (events && events[eventName]) {
                    var handlers = events[eventName].handlers;
                    _executeCallbacks(object, handlers, null, data);
                }
            }
        },

        /**
         * Execute a function on an event.
         * @param {Element | Object} object The object that listens to the event.
         * @param {String} eventName The event to listen to.
         * @param {Function} callback The function to execute.
         * @param {String} selector A css seelctor the element that triggered the event has to match.
         */
        on: function(object, eventName, callback, selector) {
            if (!object || typeof callback !== 'function') return;

            var handlers = storage.get(object, this.storage_key) || {};
            if (!handlers[eventName]) {
                handlers[eventName] = {handlers: []};
            }

            handlers[eventName].handlers.push({
                callback: callback,
                selector: selector
            });

            // store the handler on the object so it can be removed later.
            storage.set(object, this.storage_key, handlers);

            // if the object is a dom-node and there's no eventlistener for this eventype on the element,
            // add an actual eventlistener.
            if (typecheck.isElement(object) && !handlers[eventName].domEventHandler) {
                handlers[eventName].domEventHandler = function(event) {
                    _executeCallbacks(object, handlers[eventName].handlers, event);
                }

                if (object.addEventListener) {
                    object.addEventListener(eventName, handlers[eventName].domEventHandler);
                } else if (object.attachEvent) {
                    object.attachEvent(eventName, handlers[eventName].domEventHandler);
                }
            }
        },

        /**
         * Remove an eventlistener from an object.
         * @param {Element | Object} object The object to remove the listener from.
         * @param {String} eventName The event name.
         * @param {Function} callback The callback to remove.
         */
        off: function(object, eventName, callback) {
            var handlers = storage.get(object, this.storage_key);
            if (!handlers || !handlers[eventName]) return;

            // if no handler is specified, remove all handlers for the event.
            if (!callback) {
                // if the object is a dom-node, remove the actual eventlistener.
                if (typecheck.isElement(object)) {
                    object.removeEventListener(eventName, handlers[eventName].domEventHandler);
                }
                // remove all callbacks for this event-type from the storage.
                delete handlers[eventName];
            } else {
                // remove the specific callback.
                var typeHandlers = handlers[eventName].handlers;
                for (var i = 0; i < typeHandlers.length; i++) {
                    if (typeHandlers[i].callback === callback) {
                        // remove the callback from the handlers.
                        typeHandlers.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
});
