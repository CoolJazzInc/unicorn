
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

    var _matches = require('uni/utilities.element.matches'),
        _storage = require('uni/utilities.storage'),
        _typecheck = require('uni/utilities.object.typecheck');

    // private function that executes all registered handlers for the eventtype.
    function _executeCallbacks(object, handlers, event, data) {
        // see what arguments to pass into the callback.
        var extra = [];
        if (event) {
            extra.push(event);
            if (event.detail) extra.push(event.detail);
            if (!event.target) event.target = event.srcElement;
            if (!event.currentTarget) event.currentTarget = object;
        }
        else event = {};
        if (data) extra.push(data);

        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i].selector) {
                // check is the event is triggered by an element that matches the selector,
                // or the event bubbled past the selector.
                var match = null,
                    node = event.target;

                while (!match && node && node !== object) {
                    if (_matches(node, handlers[i].selector)) {
                        match = node;
                    } else {
                        node = node.parentNode;
                    }
                }
                // store the matched target to the event.
                if (match) {
                    event.selectedTarget = match;
                }
            }
            // if the there was no selector, or the selctor matched, execute the callback.
            if (!handlers[i].selector || match) {
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
            if (_typecheck.isElement(object)) {
                // construct the event.
                var event,
                    eventInitDict = {
                        bubbles: bubbles || true,
                        cancelable: cancelable,
                        detail: data
                    };

                // Event constructor is supported.
                if (typeof CustomEvent == 'function') {
                    event = new CustomEvent(eventName, eventInitDict);
                } else if (document.createEvent) {
                    // the old-fashioned way.
                    event = document.createEvent('Event');
                    event.initEvent(eventName, bubbles || true, cancelable);
                    event.detail = data;
                } else if (document.createEventObject) {
                    // the prehistoric way.
                    event = document.createEventObject();
                }

                if (document.createEvent) {
                    object.dispatchEvent(event);
                } else if (document.createEventObject) {
                    object.fireEvent('on' + eventName, event);
                }
            } else {

                // if the object is a some other object,
                // execute the eventhandler for this event-type.
                var events = _storage.get(object, this.storage_key);
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
         * @param {String} selector A css selector the element that triggered the event has to match.
         */
        on: function(object, eventName, callback, selector) {
            if (!object || typeof callback !== 'function') return;

            var isDomObject = _typecheck.isElement(object) || object == document || object == window;

            if (isDomObject && !object.addEventListener) {
                eventName = 'on' + eventName;
            }

            var handlers = _storage.get(object, this.storage_key) || {};
            if (!handlers[eventName]) {
                handlers[eventName] = {handlers: []};
            }

            handlers[eventName].handlers.push({
                callback: callback,
                selector: selector
            });

            // store the handler on the object so it can be removed later.
            _storage.set(object, this.storage_key, handlers);

            // if the object is a dom-node and there's no eventlistener for this eventtype on the element,
            // add an actual eventlistener.
            if (isDomObject && !handlers[eventName].domEventHandler) {
                handlers[eventName].domEventHandler = function(event) {
                    _executeCallbacks(object, handlers[eventName].handlers, event);
                };

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
            var handlers = _storage.get(object, this.storage_key);
            if (!handlers || !handlers[eventName]) return;

            // if no handler is specified, remove all handlers for the event.
            if (!callback) {
                // if the object is a dom-node, remove the actual eventlistener.
                if (_typecheck.isElement(object)) {
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
