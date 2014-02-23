
define(['uni/utilities.object.typecheck'], function(check) {

    describe('Typecheck', function() {

        it('should say this is an Array ', function() {
            var ar = [];
            expect(check.isArray(ar)).toBe(true);

            ar = [1, 2, 3];
            expect(check.isArray(ar)).toBe(true);

            ar = new Array();
            expect(check.isArray(ar)).toBe(true);
        });

        it('should say this is not an Array ', function() {

            var ar = {};
            expect(check.isArray(ar)).toBe(false);

            ar = 'Array';
            expect(check.isArray(ar)).toBe(false);

            ar = undefined;
            expect(check.isArray(ar)).toBe(false);

            ar = true;
            expect(check.isArray(ar)).toBe(false);

            ar = false;
            expect(check.isArray(ar)).toBe(false);
        });

        it('should say this is a HTMLElement', function() {
            var el = document.createElement('div');
            expect(check.isElement(el)).toBe(true);

            document.body.appendChild(el);
            expect(check.isElement(el)).toBe(true);
        });

        it('should say this is not a HTMLElement', function() {
            var el = document.createTextNode('');
            expect(check.isElement(el)).toBe(false);

            document.body.appendChild(el);
            expect(check.isElement(el)).toBe(false);

            el = document.createElement('div');
            el.id = 'scoobie';
            var attr = el.getAttributeNode('id');
            expect(check.isElement(attr)).toBe(false);

            var com = document.createComment('scoobie');
            expect(check.isElement(com)).toBe(false);

            document.body.appendChild(com);
            expect(check.isElement(com)).toBe(false);

            expect(check.isElement(document)).toBe(false);

            expect(check.isElement('<div>')).toBe(false);

            var frag = document.createDocumentFragment();
            expect(check.isElement(frag)).toBe(false);
        });

        it('should say this is a function', function() {
            var func = function() {};
            expect(check.isFunction(func)).toBe(true);

            expect(check.isFunction(document.appendChild)).toBe(true);
        });

        it('should say this is not a function', function() {
            var res = function() {}();
            expect(check.isFunction(res)).toBe(false);

            expect(check.isFunction('function')).toBe(false);
        });

        it('should say this is a plain object', function() {
            var obj = {};
            expect(check.isObject(obj)).toBe(true);

            obj = {scoobie: 'doo', fun: {}};
            expect(check.isObject(obj)).toBe(true);
        });

        it('should say this is not a plain object', function() {
            var func = function() {};
            expect(check.isObject(func)).toBe(false);

            var str = 'scoobie';
            expect(check.isObject(str)).toBe(false);

            var ar = [];
            expect(check.isObject(ar)).toBe(false);
        });

        it('should say this is a Nodelist', function() {
            var nl = document.getElementsByTagName('body');
            expect(check.isNodelist(nl)).toBe(true);

            nl = document.getElementsByTagName('scoobie');
            expect(check.isNodelist(nl)).toBe(true);

            nl = document.querySelectorAll('body');
            expect(check.isNodelist(nl)).toBe(true);
        });

        it('should say this is not a Nodelist', function() {
            var ar = [];
            expect(check.isNodelist(ar)).toBe(false);

            ar = [document.getElementById('x')];
            expect(check.isNodelist(ar)).toBe(false);
        });
    });
});
