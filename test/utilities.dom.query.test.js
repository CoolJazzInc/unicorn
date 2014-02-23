
define(['uni/utilities.dom'], function(dom) {

    describe('DOM - Querying', function() {

        var div;
        // do this in an it function so jasmin runs it in the correct order.
        it('preparation for tests', function() {
            // insert some nodes to test on.
            var html = '<div id="main" style="display:none">' +
                '<p class="text">Lorem ipsum</p>' +
                '<p class="text">Dolor <em id="em">samet</em></p>' +
                '<p class="empty"></p>' +
                '<img class="selfclosing"/>' +
                'Free text.' +
                '<span class="span" data-scoobie="doo"></span>' +
                '<span class="span" scoobie="doo"></span>' +
                '<div id="container">' +
                '<span class="span" scoobie="doo"></span>' +
                '</div>' +
                '<form>' +
                '<input type="checkbox" value="scrappy" class="checktest"/>' +
                '<input type="checkbox" value="daphne" class="checktest" checked/>' +
                '</form>'
            '</div>';

            div = document.createElement('div');
            div.innerHTML = html;
            document.body.appendChild(div);
        });

        it('getId should get an element by id', function() {
            var el = dom.getId('main');
            expect(el).toBe(document.getElementById('main'));
        });

        it('getId return undefined when the id is not found', function() {
            var el = dom.getId('xx');
            expect(el).toBeNull();
        });

        it('getClass should get elements by classname', function() {
           var elms = dom.getClass('text'),
               native = document.getElementsByClassName('text');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(2);
            expect(elms[0]).toBe(native[0]);
            expect(elms[1]).toBe(native[1]);
        });

        it('getClass should return an empty nodeList when no matches are found', function() {
            var elms = dom.getClass('xx'),
                native = document.getElementsByClassName('xx');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(0);
        });

        it('getClass should return only return matches inside a parent if provided', function() {
            var elms = dom.getClass('span', dom.getId('container')),
                native = document.getElementById('container').getElementsByClassName('span');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(1);
            expect(elms[0]).toBe(native[0]);
        });

        it('getTag should get elements by tagname', function() {
            var elms = dom.getTag('p'),
                native = document.getElementsByTagName('p');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(3);
            expect(elms[0]).toBe(native[0]);
            expect(elms[1]).toBe(native[1]);
            expect(elms[2]).toBe(native[2]);
        });

        it('getTag should return an empty nodeList when no matches are found', function() {
            var elms = dom.getTag('xx'),
                native = document.getElementsByTagName('xx');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(0);
        });

        it('getTag should return only return matches inside a parent if provided', function() {
            var elms = dom.getTag('span', dom.getId('container')),
                native = document.getElementById('container').getElementsByTagName('span');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(1);
            expect(elms[0]).toBe(native[0]);
        });

        it('get should get elements by id selector', function() {
            var elms = dom.get('#main'),
                native = document.querySelectorAll('#main');

            expect(elms).toBeDefined();
            expect(elms.length).toBe(1);
            expect(elms[0]).toBe(native[0]);
        });

        it('get should get elements by tag selector', function() {
            var elms = dom.get('p'),
                native = document.querySelectorAll('p');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(3);
            expect(elms[0]).toBe(native[0]);
            expect(elms[1]).toBe(native[1]);
            expect(elms[2]).toBe(native[2]);
        });

        it('get should get elements by classname', function() {
            var elms = dom.get('.text'),
                native = document.querySelectorAll('.text');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(2);
            expect(elms[0]).toBe(native[0]);
            expect(elms[1]).toBe(native[1]);
        });

        it('get should get elements by atribute', function() {
            var elms = dom.get('[scoobie]'),
                native = document.querySelectorAll('[scoobie]');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(2);
            expect(elms[0]).toBe(native[0]);
            expect(elms[1]).toBe(native[1]);
        });

        it('get should get elements by atribute value', function() {
            var elms = dom.get('[data-scoobie="doo"]'),
                native = document.querySelectorAll('[data-scoobie="doo"]');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(1);
            expect(elms[0]).toBe(native[0]);
        });

        it('get should get elements by pseudo-selector', function() {
            var elms = dom.get('input.checktest:checked'),
                native = document.querySelectorAll('input.checktest:checked');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(1);
            expect(elms[0]).toBe(native[0]);
        });

        it('get should return an empty nodeList when no matches are found', function() {
            var elms = dom.get('xx');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(0);
        });

        it('get should return only return matches inside a parent if provided', function() {
            var elms = dom.get('span', dom.getId('container')),
                native = document.getElementById('container').querySelectorAll('span');

            expect(elms).toBeDefined();
            expect(elms.length).toEqual(1);
            expect(elms[0]).toBe(native[0]);
        });

        it('getFirst should get the first matched element', function() {
            var el = dom.getFirst('p'),
                native = document.querySelector('p');

            expect(el).toBe(native);
        });

        it('getFirst should return only return matches inside a parent if provided', function() {
            var el = dom.getFirst('span', dom.getId('container')),
                native = document.getElementById('container').querySelector('span');

            expect(el).toBeDefined();
            expect(el).toBe(native);
        });

        it('cleanup after tests', function() {
            //remove the test html.
            document.body.removeChild(div);
        });

    });
});
