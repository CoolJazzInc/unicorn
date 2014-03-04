
/**
 * Execute a callback when an image is loaded.
 * Fixes issue with browsers not fireing the load event when the image is loaded from cache.
 */

define(function(require) {

    'use strict';

    var date = require('uni/utilities.date.now'),
        dom = require('uni/utilities.dom'),
        css = require('uni/utilities.css'),
        event = require('uni/utilities.event');

    /**
     *
     */
    var Graph = function() {
        this.init.apply(this, arguments);
    }

    /**
     * Check if the image is loaded, if not, attach a load listener.
     * @param {Element} image The image to check.
     * @param {Function} callback The function to execute when the image is loaded.
     */
    Graph.prototype.init = function(element, repeat, functions) {
        this.element = element;
        this.current = 0;
        this.totalU = this.totalJ = 0;
        this.tests = Object.keys(functions);
        var total = this.tests.length;

        event.on(this.element, 'testready', function(event) {
            this.current++;

            this.totalU += (event.detail.timeU || 0);
            this.totalJ += (event.detail.timeJ || 0);

            var label = this.tests[this.current];
            if (label) {
                setTimeout(function() {
                    this.runPart(label, functions[label], repeat);
                }.bind(this), 20);

            }

            if (this.current == total) {
                this.buildTotal(this.totalU, this.totalJ);
            }
        }.bind(this));

        var label = this.tests[this.current];
        this.runPart(label, functions[label], repeat);
    }

    Graph.prototype.buildTotal = function(u, j) {

        var l = document.createElement('div');
        l.className = 'label';
        l.innerHTML = 'Total';

        var times = [],
            bars = [];

        var te = document.createElement('div');
        te.className = 'test total';
        dom.append(te, l);

        for (var ar in arguments) {
            var b = document.createElement('div');
            b.className = 'bar';
            var bl = document.createElement('div');
            bl.className = 'bar-label';
            bl.innerHTML = ar == 0 ? 'unicorn' : 'jQuery';

            var bt = document.createElement('div');
            bt.className = 'bar-time';

            dom.append(b, bl);
            dom.append(b, bt);
            dom.append(te, b);
            bars.push(b);

            bt.innerHTML = arguments[ar];
        }

        var perc = this.calcBar([u, j]);

        for (var bar in bars) {
            css.set(bars[bar], 'width', perc[bar] + '%');
        }


        dom.append(this.element, te);

    }

    Graph.prototype.runPart = function(label, funcs, repeat) {
        var l = document.createElement('div');
        l.className = 'label';
        l.innerHTML = funcs.label;

        var times = [],
            bars = [];

        var te = document.createElement('div');
        te.className = 'test';
        dom.append(te, l);


        for (var f in funcs) {
            if (f != 'args' && f != 'label') {

                var b = document.createElement('div');
                b.className = 'bar';
                var bl = document.createElement('div');
                bl.className = 'bar-label';
                bl.innerHTML = f;

                var bt = document.createElement('div');
                bt.className = 'bar-time';

                dom.append(b, bl);
                dom.append(b, bt);
                dom.append(te, b);
                bars.push(b);

                var args = funcs.args && funcs.args.constructor == Array ? funcs.args : [funcs.args];
                if (f == 'jQuery' && args[0]) args[0] = $(args[0]);
                var time = this.runFunc(funcs[f], args, repeat);
                if (f == 'jQuery') var timeJ = time;
                else if (f == 'unicorn') var timeU = time;
                bt.innerHTML = time;
                times.push(time);
            }
        }

        var perc = this.calcBar(times);

        for (var bar in bars) {
            css.set(bars[bar], 'width', perc[bar] + '%');
        }


        dom.append(this.element, te);

        event.fire(this.element, 'testready', {
            timeJ: timeJ,
            timeU: timeU
        });

    }

    Graph.prototype.calcBar = function(times) {
        // get max
        var max = 0;
        for (var i in times) {
            if (times[i] > max) max = times[i];
        }

        for (var t in times) {
            if (times[t] == max) times[t] = 100;
            else times[t] = times[t] * (100 / max);
        }

        return times;
    }

    Graph.prototype.runFunc = function(func, args, repeat) {
        var start = Date.now(),
            i = 0;

        while (i < repeat) {
            func.apply(this, args);
            i++;
        }

        var d = Date.now() - start;

        return d;

    }


    return Graph;
});
