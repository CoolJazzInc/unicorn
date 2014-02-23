
define(['uni/utilities.object'], function(O) {

    describe('Object.extend', function() {

        it('should handle shallow copy', function() {
            var objOrig = {
                    scoobie: 'doo',
                    scrappy: 'doohoo',
                    obj1: {
                        scoobie: 'doo',
                        scrappy: 'doohoo',
                        onlyOrig: 'here',
                        obj2: {
                            scoobie: 'doo',
                            scrappy: 'doohoo',
                            onlyOrig: 'here2'
                        }
                    }
                },

                objnew = {
                    scoobie: 'altered',
                    scrappy: 'doohoo',
                    obj1: {
                        scoobie: 'altered2',
                        scrappy: 'doohoo',
                        obj2: {
                            scoobie: 'altered3',
                            scrappy: 'doohoo',
                            foo: {
                                bar: 'baz'
                            }
                        }
                    }
                },

                copy = O.extend(objOrig, objnew);

            expect(copy.scoobie).toBe('altered');
            expect(copy.scrappy).toBe('doohoo');
            expect(copy.obj1.scoobie).toBe('altered2');
            expect(copy.obj1.scrappy).toBe('doohoo');
            expect(copy.obj1.onlyOrig).toBe(undefined);
            expect(copy.obj1.obj2.scoobie).toBe('altered3');
            expect(copy.obj1.obj2.scrappy).toBe('doohoo');
            expect(copy.obj1.obj2.onlyOrig).toBe(undefined);
            expect(copy.obj1.obj2.foo.bar).toBe('baz');

        });

        it('should handle deep copy', function() {
            var objOrig = {
                    scoobie: 'doo',
                    scrappy: 'doohoo',
                    obj1: {
                        scoobie: 'doo',
                        scrappy: 'doohoo',
                        onlyOrig: 'here',
                        obj2: {
                            scoobie: 'doo',
                            scrappy: 'doohoo',
                            onlyOrig: 'here2'
                        }
                    }
                },

                objnew = {
                    scoobie: 'altered',
                    scrappy: 'doohoo',
                    obj1: {
                        scoobie: 'altered2',
                        scrappy: 'doohoo',
                        obj2: {
                            scoobie: 'altered3',
                            scrappy: 'doohoo',
                            foo: {
                                bar: 'baz'
                            }
                        }
                    }
                },

                copy = O.extend(true, objOrig, objnew);

            expect(copy.scoobie).toBe('altered');
            expect(copy.scrappy).toBe('doohoo');
            expect(copy.obj1.scoobie).toBe('altered2');
            expect(copy.obj1.scrappy).toBe('doohoo');
            expect(copy.obj1.onlyOrig).toBe('here');
            expect(copy.obj1.obj2.scoobie).toBe('altered3');
            expect(copy.obj1.obj2.scrappy).toBe('doohoo');
            expect(copy.obj1.obj2.onlyOrig).toBe('here2');
            expect(copy.obj1.obj2.foo.bar).toBe('baz');
        });

        it('should leave the original objects intact', function() {
            var obj = {
                scoobie: 'doo',
                scrappy: 'doohoo'
            };

            var copy = O.extend({}, obj, {scoobie: 'whoohoo', scrappy: 'whoohoohoo'})
            expect(copy.scoobie).toBe('whoohoo');
            expect(copy.scrappy).toBe('whoohoohoo');
            expect(obj.scoobie).toBe('doo');
            expect(obj.scrappy).toBe('doohoo');
        });
    });
});
