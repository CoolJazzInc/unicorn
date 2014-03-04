
/**
 * Dispatch events after a swipe gesture on touch devices.
 * Event notifies about general direction, angle, distance and speed.
 */

define(function(require) {

    'use strict';

    var event = require('uni/utilities.event');

    /**
     * Fire an event with details of what happened between touchstart and touchend.
     *
     * event.on('swipe', dosomethin)
     * event.details = {
     *      direction: 'left | right | up | down',
     *      angle: 20 (degrees), left-right = 0, up-down = 90, right-left = 180, down-up = 270
     *      distance: 120 (pixels)
     *      speed: 348 (pixels per second)
     *      duration: 236 (milliseconds)
     *      start: {x: 0, y: 0}, the coordinates of the touchstart event.
     *      end: {x: 0, y: 0}, the coordinates of the touchend event.
     *      touchstart: Touch, the touchstart event.
     *      touchend: Touch, the touchend event.
     * }
     */

    function SwipeListener(element) {
        this.init.apply(this, arguments);
    }

    /**
     * Initialize the listener.
     * @param {Element} element The element on which to listen to swipes.
     */
    SwipeListener.prototype.init = function(element) {
        this.element = element;
        // set listeners for touch start and end.
        event.on(element, 'touchstart', this.ontouchstart.bind(this));
        event.on(element, 'touchend', this.ontouchend.bind(this));

        // create the storage for ongoing touches.
        this.ongoingTouches = [];
    }

    /**
     * Register the touchstart event and store it.
     * @param {Event} event The touchstart event.
     */
    SwipeListener.prototype.ontouchstart = function(event) {
        // store all ongoing touches.
        for (var i = 0; i < event.changedTouches.length; i++) {
            this.ongoingTouches.push({
                identifier: event.changedTouches[i].identifier,
                timeStart: new Date().getTime(),
                pageX: event.changedTouches[i].pageX,
                pageY: event.changedTouches[i].pageY,
                eventstart: event.changedTouches[i]
            });
        }
    }

    /**
     * Register the touchend event, get the corresponding touchstart event
     * and construct the swipe from the two.
     * @param {Event} event The touchend event.
     */
    SwipeListener.prototype.ontouchend = function(event) {
        var timeEnd = new Date().getTime();

        // loop through all the changed touches.
        // Find one(s) that started on the element and contruct a swipe from it.
        for (var i = 0; i < event.changedTouches.length; i++) {
            // look for the touch in ongoingtouches.
            var index = -1,
                touchstart = null,
                touchend = event.changedTouches[i];

            for (var t = 0; t < this.ongoingTouches.length; t++) {
                if (this.ongoingTouches[t].identifier == touchend.identifier) {
                    // we stored this event on touchstart, it has now ended -> contruct a swipe.
                    touchstart = this.ongoingTouches[t];
                    index = t;
                }
            }
            // If a matching startevent is found to go with the end event, construct the swipe event.
            if (touchstart) {
                // pass along the time the touch ended.
                touchstart.timeEnd = timeEnd;

                // construct the swipe.
                var swipedetails = this.contructSwipeDetails(touchstart, event.changedTouches[i]);

                // remove the touchstart event from ongoingtouches.
                this.ongoingTouches.splice(index, 1);

                // dispatch the event.
                this.dispatchEvent(swipedetails);
            }
        }
    }

    /**
     * Get all the properties of the swipe.
     * @param {Object} touchStart The touchstart object.
     * @param {Touch} touchEnd The touch that ended.
     * @return {Object} the swipeproperties {
     *  duration: Number,
     *  distance: {x: Number, y: Number},
     *  speed: {x: Number, y: Number},
     *  angle: Number,
     *  direction: Number,
     *  start: {x: Number, y: Number},
     *  end: {x: Number, y: Number},
     *  touchstart: Touch,
     *  touchend: Touch
     * }.
     */
    SwipeListener.prototype.contructSwipeDetails = function(touchStart, touchEnd) {
        var duration = touchStart.timeEnd - touchStart.timeStart,
            start = {
                x: touchStart.pageX,
                y: touchStart.pageY
            },
            end = {
                x: touchEnd.pageX,
                y: touchEnd.pageY
            },
            distance = {
                x: Math.abs(start.x - end.x),
                y: Math.abs(start.y - end.y)
            },
            speed = {
                x: (distance.x / duration) * 1000,
                y: (distance.y / duration) * 1000
            },
            angle = this.getAngle(start.x, end.x, start.y, end.y),
            direction = this.getDirection(angle);

        // create the swipe properties to send with the swipe event.
        return {
            duration: duration,
            distance: distance,
            speed: speed,
            angle: angle,
            direction: direction,
            start: start,
            end: end,
            touchstart: touchStart.eventstart,
            touchend: touchEnd
        };
    }

    /**
     * Get the angle of the swipe.
     * @param {Number} x1 The start.x coordinate.
     * @param {Number} x2 The end.x coordinate.
     * @param {Number} y1 The start.y coordinate.
     * @param {Number} y2 The end.y coordinate.
     * @return {Number} The angle of the swipe. left-right = 0, up-down = 90, right-left = 180, down-up = 270.
     */
    SwipeListener.prototype.getAngle = function(x1, x2, y1, y2) {
        var deltaX = x1 - x2,
            deltaY = y1 - y2,
            angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        return angle + 180;
    }

    /**
     * Get the general direction of the swipe.
     * @param {Number} angle The angle of the swipe.
     * @return {String} The direction: left | right | up | down.
     */
    SwipeListener.prototype.getDirection = function(angle) {
        var direction = 'right';
        switch (angle) {
            case angle > 45 && angle <= 135:
                direction = 'down';
                break;
            case angle > 135 && angle <= 225:
                direction = 'left';
                break;
            case angle > 225 && angle <= 315:
                direction = 'up';
        }

        return direction;
    }

    /**
     * Dispatch the swipe event.
     * Dispatches two events: 'swipe' and 'swipe.[direction]' ie. 'swipe.left'
     * @param {Object} details The properties of the swipe.
     */
    SwipeListener.prototype.dispatchEvent = function(details) {
        // dispatch general swipe event.
        event.fire(this.element, 'swipe', details);
        // dispatch swipe[direction] event.
        event.fire(this.element, 'swipe.' + details.direction, details);
    }

    // return the module's function.
    return function(element) {
        return new SwipeListener(element);
    };

});
