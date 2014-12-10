/**
 * Serialize a form.
 * Based on https://code.google.com/p/form-serialize/
 */
define(function() {

    'use strict';

    return function(form) {
        if (!form || form.nodeName.toLowerCase() !== 'form') {
            return;
        }
        var query = [];
        for (var i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === '') {
                continue;
            }

            var nodeName = form.elements[i].nodeName.toLowerCase();

            switch (nodeName) {
                case 'input':
                    switch (form.elements[i].type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                        case 'button':
                        case 'reset':
                        case 'submit':
                            query.push(form.elements[i].name + '=' +
                                encodeURIComponent(form.elements[i].value));
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (form.elements[i].checked) {
                                query.push(form.elements[i].name + '=' +
                                    encodeURIComponent(form.elements[i].value));
                            }
                            break;
                        case 'file':
                            break;
                    }
                    break;
                case 'textarea':
                    query.push(form.elements[i].name + '=' +
                        encodeURIComponent(form.elements[i].value));
                    break;
                case 'select':
                    switch (form.elements[i].type) {
                        case 'select-one':
                            query.push(form.elements[i].name + '=' +
                                encodeURIComponent(form.elements[i].value));
                            break;
                        case 'select-multiple':
                            for (var j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                    query.push(form.elements[i].name + '=' +
                                        encodeURIComponent(form.elements[i].options[j].value));
                                }
                            }
                            break;
                    }
                    break;
                case 'button':
                    switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            query.push(form.elements[i].name + '=' +
                                encodeURIComponent(form.elements[i].value));
                            break;
                    }
                    break;
            }
        }console.log('query', query.join('&'))
        return query.join('&');
    }
});
