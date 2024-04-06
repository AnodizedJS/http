import { AnodizedPlugin } from '../exports';
import { Logger } from '../types/logging';
/**
 * Type representing the runtime environment.
 */
export type RuntimeType = 'node' | 'serverless';
/**
 * Parameter object for initializing the Anodized application.
 */
export type ApplicationContextParameter = {
    httpPort: number;
    httpsPort?: number;
    certificate?: string;
    key?: string;
    sourceDirectory: string;
    runtimeType: RuntimeType;
    onServerInitialised?: Function;
    onTypescriptReady?: Function;
    verbose?: boolean;
    plugins?: AnodizedPlugin[];
    publicDirectories?: string[];
    logger: Logger;
};
/**
 * Initializes the Anodized application.
 * @param {ApplicationContextParameter} appContext - Application context parameters.
 */
export declare function AnodizedApp(appContext: ApplicationContextParameter): Promise<void>;
/**
 * Custom error class for ApplicationContext errors.
 */
export declare class ApplicationContextError extends Error {
}
