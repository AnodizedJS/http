export type ApplicationContextParameter = {
    httpPort: number;
    httpsPort?: number;
    certificate?: string;
    key?: string;
    sourceDirectory: string;
};
export declare function AnodizedApp(appContext: ApplicationContextParameter): Promise<void>;
export declare class ApplicationContextError extends Error {
}
