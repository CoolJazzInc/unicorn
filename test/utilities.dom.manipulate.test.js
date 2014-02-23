
define(['uni/utilities.dom'], function(dom) {

    describe('DOM - Manipulation', function() {

        var div;
        // do this in an it function so jasmin runs it in the correct order.
        it('preparation for tests', function() {
            // insert some nodes to test on.
            var html = '<div id="manipulate" style="display:none">' +
                '<p id="insertbeforeme"></p>' +
                '<p id="insertafterme"></p>' +
                '<p id="prependinme"></p>' +
                '<p id="appendinme"></p>' +
                '<p id="removeme"></p>' +
                '<p id="getnext"></p>lorem ipsum' +
                '<p id="iamnext"></p>' +
                '<p id="iamprev"></p>lorem ipsum' +
                '<p id="getprev"></p>' +
                '<p id="moveme">Lorem ipsum</p>' +
                '<p id="wrapme"></p>' +
                '</div>';

            div = document.createElement('div');
            div.innerHTML = html;
            document.body.appendChild(div);
        });

        it('append should insert a new element as the last child', function() {
            var el = document.createElement('em'),
                container = dom.getId('appendinme');

            dom.append(container, el);
            var lastChild = container.lastChild;
            expect(el).toBe(lastChild);
        });

        it('append should insert an existing element as the last child', function() {
            var el = dom.getId('moveme'),
                container = dom.getId('appendinme');
            dom.append(container, el);

            var lastChild = container.lastChild;
            expect(el).toBe(lastChild);
        });

        it('prepend should insert a new element as the first child', function() {
            var el = document.createElement('em'),
                container = dom.getId('prependinme');
            dom.prepend(container, el);

            var firstChild = container.firstChild;
            expect(el).toBe(firstChild);
        });

        it('prepend should insert an existing element as the first child', function() {
            var el = dom.getId('moveme'),
                container = dom.getId('prependinme');
            dom.prepend(container, el);
            var firstChild = container.firstChild;
            expect(el).toBe(firstChild);
        });

        it('insertBefore should insert a new element as the previous sibling', function() {
            var el = document.createElement('em'),
                node = dom.getId('insertbeforeme');
            dom.insertBefore(node, el);
            var prev = node.previousSibling;
            expect(el).toBe(prev);
        });

        it('insertBefore should insert an existing element as the previous sibling', function() {
            var el = dom.getId('moveme'),
                node = dom.getId('insertbeforeme');
            dom.insertBefore(node, el);
            var prev = node.previousSibling;
            expect(el).toBe(prev);
        });

        it('insertAfter should insert a new element as the next sibling', function() {
            var el = document.createElement('em'),
                node = dom.getId('insertafterme');
            dom.insertAfter(node, el);
            var next = node.nextSibling;
            expect(el).toBe(next);
        });

        it('insertAfter should insert an existing element as the next sibling', function() {
            var el = dom.getId('moveme'),
                node = dom.getId('insertafterme');
            dom.insertAfter(node, el);
            var next = node.nextSibling;
            expect(el).toBe(next);
        });

        it('next should return the first HTMLElement after an element', function() {
            var el = dom.getId('getnext'),
                next = dom.next(el);
            expect(next).toBe(dom.getId('iamnext'));
        });

        it('prev should return first HTMLElement before an element', function() {
            var el = dom.getId('getprev'),
                prev = dom.prev(el);
            expect(prev).toBe(dom.getId('iamprev'));
        });

        it('wrap should wrap an element in another element', function() {
            var el = dom.getId('wrapme'),
                wrapper = document.createElement('div');
            dom.wrap(el, wrapper);
            expect(el.parentNode).toBe(wrapper);
            expect(wrapper.parentNode).toBe(dom.getId('manipulate'));
        });

        it('create an element', function() {
            var el = dom.create('div');
            expect(el.tagName.toLowerCase()).toBe('div');
            expect(el.nodeType).toBe(1);
        });

        it('create an element with some attributes', function() {
            var el = dom.create('div', {
                'class': 'scoobie',
                'data-scoobie': 'doo'
            });
            expect(el.tagName.toLowerCase()).toBe('div');
            expect(el.nodeType).toBe(1);
            expect(el.className).toBe('scoobie');
            expect(el.getAttribute('data-scoobie')).toBe('doo');
        });


        it('cleanup after tests', function() {
            //remove the test html.
            document.body.removeChild(div);
        });

    });
});
