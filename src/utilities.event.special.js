
/**
 * Mouseenter and mouseleave event in all browsers.
 */

define(function(require) {

    'use strict';

    var _event = require('uni/utilities.event');

    return {
        mouseenter: function(node, callback) {
            if ('onmouseenter' in document.body) {
                _event.on(node, 'mouseenter', callback);
            } else {
                _event.on(node, 'mouseover', function(event) {
                    if (!event.relatedTarget || (event.relatedTarget !== this &&
                        !node.contains(event.relatedTarget))) {
                        callback.call(this, event);
                    }
                });
            }
        },

        mouseleave: function(node, callback) {
            if ('onmouseleave' in document.body) {
                _event.on(node, 'mouseleave', callback);
            } else {
                _event.on(node, 'mouseout', function(event) {
                    if (!event.relatedTarget || (event.relatedTarget !== this &&
                        !node.contains(event.relatedTarget))) {
                        callback.call(this, event);
                    }
                });
            }
        }
    };
});
