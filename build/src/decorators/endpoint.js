var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Memory } from '../framework/memory';
// decorator function for registering endpoints
var registerDecoratedEntityAsEndpoint = function (requestMethod, definition) {
    return function (target, key, descriptor) {
        var memory = Memory.getInstance();
        var endpoints = memory.get('endpoints');
        endpoints.push(__assign({ method: requestMethod, class: target.constructor, classMethod: key }, definition));
        return target[key];
    };
};
// decorator factory functions for various HTTP methods
export var Get = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('GET', routeDefinition);
};
export var Post = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('POST', routeDefinition);
};
export var Put = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('PUT', routeDefinition);
};
export var Patch = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('PATCH', routeDefinition);
};
export var Delete = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('DELETE', routeDefinition);
};
export var Options = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('OPTIONS', routeDefinition);
};
export var Head = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('HEAD', routeDefinition);
};
