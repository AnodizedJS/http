import { ServerResponse } from 'http';

/**
 * Abstract class representing a security authorizer.
 */
export abstract class SecurityAuthorizer {
    /**
     * Checks if role-based access control (RBAC) is enabled.
     * @returns {boolean} Whether RBAC is enabled.
     */
    abstract isRbacEnabled(): boolean;

    /**
     * Checks if the user has the specified permission.
     * @param {string} permission - The permission to check.
     * @returns {Promise<boolean>} A promise resolving to true if the user has the permission, false otherwise.
     */
    abstract hasPermission(permission: string): Promise<boolean>;

    /**
     * Checks if a user is logged in based on headers.
     * @param {Record<string, any>} headers - The headers object containing authentication information.
     * @returns {Promise<boolean>} A promise resolving to true if the user is logged in, false otherwise.
     */
    abstract isLoggedIn(headers: Record<string, any>): Promise<boolean>;

    /**
     * Gets the login URL.
     * @returns {string} The login URL.
     */
    abstract getLoginUrl(): string;

    /**
     * Generates an error response HTML, this can be overriden to output JSON for instance.
     * @param {string} code - The error code.
     * @param {string} message - The error message.
     * @returns {string} The error response HTML.
     */
    errorResponse(code: string, message: string): string {
        return `<h1>Error ${code}</h1><p>${message}</p>`;
    }
}

/**
 * Decorator factory for performing authorization checks before method execution.
 * @param {typeof SecurityAuthorizer} authorizer - The security authorizer class.
 * @param {string} [requiredPermission] - The required permission for the method.
 * @returns {Function} Decorator function.
 */
export const PreAuthorize = (authorizer: typeof SecurityAuthorizer, requiredPermission?: string) => {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        // Initialize authorizer if not already initialized
        if (!target.authorizer) {
            // @ts-ignore: Initializing authorizer dynamically
            target.authorizer = new authorizer();
        }
        
        const original = descriptor.value;

        target[key] = async function(...args: any[]) {
            const params = args[0];
            const response: ServerResponse = params.response;

            // Check if user is logged in
            if (!(await target.authorizer.isLoggedIn(params.headers))) {
                response.statusCode = 302;
                response.setHeader('Location', target.authorizer.getLoginUrl());
                return target.authorizer.errorResponse('1', 'You are not logged in');
            }

            // Check if RBAC is enabled and user has required permission
            if (target.authorizer.isRbacEnabled() && requiredPermission) {
                if (!(await target.authorizer.hasPermission(requiredPermission))) {
                    response.statusCode = 403;
                    return target.authorizer.errorResponse('2', 'You don\'t have the required permission to perform this action');
                }
            }

            // Execute the original method
            return await original.apply(this, args);
        };
    };
};
