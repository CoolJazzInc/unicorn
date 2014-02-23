
define(['uni/utilities.string'], function(s) {

    describe('String', function() {

        /* test for capitalize */
        it('captilize', function() {
            var orig = 'some string',
                caps = 'Some string',
                result = s.capitalize(orig);
            expect(result).toBe(caps);
        });

        /* test for camelize */
        it('camilize', function() {
            var orig = 'some-dash-string',
                cam = 'someDashString',
                result = s.camelize(orig);
            expect(result).toBe(cam);
        });
    });
});
