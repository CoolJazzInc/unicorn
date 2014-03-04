
/**
 * On a paste event, fire an event with the content that is pasted.
 */

define(function(require) {

    'use strict';

    var event = require('uni/utilities.event'),
        dom = require('uni/utilities.dom');

    var PasteBroadcaster = function() {
        this.init.apply(this, arguments);
    };

    /**
     * Initialize the component.
     * @param {Element} element The element to manipulate.
     */
    PasteBroadcaster.prototype.init = function(element) {
        this.element = element;

        // test available methods for processing clipboard data.
        this.processingMethod = 3; // no clipboard access supported.
        try {
            var e = new Event('');
            if ('clipboardData' in e) this.processingMethod = 1; // Webkit
        } catch (e) {
            // not supported.
        }

        if (window.clipboardData) this.processingMethod = 2; // IE

        if (this.processingMethod == 3) { // Firefox, others
            event.on(element, 'keydown', this.onKeyDown.bind(this));
            event.on(element, 'keyup', this.onKeyUp.bind(this));
        } else {
            event.on(element, 'paste', this.onPaste.bind(this));
        }
    };

    /**
     * Handle the paste event.
     * @param {Event} event The paste event.
     */
    PasteBroadcaster.prototype.onPaste = function(event) {
        var element = event.target;
        if (this.processingMethod == 1) {
            var content = event.clipboardData.getData('text/plain');
        } else if (this.processingMethod == 2) {
            content = window.clipboardData.getData('text');
        }

        if (content) {
            event.fire(element, 'clipboard.paste', {
                content: content,
                originalEvent: event
            });
        } else {
            // create temporary element to hijack the paste event.
            var position = element.getBoundingClientRect();
            var pastebin = document.createElement('input');
            pastebin.style.position = 'fixed';
            pastebin.style.opacity = '0';
            // position the same as the input so the page doesn't jump when focusing the tmp input.
            pastebin.style.top = position.top;
            pastebin.style.left = position.left;
            pastebin.style.opacity = '0';
            dom.append(document.body, pastebin);

            // focus it, so the content gets pasted in this element.
            pastebin.focus();

            setTimeout(function() {
                content = pastebin.value;
                event.fire(element, 'clipboard.paste', {
                    content: content,
                    originalEvent: event
                });
                dom.remove(pastebin);
            }.bind(this), 10);
        }
    };

    /**
     * Handle the keydown event.
     * @param {Event} event The keydown event.
     */
    PasteBroadcaster.prototype.onKeyDown = function(event) {
        if (event.keyCode == 17) { // Ctrl
            this.ctrlDown = true;
        } else if (event.keyCode == 86 && this.ctrlDown) { // v
            this.onPaste(event);
        }
    };

    /**
     * Handle the keyup event.
     * @param {Event} event The keyup event.
     */
    PasteBroadcaster.prototype.onKeyUp = function(event) {
        if (event.keyCode == 17) { // Ctrl
            this.ctrlDown = false;
        }
    };


    return PasteBroadcaster;

});
