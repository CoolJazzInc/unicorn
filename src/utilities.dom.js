
define(function() {

    /**
     * Utility functions to query and manipulate the DOM.
     * @module dom
     */

    'use strict';

    /** @lends module:dom */
    var _dom = {
        /**
         * proxy for document.getElementById.
         * @param {String} id The id.
         * @return {HTMLElement} the element.
         */
        getId: function(id) {
            return document.getElementById(id);
        },
        /**
         * proxy for getElementsByClassName.
         * @param {String} klass The classname.
         * @param {HTMLElement} parent The node to search in.
         * @return {NodeList} the list of elements.
         */
        getClass: function(klass, parent) {
            if (!parent) parent = document;
            return parent.getElementsByClassName ?
                parent.getElementsByClassName(klass) : this.get('.' + klass, parent);
        },
        /**
         * proxy for getElementsByTagName.
         * @param {String} tag The tagname.
         * @param {HTMLElement} parent The node to search in.
         * @return {NodeList} the list of elements.
         */
        getTag: function(tag, parent) {
            if (!parent) parent = document;
            return parent.getElementsByTagName(tag);
        },
        /**
         * proxy for querySelectorAll.
         * @param {String} selector The selector.
         * @param {HTMLElement} parent The node to search in.
         * @return {NodeList} the list of elements.
         */
        get: function(selector, parent) {
            if (!parent) parent = document;
            return parent.querySelectorAll(selector);
        },
        /**
         * proxy for querySelector.
         * @param {String} selector The selector.
         * @param {HTMLElement} parent The node to search in.
         * @return {(Element|null)} the first matched element.
         */
        getFirst: function(selector, parent) {
            if (!parent) parent = document;
            return parent.querySelector(selector);
        },
        /**
         * Get the child nodes from an element that are HTMLElements.
         * Some older browsers also return comment nodes in the children property.
         * @param {HTMLElement} element The element to ge the children from.
         * @return {Array} The child nodes.
         */
        getChildren: function(element) {
            var children = [], node = element.firstChild;

            for (; node; node = node.nextSibling) {
                if (node.nodeType == 1) {
                    children.push(node);
                }
            }

            return children;
        },

        /**
         * remove a node from the DOM
         * @param {HTMLElement} element The node.
         */
        remove: function(element) {
            if (element.parentNode) element.parentNode.removeChild(element);
        },
        /**
         * add a node to an element, as a last child.
         * @param {HTMLElement} target The node to append the node to.
         * @param {HTMLElement} element The node to add.
         * @return {HTMLElement} the appended node.
         */
        append: function(target, element) {
            target.appendChild(element);
            return element;
        },
        /**
         * add a node to an element, as a first child.
         * @param {HTMLElement} target The node to append the node to.
         * @param {HTMLElement} element The node to add.
         * @return {HTMLElement} the appended node.
         */
        prepend: function(target, element) {
            target.insertBefore(element, target.firstChild);
            return element;
        },
        /**
         * insert a node before an element.
         * @param {HTMLElement} target The node before which to insert the node.
         * @param {HTMLElement} element The node to add.
         * @return {HTMLElement} the appended node.
         */
        insertBefore: function(target, element) {
            target.parentNode.insertBefore(element, target);
            return element;
        },
        /**
         * insert a node after an element.
         * @param {HTMLElement} target The node after which to insert the node.
         * @param {HTMLElement} element The node to add.
         * @return {HTMLElement} the appended node.
         */
        insertAfter: function(target, element) {
            target.parentNode.insertBefore(element, target.nextSibling);
            return element;
        },
        /**
         * Get the next element in the DOM.
         * @param {HTMLElement} element Get the next element from this element.
         * @return {(HTMLElement|null)} the next element.
         */
        next: function(element) {
            var next = element.nextSibling;
            while (next && next.nodeType !== 1) {
                element = next;
                next = element.nextSibling;
            }
            return next.nodeType == 1 ? next : null;
        },
        /**
         * Get the previous element in the DOM.
         * @param {HTMLElement} element Get the previous element from this element.
         * @return {(HTMLElement|null)} the previous element.
         */
        prev: function(element) {
            var prev = element.previousSibling;
            while (prev && prev.nodeType !== 1) {
                element = prev;
                prev = element.previousSibling;
            }
            return prev.nodeType == 1 ? prev : null;
        },
        /**
         * Get an element's parent node or a specific ancestor.
         * @param {HTMLElement} element Get this element's parent.
         * @param {String} selector Get the first ancestor that matches this selector.
         * @return {(HTMLElement|null)} the ancestor element.
         */
        up: function(element, selector) {
            var parent = element.parentNode;
            while (parent && parent.nodeType === 1 && !this.matches(parent, selector)) {
                element = parent;
                parent = element.parentNode;
            }
            return parent.nodeType == 1 ? parent : null;
        },
        /**
         * Check if an element matches an selector.
         * @param {HTMLElement} element The element to match.
         * @param {String} selector The selector to check against.
         * @return {Boolean} the selector matches.
         */
        matches: function(element, selector) {
            /**
             * Check if native matches function is available.
             */
            var pt = Element.prototype,
                method = pt.matches ||
                    pt.webkitMatchesSelector ||
                    pt.mozMatchesSelector ||
                    pt.msMatchesSelector ||
                    pt.oMatchesSelector;

            /**
             * Check if the element matches the selector.
             *
             * @param {HTMLElement} element The element to check.
             * @param {String} selector The selector to check against.
             * @return {Boolean} Teh element matches the selector.
             */
            if (method) {
                return method.call(element, selector);
            } else {
                var doc = document.createDocumentFragment();
                doc.appendChild(element.cloneNode(false));
                return !!doc.querySelectorAll(selector).length;
            }
        },
        /**
         * Wrap an element in another element.
         * @param {HTMLElement} element The element to wrap.
         * @param {HTMLElement} wrapper The wrapper element.
         */
        wrap: function(element, wrapper) {
            if (wrapper && element && wrapper.nodeType == 1 && element.nodeType) {
                this.insertBefore(element, wrapper);
                this.append(wrapper, element);
            }
        },

        /**
         * Create an element with optional attributes.
         * @param {String} tag The tag name.
         * @param {Object} attributes The attributes to set for the element.
         * @return {HTMLElement} the element.
         */
        create: function(tag, attributes) {
            var element = document.createElement(tag);
            if (attributes) {
                for (var attr in attributes) {
                    if (attributes.hasOwnProperty(attr)) {
                        element.setAttribute(attr, attributes[attr]);
                    }
                }
            }
            return element;
        },

        createFromHtml: function(html) {
            var wrappers = {
                    THEAD: ['<table>', '</table>', 1],
                    TFOOT: ['<table>', '</table>', 1],
                    TBODY: ['<table>', '</table>', 1],
                    TR: ['<table><tbody>', '</tbody></table>', 2],
                    TD: ['<table><tbody><tr>', '</tr></tbody></table>', 3],
                    TH: ['<table><tbody><tr>', '</tr></tbody></table>', 3],
                    OPTION: ['<select>', '</select>', 1]
                },
                rootTag = html.match(/<([A-Za-z0-9]+)/),
                element = document.createElement('div'),
                result = null;

            if (rootTag && rootTag[1] && rootTag[1].toUpperCase() in wrappers) {
                var tag = rootTag[1].toUpperCase();
                html = wrappers[tag][0] + html + wrappers[tag][1];

                element.innerHTML = html;
                var wrapped = element.firstChild,
                    i = 0;
                while (i < wrappers[tag][2]) {
                    result = wrapped.firstChild;
                    wrapped = result;
                    i++;
                }
            } else {
                element.innerHTML = html;
                result = element.firstChild;
                element = null;
            }

            return result;
        }
    };

    return _dom;
});
