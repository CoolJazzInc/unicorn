
define(['uni/utilities.color'], function(color) {

    describe('Color', function() {

        /* test for hexToRbg */
        it('hexToRgb - hex uppercase: F1001C', function() {
            var hex = '#F1001C';
                rgb = color.hexToRgb(hex);
            expect(rgb.red).toBe(241);
            expect(rgb.green).toBe(0);
            expect(rgb.blue).toBe(28);
        });

        it('hexToRgb - hex lowecase: #f1001c', function() {
            var hex = '#f1001c';
            rgb = color.hexToRgb(hex);
            expect(rgb.red).toBe(241);
            expect(rgb.green).toBe(0);
            expect(rgb.blue).toBe(28);
        });

        it('hexToRgb - non hex string "xxx"', function() {
            var hex = 'xxx';
            rgb = color.hexToRgb(hex);
            expect(rgb).toBeNull();
        });

        it('hexToRgb - bad hex-color string "#gg99xx"', function() {
            var hex = 'gg99xx';
            rgb = color.hexToRgb(hex);
            expect(rgb).toBeNull();
        });

        it('rgbToHex - correct values for r, g and b', function() {
            var rgb = {red: 241, green: 0, blue: 28};
            hex = color.rgbToHex(rgb.red, rgb.green, rgb.blue);
            expect(hex).toBe('#f1001c');
        });

        it('rgbToHex - missing value', function() {
            var rgb = {red: undefined, green: 0, blue: 28};
            hex = color.rgbToHex(rgb.red, rgb.green, rgb.blue);
            expect(hex).toBe('#00001c');
        });

    });
});
