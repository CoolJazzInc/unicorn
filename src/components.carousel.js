
/**
 * Carousel
 *
 * Converts a list of items into a carousel structure and
 * provides controls for the carousel.
 */

define(function(require) {

    var events = require('uni/utilities.event'),
        dom = require('uni/utilities.dom'),
        object = require('uni/utilities.object'),
        css = require('uni/utilities.css'),
        classList = require('uni/utilities.element.classList'),
        supports = require('uni/utilities.css.support'),
        registerswipes = require('uni/utilities.touch.swipe'),
        istouch = require('uni/utilities.touch.istouch'),
        animator = require('uni/utilities.animate');

    function Carousel() {
        this.init.apply(this, arguments);
        return this;
    }

    /**
     * The default settings.
     */
    var DEFAULTS = {
        axis: 'x',
        eventsNext: ['carousel.next'],
        eventsPrev: ['carousel.prev'],
        wrapperClass: 'carousel-container',
        autoScroll: false,
        scrollBy: 1,
        runThroughFactor: 10,
        itemSelector: null,
        animationTime: 1000,
        easing: null,
        afterSwipe: null,
        addControls: null
    };

    /**
     * Initialize the component and set it options.
     * @param {Object} options The custom settings.
     * @param {Object} element The rootelement of the carousel.
     */
    Carousel.prototype.init = function(element, options) {
        this.settings = object.extend({}, DEFAULTS, options || {});

        // allow easy overwrites of methods.
        for (var key in this.__proto__) {
            if (this.__proto__.hasOwnProperty(key) && typeof this.settings[key] !== 'undefined') {
                this[key] = this.settings[key];
            }
        }

        this.element = element;
        this.items = this.getItems(this.settings.itemSelector);
        this.currentIndex = 0;
        this.offset = 0;
        this.cssProperty = this.settings.axis == 'x' ? 'left' : 'top';

        // setup the carousel.
        this.setup.call(this);

        // execute any custom control-builder function.
        if (typeof this.settings.addControls == 'function') this.settings.addControls.call(this);
    }

    /**
     * Setup the structure for a classic type carousel.
     */
    Carousel.prototype.setup = function() {

        // touch support.
        if (istouch()) {
            // enable swiping through the carousel.
            registerswipes(this.element);
            events.on(this.element, 'swipe', this.onSwipe.bind(this));

            // enable moving the carousel by dragging across it.
            events.on(this.element, 'touchstart', this.onTouchstart.bind(this));
            this.touchmovehandler = this.onTouchmove.bind(this);
            events.on(this.element, 'touchmove', this.touchmovehandler);
            events.on(this.element, 'touchend', this.onTouchend.bind(this));
        }

        // wrap the element in a clipping container.
        this.container = document.createElement('div');
        classList.addClass(this.container, this.settings.wrapperClass);
        dom.wrap(this.element, this.container);

        // set the width or height of the element to the collective width/height of it's children.
        var property = this.settings.axis == 'x' ? 'width' : 'height';
        this.listWidth = 0;
        this.toAnimate = this.settings.axis == 'x' ? 'left' : 'top';

        // if translate3d is supported, use that.
        var supported = supports([
            '-webkit-transform',
            '-moz-transform',
            '-ms-transform',
            'transform'], 'translate3d(0,0,0)');
        if (supported) {
            this.toAnimate = supported;
        }

        // get the collective width/height of the items.
        for (var i = 0; i < this.items.length; i++) {
            var dimension = this.items[i].getBoundingClientRect()[property];
            dimension += parseInt(css.get(this.items[i], 'margin-' + (property == 'width' ? 'left' : 'top'))) || 0;
            dimension += parseInt(css.get(this.items[i], 'margin-' + (property == 'width' ? 'right' : 'bottom'))) || 0;

            this.listWidth += dimension;
        }
        // apply the full size to the element.
        css.set(this.element, property, this.listWidth + 'px');
    }

    /**
     * get all the items in the carousel.
     * @return {NodeList} the items.
     */
    Carousel.prototype.getItems = function(selector) {
        if (selector) {
            // the the items in the root that match the selector.
            var items = dom.get(this.element, selector);
        } else {
            // get the root element's childnodes.
            items = dom.getChildren(this.element);
        }

        return items;
    }

    /**
     * Handle a swipe event.
     * @param {Event} event The swipe event.
     */
    Carousel.prototype.onSwipe = function(event) {
        this.lastSwipe = event.detail;
    }

    /**
     * Handle a touchstart event.
     * @param {Event} event The touchstart event.
     */
    Carousel.prototype.onTouchstart = function(event) {
        // do something, only when there's one touchpoint on the screen.
        if (!event.touches || event.touches.length > 1) return;

        // cancel any running animations.
        if (this.animator) this.animator.stop();

        this.dragstart = this.lasttouch = this.dragstart || {
            x: event.touches[0].pageX,
            y: event.touches[0].pageY
        };
    }

    /**
     * Handle a touchmove event.
     * Move the carousel when the user drags across it.
     * @param {Event} event The touchmove event.
     */
    Carousel.prototype.onTouchmove = function(event) {

        // do something, only when there's one touchpoint on the screen. //TODO handle this.
        if (!event.touches || event.touches.length > 1) {
            return;
        }

        // get the direction of the movement. if it's on the same axis as the carousel, move the carousel.
        // if it's on the other axis, do nothing.
        if (!this.activeAxis && !this.ismoving) {
            this.activeAxis = Math.abs(event.changedTouches[0].pageX - this.dragstart.x) <
                Math.abs(event.changedTouches[0].pageY - this.dragstart.y) ? 'y' : 'x';
        }

        // calculate how much the touch has moved.
        var moved = this.lasttouch[this.activeAxis] -
            event.changedTouches[0][this.activeAxis == 'x' ? 'pageX' : 'pageY'];

        this.lasttouch = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        };

        // when just started moving.
        if (moved == 0 && !this.ismoving) {
            this.activeAxis = null;
            return;
        }

        // if it's on the other axis, stop listening and do nothing.
        if (this.activeAxis !== this.settings.axis) {
            events.off(this.element, 'touchmove', this.touchmovehandler);
            this.touchmovehandler = null;

            return;
        }

        // there's movement on the correct axis.
        this.ismoving = true;

        // if it's on the same axis, prevent scrolling the page.
        event.preventDefault();

        // move the carousel.
        this.setPosition(this.offset - moved);
    }

    /**
     * Handle a touchend event.
     * @param {Event} event The touchend event.
     */
    Carousel.prototype.onTouchend = function(event) {
        // reset all the movement properties.
        this.dragstart = this.lasttouch = this.activeAxis = this.ismoving = null;

        // re-attach the touchmove handler if it has been removed.
        if (!this.touchmovehandler) {
            this.touchmovehandler = this.onTouchmove.bind(this);
            events.on(this.element, 'touchmove', this.touchmovehandler);
        }

        if (this.lastSwipe) {
            // execute the custom callback.
            if (typeof this.settings.afterSwipe == 'function') {
                this.settings.afterSwipe.call(this, this.lastSwipe);
            }

            // Keep scrolling for some distance, depending on the speed of the swipe.
            else {
                if (this.lastSwipe.direction == 'left' || this.lastSwipe.direction == 'up') {
                    var offset = this.offset -
                        (this.lastSwipe.speed[this.settings.axis] / this.settings.runThroughFactor);
                }
                if (this.lastSwipe.direction == 'right' || this.lastSwipe.direction == 'down') {
                    offset = this.offset +
                        (this.lastSwipe.speed[this.settings.axis] / this.settings.runThroughFactor);
                }

                if (offset) {
                    // reposition the carousel if it has been pulled beyond the start or end slide.
                    if (offset > 0) offset = 0;
                    else {
                        var min = this.getMinOffset();
                        if (offset < min) offset = min;
                    }
                    this.animate(offset, this.settings.animationTime, 'easeOutQuint');
                }
            }
        }
    }

    /**
     * Go to an item.
     * @param {Number} index The index of the item.
     */
    Carousel.prototype.goto = function(index) {
        if (this.items[index]) {
            var itemOffset = this.items[index].getBoundingClientRect()[this.cssProperty],
                listOffset = this.element.getBoundingClientRect()[this.cssProperty],
                offset = listOffset - itemOffset;

            this.animate(offset, this.settings.animationTime);
            this.currentIndex = index;
        }
    }

    /**
     * Got to the next item.
     */
    Carousel.prototype.next = function() {
        this.goto(this.currentIndex + 1);
    }

    /**
     * Got to the previous item.
     */
    Carousel.prototype.prev = function() {
        this.goto(this.currentIndex - 1);
    }

    /**
     * Scroll the next item into view.
     */
    Carousel.prototype.scrollNext = function() {
        var item = this.getFirstItem(),
            next = item !== 'undefined' ? item + this.settings.scrollBy : null;
        if (next >= this.items.length) next = this.items.length - 1;

        this.goto(next);
    }

    /**
     * Scroll the previous item into view.
     */
    Carousel.prototype.scrollPrev = function() {
        var item = this.getFirstItem(),
            prev = item !== 'undefined' ? item - this.settings.scrollBy : null;
        if (prev < 0) prev = 0;

        this.goto(prev);
    }

    /**
     * Get the first item inside the view.
     * @return {Number|undefined} the index of the item.
     */
    Carousel.prototype.getFirstItem = function() {
        // get the first item that is inside the view.
        var viewRect = this.container.getBoundingClientRect(),
            prop = this.settings.axis == 'y' ? 'top' : 'left';
        for (var i = 0; i < this.items.length; i++) {
            var itemRect = this.items[i].getBoundingClientRect();
            if (itemRect[prop] > viewRect[prop]) {
                var item = i;
                break;
            }
        }

        return i;
    }

    /**
     * Scroll the carousel to it's new position.
     * @param {Number} targetvalue The new position for the carousel.
     * @param {Number} duration The diration of the animation in ms.
     * @param {String} easingFunc The easing function to use for the animation.
     */
    Carousel.prototype.animate = function(targetvalue, duration, easingFunc) {
        if (targetvalue > 0) targetvalue = 0;
        else {
            var min = this.getMinOffset();
            if (targetvalue < min) targetvalue = min;
        }

        this.animator = this.animator || new animator({
            onTick: function(value) {
                this.offset = value;
                this.setPosition(value);
            }.bind(this),
            complete: this.onAnimationEnd.bind(this)
        });

        if (targetvalue !== this.offset) {
            this.animator.animate(this.offset, targetvalue, duration, easingFunc || this.settings.easing);
        }
    }

    /**
     * Set the position of the carousel.
     * @param {Number} position The new position.
     */
    Carousel.prototype.setPosition = function(position) {
        if (this.toAnimate.match(/transform/)) {
            // construct transform property and value.
            var value = 'translate3d(' + (this.settings.axis == 'x' ? position + 'px,' : '0,') +
                (this.settings.axis == 'y' ? position + 'px,' : '0,') + '0)';
        } else {
            value = position + 'px';
        }

        this.offset = position;
        css.set(this.element, this.toAnimate, value);
    }

    /**
     * Do this when the animation on the carousel has ended.
     */
    Carousel.prototype.onAnimationEnd = function() {

    }

    /**
     * Get the minimal offset of the carousel.
     * @return {Number} The minimal offset in pixels.
     */
    Carousel.prototype.getMinOffset = function() {
        return this.container.getBoundingClientRect()[this.settings.axis == 'x' ? 'width' : 'height'] -
            this.listWidth;
    }

    return Carousel;
});
