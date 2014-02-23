
define(['uni/utilities.storage'], function(storage) {

    describe('Storage', function() {

        /* test for hexToRbg */
        it('set: should set windows data property "title" to "hello"', function() {
            storage.set(window, 'title', 'hello');
            expect(storage.get(window, 'title')).toBe('hello');
        });

        it('set: should support non [a-z] characters in key', function() {
            storage.set(window, '/<>()*&%$#@!', 'hello');
            expect(storage.get(window, '/<>()*&%$#@!')).toBe('hello');
        });

        it('set: should support non [a-z] characters in value', function() {
            storage.set(window, '/<>()*&%$#@!', '/<>()*&%$#@!');
            expect(storage.get(window, '/<>()*&%$#@!')).toBe('/<>()*&%$#@!');
        });

        it('set: should return an empty object if no entry for the object is found in storage', function() {
            var notfound = storage.get(document.body, 'foo');
            expect(notfound).toBeNull();
        });

        it('set: should set a new value for a key', function() {
            storage.set(window, 'title', 'hello again');
            expect(storage.get(window, 'title')).toBe('hello again');
        });

        it('remove: should remove a key', function() {
            storage.remove(window, 'title');
            expect(storage.get(window, 'title')).toBeNull();
        });

        it('remove: should remove a entry if no key is provided', function() {
            storage.remove(window);
            var emptyObj = storage.getEntry(window);
            expect(storage.get(window, 'title')).toBeNull();
            expect(emptyObj).toEqual(jasmine.any(Object));
            if (typeof Object.keys == 'function') {
                expect(Object.keys(emptyObj).length).toBe(0);
            }
        });

        it('getEntry: should return an empty object if no data is found', function() {
            var emptyObj = storage.getEntry(document.body);
            expect(emptyObj).toEqual(jasmine.any(Object));
            if (typeof Object.keys == 'function') {
                expect(Object.keys(emptyObj).length).toBe(0);
            }
        });

    });

});
