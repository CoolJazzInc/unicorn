
/**
 * Provides classList functionality for browsers that don't support it.
 * Check for specs: https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
 */

define(function() {

    'use strict';

    return {
        /**
         * Add a css class.
         * @this Unicorn.classList
         * @param {Element} element The element to add the classname to.
         * @param {String} classname The classname to add.
         */
        addClass: function(element, classname) {
            if (element.classList) {
                element.classList.add(classname);
            } else if (!this.hasClass(element, classname)) {
                element.className += ((element.className ? ' ' : '') + classname);
            }
        },
        /**
         * Remove a css class.
         * @this Unicorn.classList
         * @param {Element} element The element to remove the classname from.
         * @param {String} classname The classname to remove.
         */
        removeClass: function(element, classname) {
            if (element.classList) {
                element.classList.remove(classname);
            } else if (this.hasClass(element, classname)) {
                var classlist = element.className.split(/\s/),
                    i = classlist.indexOf(classname);
                classlist.splice(i, 1);
                element.className = classlist.join(' ');
            }
        },
        /**
         * Toggle a css class.
         * @this Unicorn.classList
         * @param {Element} element The element to toggle the classname on.
         * @param {String} classname The classname to toggle.
         * @param {Boolean} force Force only add or remove.
         * @return {Boolean} the classname was added (true) or removed (false).
         */
        toggleClass: function(element, classname, force) {
            if (element.classList) {
                if (typeof force == 'undefined') {
                    // sending along an undefined variable is like sending along 'false'.
                    return element.classList.toggle(classname);
                } else {
                    return element.classList.toggle(classname, force);
                }
            } else {
                var hasClass = this.hasClass(element, classname),
                    added = false;
                if (hasClass && force !== true) {
                    this.removeClass(element, classname);
                } else if (!hasClass && force !== false) {
                    this.addClass(element, classname);
                    added = true;
                }
                return added;
            }
        },
        /**
         * Check if the element has a css class.
         * @this Unicorn.classList
         * @param {Element} element The element to check.
         * @param {String} classname The class to check for.
         * @return {Boolean} the element has the classname.
         */
        hasClass: function(element, classname) {
            if (element.classList) {
                return element.classList.contains(classname);
            } else {
                return element.className.split(' ').indexOf(classname) !== -1;
            }
        }
    };
});
