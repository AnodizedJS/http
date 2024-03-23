export type RouteMatchResult = {
    isMatch: boolean;
    urlParameters?: Record<string, any>;
};
export declare const routeMatches: (route: string, requestUrl: string) => RouteMatchResult;
