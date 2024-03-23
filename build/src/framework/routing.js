export var routeMatches = function (route, requestUrl) {
    // check if a query string exists, remove if it does.
    if (requestUrl.includes('?')) {
        requestUrl = requestUrl.split('?')[0];
    }
    requestUrl = requestUrl.replace(/\/\/\/|\/\//g, '/'); // remove any double slashes etc..
    // this is in place as this method splits the path based on /
    if (route === '/' && requestUrl !== '/') {
        return { isMatch: false };
    }
    if (route === '/' && requestUrl === '/') {
        return { isMatch: true };
    }
    var routeSegments = route.split('/');
    var urlSegments = requestUrl.split('/');
    var urlParameters = {};
    for (var i = 0; i < routeSegments.length; i++) {
        var routeSegment = routeSegments[i];
        var urlSegment = urlSegments[i];
        if (routeSegment === '*') {
            continue;
        }
        if (routeSegment[0] === '{') {
            urlParameters[routeSegment.replace(/\{|\}/g, '')] = urlSegment;
            continue;
        }
        if (routeSegment !== urlSegment) {
            return { isMatch: false };
        }
    }
    return {
        isMatch: true,
        urlParameters: urlParameters
    };
};
