/**
 * Converts a response object into a string representation based on the specified MIME type.
 * @param {any} response - The response object to stringify.
 * @param {MimeType} mime - The MIME type of the response.
 * @returns {string} The string representation of the response.
 */
export var stringifyResponse = function (response, mime) {
    if (!response) {
        return '';
    }
    switch (mime) {
        case 'application/json':
            // Check if response has a serialize method, and use it for serialization if available.
            if (response.serialize && typeof response.serialize === 'function') {
                return JSON.stringify(response.serialize());
            }
            // Otherwise, stringify the response directly.
            return JSON.stringify(response);
        default:
            // For other MIME types, simply convert the response to a string representation.
            return response.toString();
    }
};
