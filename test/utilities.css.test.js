
define(['uni/utilities.css'], function(css) {

    describe('Css', function() {

        /* tests for css get style */
        it('get style - element not in DOM', function() {
            var element = document.createElement('div');
            element.style.display = 'inline-block';

            expect(css.get(element, 'display')).toBe('inline-block');
        });

        it('get style - element in DOM', function() {
            var element = document.createElement('div');
            document.body.appendChild(element);
            element.style.display = 'inline-block';

            expect(css.get(element, 'display')).toBe('inline-block');
        });

        it('get style - css property not set', function() {
            var element = document.createElement('div');
            document.body.appendChild(element);

            expect(css.get(element, 'display')).toBe('block');
        });

        it('get style - non-existing css property', function() {
            var element = document.createElement('div');
            document.body.appendChild(element);

            expect(css.get(element, 'scooby')).toBe('');
        });

        /* test for css set style */
        it('set one property by key-value - element not in DOM', function() {
            var element = document.createElement('div');
            css.set(element, 'display', 'inline-block');

            expect(css.get(element, 'display')).toBe('inline-block');
        });

        it('set one property by key-value - element in DOM', function() {
            var element = document.createElement('div');
            document.body.appendChild(element);
            css.set(element, 'display', 'inline-block');

            expect(css.get(element, 'display')).toBe('inline-block');
        });

        it('set one property - element not in DOM', function() {
            var element = document.createElement('div');
            css.set(element, {display: 'inline-block'});

            expect(css.get(element, 'display')).toBe('inline-block');
        });

        it('set multiple properties - element not in DOM', function() {
            var element = document.createElement('div');
            css.set(element, {display: 'inline-block', position: 'relative'});

            expect(css.get(element, 'display')).toBe('inline-block');
            expect(css.get(element, 'position')).toBe('relative');
        });

        it('set multiple properties - element in DOM', function() {
            var element = document.createElement('div');
            document.body.appendChild(element);
            css.set(element, {display: 'inline-block', position: 'relative'});

            expect(css.get(element, 'display')).toBe('inline-block');
            expect(css.get(element, 'position')).toBe('relative');
        });

        it('set property to default by not providing a value', function() {
            var element = document.createElement('div');
            document.body.appendChild(element);

            css.set(element, 'display', 'inline-block');
            css.set(element, 'display', '');

            expect(css.get(element, 'display')).toBe('block'); // browser default.
        });

    });
});
