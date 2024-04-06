/**
 * Represents the result of matching a route against a request URL.
 */
export type RouteMatchResult = {
    isMatch: boolean;
    urlParameters?: Record<string, any>;
};
/**
 * Matches a route against a request URL and extracts URL parameters if any.
 * @param {string} route - The route pattern to match against.
 * @param {string} requestUrl - The request URL to match.
 * @returns {RouteMatchResult} The result of matching the route against the request URL.
 */
export declare const routeMatches: (route: string, requestUrl: string) => RouteMatchResult;
