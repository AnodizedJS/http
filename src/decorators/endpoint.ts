import { Memory } from '../framework/memory';
import { MimeType } from '../types/mime';

/**
 * Defines the structure of a route definition.
 */
type RouteDefinition = {
    path: string; // the request URI
    produces?: MimeType; // MIME type produced by the endpoint
    consumes?: MimeType; // MIME type consumed by the endpoint
    description?: string; // description for auto API documentation
}

/**
 * Registers a decorated entity as an endpoint for a specific HTTP method.
 * @param {string} requestMethod - The HTTP method (e.g., 'GET', 'POST').
 * @param {RouteDefinition} definition - The route definition.
 * @returns {Function} Decorator function.
 */
const registerDecoratedEntityAsEndpoint = (requestMethod: string, definition: RouteDefinition) => {
    return function(target: any, key: string, descriptor: PropertyDescriptor): void {
        const memory: Memory = Memory.getInstance();
        const endpoints: any[] = memory.get('endpoints');

        // Push endpoint metadata into memory
        endpoints.push({
            method: requestMethod,
            class: target.constructor,
            classMethod: key,
            ...definition
        });
    };
};

/**
 * Decorator factory for marking a method as an HTTP GET endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export const Get = (routeDefinition: RouteDefinition) => {
    return registerDecoratedEntityAsEndpoint('GET', routeDefinition);
};

/**
 * Decorator factory for marking a method as an HTTP POST endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export const Post = (routeDefinition: RouteDefinition) => {
    return registerDecoratedEntityAsEndpoint('POST', routeDefinition);
};

/**
 * Decorator factory for marking a method as an HTTP PUT endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export const Put = (routeDefinition: RouteDefinition) => {
    return registerDecoratedEntityAsEndpoint('PUT', routeDefinition);
};

/**
 * Decorator factory for marking a method as an HTTP PATCH endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export const Patch = (routeDefinition: RouteDefinition) => {
    return registerDecoratedEntityAsEndpoint('PATCH', routeDefinition);
};

/**
 * Decorator factory for marking a method as an HTTP DELETE endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export const Delete = (routeDefinition: RouteDefinition) => {
    return registerDecoratedEntityAsEndpoint('DELETE', routeDefinition);
};

/**
 * Decorator factory for marking a method as an HTTP OPTIONS endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export const Options = (routeDefinition: RouteDefinition) => {
    return registerDecoratedEntityAsEndpoint('OPTIONS', routeDefinition);
};

/**
 * Decorator factory for marking a method as an HTTP HEAD endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export const Head = (routeDefinition: RouteDefinition) => {
    return registerDecoratedEntityAsEndpoint('HEAD', routeDefinition);
};
