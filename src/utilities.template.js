
/**
 * Templating component.
 */

define(function(require) {

    'use strict';

    var object = require('uni/utilities.object'),
        str = require('uni/utilities.string');

    function Template() {
        this.init.apply(this, arguments);
    }

    var _CONVERTERS = {
        nospaces: function(value) {
            return typeof value == 'string' ? value.replace(/\s+/g, '') : value;
        },
        dasherize: function(value) {
            return typeof value == 'string' ? value.replace(/\s+/g, '-') : value;
        },
        lowercase: function(value) {
            return typeof value == 'string' ? value.toLowerCase() : value;
        },
        uppercase: function(value) {
            return typeof value == 'string' ? value.toUpperCase() : value;
        },
        capitalize: function(value) {
            return typeof value == 'string' ? str.capitalize(value) : value;
        }
    };

    Template.prototype.init = function(converters) {
        this.converters = object.extend({}, _CONVERTERS, converters || {});
    }

    /**
     * Fill in the template for an item in the list.
     * @param {String} html The template's html.
     * @param {Object} data definition The component definition.
     * @return {String} html.
     */
    Template.prototype.applyTemplate = function(html, data) {
        return html.replace(/\$([\da-z#]*)+/g, function($1, $2) {
            var conversions = $2.split('#');
            if (conversions.length > 1) {
                var result = data[conversions[0]];
                for (var i = 1; i < conversions.length; i++) {
                    if (this.converters[conversions[i]]) {
                        result = this.converters[conversions[i]](result);
                    }
                }
            } else
                result = data[$2];

            return result;
        }.bind(this));
    }

    return Template;
});
