/**
 * Abstract class representing a security authorizer.
 */
export declare abstract class SecurityAuthorizer {
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
    errorResponse(code: string, message: string): string;
}
/**
 * Decorator factory for performing authorization checks before method execution.
 * @param {typeof SecurityAuthorizer} authorizer - The security authorizer class.
 * @param {string} [requiredPermission] - The required permission for the method.
 * @returns {Function} Decorator function.
 */
export declare const PreAuthorize: (authorizer: typeof SecurityAuthorizer, requiredPermission?: string) => (target: any, key: string, descriptor: PropertyDescriptor) => void;
