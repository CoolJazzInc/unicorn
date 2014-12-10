define(function(require) {

    var _css = require('uni/utilities.css');

    return {

        get: function(element) {
            var position = {
                left: element.offsetLeft,
                top: element.offsetTop
            };

            var parent = element.offsetParent;
            while (parent) {
                position.left += parent.offsetLeft;
                position.top += parent.offsetTop;

                parent = parent.offsetParent;
            }
            return position;
        },

        set: function(element, position) {

            var parent = element.offsetParent;
            while (parent) {
                position.left -= parent.offsetLeft;
                position.top -= parent.offsetTop;

                parent = parent.offsetParent;
            }

            _css.set(element, {
                left: position.left + 'px',
                top: position.top + 'px'
            });
        }
    };
});
