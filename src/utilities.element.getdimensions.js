/**
 * Get the dimensions of an element, even if it it hidden.
 * @param {Element} element The element to measure.
 * @return {Object} The inner and outer-dimensions of the element.
 */

define(function(require) {

    'use strict';

    var css = require('uni/utilities.css'),
        boundingclientrect = require('uni/utilities.element.getboundingclientrect');

    return function(element) {
        var display = css.get(element, 'display'),
            borderTop = parseInt(css.get(element, 'border-top-width')) || 0,
            borderLeft = parseInt(css.get(element, 'border-left-width')) || 0,
            borderRight = parseInt(css.get(element, 'border-right-width')) || 0,
            borderBottom = parseInt(css.get(element, 'border-bottom-width')) || 0,
            paddingTop = parseInt(css.get(element, 'padding-top')) || 0,
            paddingLeft = parseInt(css.get(element, 'padding-left')) || 0,
            paddingRight = parseInt(css.get(element, 'padding-right')) || 0,
            paddingBottom = parseInt(css.get(element, 'padding-bottom')) || 0,
            isBorderbox = css.get(element, 'box-sizing') == 'border-box';


        // if the element is not hidden, just return its dimensions.
        if (display && display !== 'none') {
            var rect = boundingclientrect(element),
                dimensions = {
                    height: rect.height,
                    width: rect.width,
                    innerHeight: isBorderbox ? rect.height :
                        rect.height - borderTop - borderBottom - paddingTop - paddingBottom,
                    innerWidth: isBorderbox ? rect.width :
                        rect.width - borderLeft - borderRight - paddingLeft - paddingRight
                };

        } else {
            // cache any inline styles so they can be restored later.
            var originalStyles = {
                    visibility: element.style.visibility,
                    position: element.style.position,
                    display: element.style.display
                },
                // temp styles for displaying the element.
                tmpStyles = {
                    visibility: 'hidden',
                    display: 'block'
                };

            // set absolute so nothing jumps when displaying the element.
            if (originalStyles.position !== 'fixed') {
                tmpStyles.position = 'absolute';
            }

            // display the element so we can get its dimensions.
            css.set(element, tmpStyles);

            rect = boundingclientrect(element);
            dimensions = {
                height: rect.height,
                width: rect.width,
                innerHeight: isBorderbox ? rect.height :
                    rect.height - borderTop - borderBottom - paddingTop - paddingBottom,
                innerWidth: isBorderbox ? rect.width :
                    rect.width - borderLeft - borderRight - paddingLeft - paddingRight
            };

            // restore its original styles.
            css.set(element, originalStyles);
        }

        return dimensions;
    }
});
