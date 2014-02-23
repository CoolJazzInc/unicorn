
define(['uni/utilities.object'], function(O) {

    describe('Object.serialize', function() {

        it('create a querystring from an object', function() {
            var obj = {
                    scoobie: 'doo',
                    scrappy: 'doohoo'
                },
                str = O.serialize(obj)

            expect(str).toBe('scoobie=doo&scrappy=doohoo');
        });

        it('create urlEncode keys and values', function() {
            var obj = {
                    'scoobie': 'doo doo',
                    'scrap&py': 'doohoo'
                },
                str = O.serialize(obj)

            expect(str).toBe('scoobie=doo%20doo&scrap%26py=doohoo');
        });

        it('should handle empty objects', function() {
            var obj = {},
                str = O.serialize(obj)

            expect(str).toBe('');
        });
    });
});
