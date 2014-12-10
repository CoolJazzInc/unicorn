
/**
 * Execute a callback when an image is loaded.
 * Fixes issue with browsers not firing the load event when the image is loaded from cache.
 */

define(function(require) {

    'use strict';

    var event = require('uni/utilities.event');

    /**
     * Check if the image is loaded.
     * If not, add a load event listener.
     * @class OnImageLoad
     */
    var OnImageLoad = function() {
        this.init.apply(this, arguments);
    };

    /**
     * Check if the image is loaded, if not, attach a load listener.
     * @param {Element} image The image to check.
     * @param {Function} callback The function to execute when the image is loaded.
     * @memberof OnImageLoad
     */
    OnImageLoad.prototype.init = function(image, callback) {
        if (image.nodeType === 1 && image.tagName.toLowerCase() === 'img') {
            if (image.complete || image.readyState === 4) {
                // if the image is already loaded, execute the callback.
                this.onload(image, callback);
            } else {
                // attach the load listener.
                event.on(image, 'load', this.onload.bind(this, image, callback));
            }
        }
    };

    /**
     * Execute a function when the image is loaded.
     * @param {Element} image The image that is loaded.
     * @param {Function} callback The function to execute.
     * @memberof OnImageLoad
     */
    OnImageLoad.prototype.onload = function(image, callback) {
        callback.apply(image);
    };

    return OnImageLoad;
});
