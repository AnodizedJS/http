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
/**
 * Registers a decorated entity as an endpoint for a specific HTTP method.
 * @param {string} requestMethod - The HTTP method (e.g., 'GET', 'POST').
 * @param {RouteDefinition} definition - The route definition.
 * @returns {Function} Decorator function.
 */
var registerDecoratedEntityAsEndpoint = function (requestMethod, definition) {
    return function (target, key, descriptor) {
        var memory = Memory.getInstance();
        var endpoints = memory.get('endpoints');
        // Push endpoint metadata into memory
        endpoints.push(__assign({ method: requestMethod, class: target.constructor, classMethod: key }, definition));
    };
};
/**
 * Decorator factory for marking a method as an HTTP GET endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export var Get = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('GET', routeDefinition);
};
/**
 * Decorator factory for marking a method as an HTTP POST endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export var Post = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('POST', routeDefinition);
};
/**
 * Decorator factory for marking a method as an HTTP PUT endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export var Put = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('PUT', routeDefinition);
};
/**
 * Decorator factory for marking a method as an HTTP PATCH endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export var Patch = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('PATCH', routeDefinition);
};
/**
 * Decorator factory for marking a method as an HTTP DELETE endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export var Delete = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('DELETE', routeDefinition);
};
/**
 * Decorator factory for marking a method as an HTTP OPTIONS endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export var Options = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('OPTIONS', routeDefinition);
};
/**
 * Decorator factory for marking a method as an HTTP HEAD endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export var Head = function (routeDefinition) {
    return registerDecoratedEntityAsEndpoint('HEAD', routeDefinition);
};
