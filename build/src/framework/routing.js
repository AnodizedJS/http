/**
 * Matches a route against a request URL and extracts URL parameters if any.
 * @param {string} route - The route pattern to match against.
 * @param {string} requestUrl - The request URL to match.
 * @returns {RouteMatchResult} The result of matching the route against the request URL.
 */
export var routeMatches = function (route, requestUrl) {
    // Check if a query string exists, remove it if it does.
    if (requestUrl.includes('?')) {
        requestUrl = requestUrl.split('?')[0];
    }
    // Remove any consecutive slashes in the request URL.
    requestUrl = requestUrl.replace(/\/\/+/g, '/');
    // If the route is '/' and the request URL is not '/', it's not a match.
    if (route === '/' && requestUrl !== '/') {
        return { isMatch: false };
    }
    // If both the route and the request URL are '/', it's a match.
    if (route === '/' && requestUrl === '/') {
        return { isMatch: true };
    }
    var routeSegments = route.split('/');
    var urlSegments = requestUrl.split('/');
    var urlParameters = {};
    for (var i = 0; i < routeSegments.length; i++) {
        var routeSegment = routeSegments[i];
        var urlSegment = urlSegments[i];
        // If the route segment is '*', continue to the next segment.
        if (routeSegment === '*') {
            continue;
        }
        // If the route segment is a URL parameter (e.g., '{param}'), extract the parameter.
        if (routeSegment.startsWith('{') && routeSegment.endsWith('}')) {
            urlParameters[routeSegment.slice(1, -1)] = urlSegment;
            continue;
        }
        // If the route segment doesn't match the URL segment, it's not a match.
        if (routeSegment !== urlSegment) {
            return { isMatch: false };
        }
    }
    // All segments match, return true with URL parameters if any.
    return {
        isMatch: true,
        urlParameters: urlParameters
    };
};
