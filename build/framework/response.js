export var stringifyResponse = function (response, mime) {
    if (!response) {
        return '<h2>Error</h2><p>Endpoint returned undefined</p>';
    }
    if (typeof response === 'string') {
        return response;
    }
    if (Array.isArray(response)) {
        if (mime === 'text/plain') {
            return mime.toString();
        }
        return JSON.stringify(response);
    }
    if (response.serialize && response.serialize.constructor.name === 'Function') {
        return stringifyResponse(response.serialize(), mime);
    }
    if (mime === 'application/json') {
        return JSON.stringify(response);
    }
    if (mime.startsWith('text/')) {
        return response.toString();
    }
    // add in support for XML at a later date.
};
