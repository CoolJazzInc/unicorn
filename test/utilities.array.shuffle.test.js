
define(['uni/utilities.array.shuffle'], function(shuffle) {

    describe('Array.shuffle', function() {

        it('should return an array of equal length', function() {
            var ar = [1 ,2, 3];
            var shuf = shuffle(ar);
            expect(shuf.length).toBe(ar.length);
        });

        it('should return the same array instance', function() {
            var ar = [1 ,2, 3];
            var shuf = shuffle(ar);
            expect(shuf).toBe(ar);
        });

        it('should not break on empty arrays', function() {
            var ar = [];
            var shuf = shuffle(ar);
            expect(shuf).toBe(ar);
        });

        it('should not break on non-array input', function() {
            var obj = {};
            var shuf = shuffle(obj);
            expect(shuf).toBe(obj);

            obj = function(){};
            shuf = shuffle(obj);
            expect(shuf).toBe(obj);

            obj = undefined;
            shuf = shuffle(obj);
            expect(shuf).toBe(obj);

            obj = 'shuffle';
            shuf = shuffle(obj);
            expect(shuf).toBe(obj);

            obj = document.body.childNodes;
            shuf = shuffle(obj);
            expect(shuf).toBe(obj);
        });
    });
});
