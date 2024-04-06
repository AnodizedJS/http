import { MimeType } from '../types/mime';
/**
 * Defines the structure of a route definition.
 */
type RouteDefinition = {
    path: string;
    produces?: MimeType;
    consumes?: MimeType;
    description?: string;
};
/**
 * Decorator factory for marking a method as an HTTP GET endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export declare const Get: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator factory for marking a method as an HTTP POST endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export declare const Post: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator factory for marking a method as an HTTP PUT endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export declare const Put: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator factory for marking a method as an HTTP PATCH endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export declare const Patch: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator factory for marking a method as an HTTP DELETE endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export declare const Delete: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator factory for marking a method as an HTTP OPTIONS endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export declare const Options: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator factory for marking a method as an HTTP HEAD endpoint.
 * @param {RouteDefinition} routeDefinition - The route definition.
 * @returns {Function} Decorator function.
 */
export declare const Head: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => void;
export {};
