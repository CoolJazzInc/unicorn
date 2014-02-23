
define(['uni/utilities.element.classlist'], function(cl) {

    describe('Classlist', function() {

        var element = document.createElement('div');

        /* test for add class */
        it('add class to classless element', function() {
            cl.addClass(element, 'scoobie');
            expect(element.className).toBe('scoobie');
        });

        it('Add another class to an element', function() {
            cl.addClass(element, 'doo');
            expect(element.className).toBe('scoobie doo');
        });

        it('remove a class from an element with multiple classes', function() {
            cl.removeClass(element, 'scoobie');
            expect(element.className).toBe('doo');
        });

        it('remove a class from an element with one class', function() {
            cl.removeClass(element, 'doo');
            expect(element.className).toBe('');
        });

        it('toggle a class on element without the class', function() {
            cl.toggleClass(element, 'wilma');
            //element.classList.toggle('wilma')
            expect(element.className).toBe('wilma');
        });

        it('toggle a class on element with the classes', function() {
            cl.toggleClass(element, 'wilma');
            expect(element.className).toBe('');
        });

        it('toggle a class on element - force add', function() {
            cl.addClass(element, 'scoobie');
            cl.toggleClass(element, 'scoobie', true);
            expect(element.className).toBe('scoobie');
        });

        it('toggle a class on element - force remove', function() {
            cl.removeClass(element, 'scoobie');
            cl.toggleClass(element, 'scoobie', false);
            expect(element.className).toBe('');
        });

        it('check if element has a class - should have the one class', function() {
            cl.addClass(element, 'scoobie');
            expect(cl.hasClass(element, 'scoobie')).toBe(true);
        });

        it('check if element has a class - should not have the one class', function() {
            cl.removeClass(element, 'scoobie');
            expect(cl.hasClass(element, 'scoobie')).toBe(false);
        });

        it('check if element has a class - should have the class, amongst others', function() {
            element.className = 'scoobie doo wilma betty';
            expect(cl.hasClass(element, 'wilma')).toBe(true);
        });

        it('check if element has a class - should not have the class but has others', function() {
            element.className = 'scoobie doo betty';
            expect(cl.hasClass(element, 'wilma')).toBe(false);
        });

    });
});
