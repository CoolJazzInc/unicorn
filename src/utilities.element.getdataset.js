
/**
 *  Polyfill for element.dataset.
 *  Get all the attributes that start with 'data-'
 *      and return a attribute-value object.
 *
 *  data attribute names are camelcased:
 *  data-date-of-birth='3' results in {dateOfBirth: '3'}.
 *
 *  words in data attributes are lowercased
 *  data-DateOfBirth='3' results in {dateofbirth: '3'}.
 *
 *  @param {Element} element Element to get the dataset from.
 *  @return {DOMStringMap | Object} The element's dataset.
 */

define(function() {

    'use strict';

    return function(element) {
        // if dataset is nativly supported, return that.
        if (element.dataset) return element.dataset;

        var dataset = {};
        // if not, get all attributes starting with 'data-' and build the set.
        for (var attr in element.attributes) {
            var objAttr = element.attributes[attr];
            if (objAttr.name && typeof objAttr !== 'function') {
                var dataAttr = objAttr.name.match(/^data-(.+)/);
                if (dataAttr && dataAttr[1]) {
                    // in native dataset everything is converted to lowercase.
                    dataAttr[1] = dataAttr[1].toLowerCase();
                    // camelize attribute
                    var key = dataAttr[1].replace(/-(.)/g, function($0, $1) {
                        return $1.toUpperCase();
                    });
                    dataset[key] = objAttr.value;
                }
            }
        }
        return dataset;
    }
});
