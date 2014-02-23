
define(['uni/utilities.element.getdimensions'], function(gd, dom) {

    describe('getDimensions', function() {



        /* test for capitalize */
        it('get dimensions visible element, no padding', function() {

            var el = document.createElement('div');
            el.style.width = '200px';
            el.style.height = '100px';
            document.body.appendChild(el);

            var dim = gd(el)
            expect(dim.height).toBe(100);
            expect(dim.width).toBe(200);
            expect(dim.innerHeight).toBe(100);
            expect(dim.innerWidth).toBe(200);
        });

        it('get dimensions visible element, with padding', function() {
            var el = document.createElement('div');
            el.style.width = '200px';
            el.style.height = '100px';
            el.style.paddingLeft = '10px';
            el.style.paddingRight = '5px';
            el.style.paddingTop = '2px';
            el.style.paddingBottom = '3px';
            document.body.appendChild(el);

            var dim = gd(el)
            expect(dim.height).toBe(105);
            expect(dim.width).toBe(215);
            expect(dim.innerHeight).toBe(100);
            expect(dim.innerWidth).toBe(200);
        });

        it('get dimensions visible element, with padding and borders', function() {
            var el = document.createElement('div');
            el.style.width = '200px';
            el.style.height = '100px';
            el.style.paddingLeft = '10px';
            el.style.paddingRight = '5px';
            el.style.paddingTop = '2px';
            el.style.paddingBottom = '3px';
            el.style.borderStyle = 'solid';
            el.style.borderLeftWidth = '2px';
            el.style.borderRightWidth = '3px';
            el.style.borderTopWidth = '4px';
            el.style.borderBottomWidth = '3px';
            document.body.appendChild(el);

            var dim = gd(el)
            expect(dim.height).toBe(112);
            expect(dim.width).toBe(220);
            expect(dim.innerHeight).toBe(100);
            expect(dim.innerWidth).toBe(200);
        });

        it('get dimensions visible element, border-box, with padding and borders', function() {
            var el = document.createElement('div');
            el.style.boxSizing = 'border-box';
            el.style.width = '200px';
            el.style.height = '100px';
            el.style.paddingLeft = '10px';
            el.style.paddingRight = '5px';
            el.style.paddingTop = '2px';
            el.style.paddingBottom = '3px';
            el.style.borderStyle = 'solid';
            el.style.borderLeftWidth = '2px';
            el.style.borderRightWidth = '3px';
            el.style.borderTopWidth = '4px';
            el.style.borderBottomWidth = '3px';
            document.body.appendChild(el);

            var dim = gd(el)
            expect(dim.height).toBe(100);
            expect(dim.width).toBe(200);
            expect(dim.innerHeight).toBe(100);
            expect(dim.innerWidth).toBe(200);
        });

        it('get dimensions hidden element, with padding and borders', function() {
            var el = document.createElement('div');
            el.style.display = 'none';
            el.style.width = '200px';
            el.style.height = '100px';
            el.style.paddingLeft = '10px';
            el.style.paddingRight = '5px';
            el.style.paddingTop = '2px';
            el.style.paddingBottom = '3px';
            el.style.borderStyle = 'solid';
            el.style.borderLeftWidth = '2px';
            el.style.borderRightWidth = '3px';
            el.style.borderTopWidth = '4px';
            el.style.borderBottomWidth = '3px';
            document.body.appendChild(el);

            var dim = gd(el)
            expect(dim.height).toBe(112);
            expect(dim.width).toBe(220);
            expect(dim.innerHeight).toBe(100);
            expect(dim.innerWidth).toBe(200);
        });

    });
});
