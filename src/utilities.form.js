define(function() {

    return {

        // http://stackoverflow.com/questions/11661187/form-serialize-javascript-no-framework
        serialize: function serialize(form) {
            if (!form || form.nodeName !== 'FORM') {
                return;
            }
            var i, j, q = [];
            for (i = form.elements.length - 1; i >= 0; i = i - 1) {
                if (form.elements[i].name === '') {
                    continue;
                }

                var name = encodeURIComponent(form.elements[i].name),
                    value = encodeURIComponent(form.elements[i].value);

                switch (form.elements[i].nodeName.toUpperCase()) {
                    case 'INPUT':

                        switch (form.elements[i].type) {
                            case 'checkbox':
                            case 'radio':
                                if (form.elements[i].checked) {
                                    q.push(name + '=' + value);
                                }
                                break;
                            default:
                                q.push(name + '=' + value);
                        }
                        break;

                    case 'FILE':

                        break;

                    case 'TEXTAREA':
                        q.push(name + '=' + value);
                        break;

                    case 'SELECT':

                        switch (form.elements[i].type) {
                            case 'select-one':
                                q.push(name + '=' + value);
                                break;

                            case 'select-multiple':
                                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                    if (form.elements[i].options[j].selected) {
                                        q.push(name + '=' + encodeURIComponent(form.elements[i].options[j].value));
                                    }
                                }
                                break;
                        }
                        break;

                    case 'BUTTON':

                        switch (form.elements[i].type) {
                            case 'reset':
                            case 'submit':
                            case 'button':
                                q.push(name + '=' + value);
                                break;
                        }
                        break;
                }
            }

            return q.join('&');
        }

    };

});
