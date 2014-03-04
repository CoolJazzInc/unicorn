
/**
 * Text selection utilities.
 */

define(function() {

    'use strict';

    return {
        /**
         * Select all text in an node.
         * @this Unicorn.selection
         * @param {Element} element Element which content to select.
         */
        selectAll: function(element) {
            var range = document.createRange();
            range.selectNodeContents(element);
            this.setSelection(range);
        },
        /**
         * Select a specific range.
         * @this Unicorn.selection
         * @param {Element} startNode The node in which the range starts.
         * @param {Element} endNode  The node in which the range ends.
         * @param {Number} startOffset The startoffset for the range.
         * @param {Number} endOffset The endoffset for the range.
         */
        selectRange: function(startNode, endNode, startOffset, endOffset) {
            var range = document.createRange();
            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset);
            this.setSelection(range);
        },
        /**
         * Set a selection.
         * @param {Object} range The textrange object.
         */
        setSelection: function(range) {
            if (document.activeElement) document.activeElement.blur();
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
});
