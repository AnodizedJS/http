export declare abstract class SecurityAuthorizer {
    abstract isRbacEnabled(): boolean;
    abstract hasPermission(permission: string): Promise<boolean>;
    abstract isLoggedIn(headers: Record<string, any>): Promise<boolean>;
    abstract getLoginUrl(): string;
    errorResponse(code: string, message: string): any;
}
export declare const PreAuthorize: (authorizer: typeof SecurityAuthorizer, requiredPermission?: string) => (target: any, key: string, descriptor: PropertyDescriptor) => void;
