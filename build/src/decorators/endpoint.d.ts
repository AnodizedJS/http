import { MimeType } from '../types/mime';
type RouteDefinition = {
    path: string;
    produces?: MimeType;
    consumes?: MimeType;
    description?: string;
};
export declare const Get: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => any;
export declare const Post: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => any;
export declare const Put: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => any;
export declare const Patch: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => any;
export declare const Delete: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => any;
export declare const Options: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => any;
export declare const Head: (routeDefinition: RouteDefinition) => (target: any, key: string, descriptor: PropertyDescriptor) => any;
export {};
