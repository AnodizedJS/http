import * as http from 'http';
import * as https from 'https';
import { readFileSync, existsSync } from 'fs';
import { getTsFiles, getTsxFiles } from '../framework/utilities';
import { Memory } from '../framework/memory';
import { RouteMatchResult, routeMatches } from '../framework/routing';
import { stringifyResponse } from '../framework/serialize';
import { parse } from '../framework/parsers';

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
    verbose?: boolean
};

/**
 * Initializes the Anodized application.
 * @param {ApplicationContextParameter} appContext - Application context parameters.
 */
export async function AnodizedApp(appContext: ApplicationContextParameter): Promise<void> {
    
    // Load the application and check if sourceDirectory is valid and exists.
    if (appContext.sourceDirectory.length === 0) {
        throw new ApplicationContextError('AppContext({ sourceDirectory }) cannot be empty');
    }
    if (!existsSync(appContext.sourceDirectory)) {
        throw new ApplicationContextError(`AppContext({ sourceDirectory: '${appContext.sourceDirectory}' }) the sourceDirectory doesn't exist`);
    }

    const memory: Memory = Memory.getInstance();
    memory.put('endpoints', []);
    memory.put('controllers', []);

    // Load TypeScript files.
    const tsFiles: string[] = getTsFiles(appContext.sourceDirectory);  
    const tsxFiles: string[] = getTsxFiles(appContext.sourceDirectory);  

    for (const file of tsFiles) {

        if (appContext.verbose) {
            console.log(`[LOAD (ts)] ${file}`);
        }

        await import(`${process.cwd()}/${file}`);
    }
    for (const file of tsxFiles) {

        if (appContext.verbose) {
            console.log(`[LOAD (tsx)] ${file}`);
        }

        await import(`${process.cwd()}/${file}`);
    }

    if (appContext.verbose) {
        console.log(`[LOAD] Complete`);
    }

    if (appContext.onTypescriptReady) {
        // allow hooks in lifecycles.
        appContext.onTypescriptReady();
    }

    /**
     * Handles HTTP requests.
     * @param {http.IncomingMessage} req - The HTTP request.
     * @param {http.ServerResponse} res - The HTTP response.
     * @param {string} body - Request body.
     */
    const handler = async (req: http.IncomingMessage, res: http.ServerResponse, body: string): Promise<void> => {
        const endpoints: any[] = memory.get('endpoints');
        let handled = false;

        endpoints.some((endpoint: any) => {
            const matchResult: RouteMatchResult = routeMatches(endpoint.path, req.url);

            if (endpoint.method === req.method.toUpperCase() && matchResult.isMatch) {
                handled = true;
                const classDefinition = endpoint.class;
                const { classMethod, consumes } = endpoint;

                const controller = memory.get('controllers').find(
                    (instanceMap: any) => instanceMap.constructor === classDefinition
                );

                const data = parse(body, consumes ?? 'text/plain');

                const context = {
                    ...matchResult.urlParameters,
                    ...data,
                    response: res,
                    request: req,
                };

                if (!controller) {
                    res.writeHead(500, {
                        'Content-Type': 'text/html'
                    });
                    console.error('The annotation that declares endpoints has been passed a class that isn\'t a controller, please add the @Controller decorator to that class to prevent this error');
                    res.end('Internal server error');
                    return true;
                }

                const { instance } = controller;
                const result: any = instance[classMethod](context);

                res.setHeader('Content-Type', endpoint.produces ?? 'text/html');

                if (result instanceof Promise) {
                    result.then((response: any) => {
                        res.end(stringifyResponse(response, endpoint.produces ?? 'text/html'));
                    })
                    .catch((reason: unknown) => {
                        res.end('<h2>Internal server error</h2>');
                    });
                } else {
                    res.end(stringifyResponse(result, endpoint.produces ?? 'text/html'));
                }

                return true;
            } else {
                return false;
            }                   
        });

        if (!handled) {
            res.writeHead(404);
            res.end('404');
        }
    };

    /**
     * Handles HTTP requests.
     * @param {http.IncomingMessage} req - The HTTP request.
     * @param {http.ServerResponse} res - The HTTP response.
     */
    const handleHttpRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
        if (!req.method) {
            res.end();
            return;
        }

        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method!.toUpperCase())) {
            handler(req, res, '');
            return;
        }

        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
            handler(req, res, data);
        });
    };

    const nonSecureListener = http.createServer(handleHttpRequest);
    nonSecureListener.listen(appContext.httpPort);

    if (appContext.httpsPort) {
        if (!appContext.certificate || !appContext.key) {
            nonSecureListener.close();
            throw new ApplicationContextError('No certificate or key file supplied');
        }

        const secureListener = https.createServer({
            cert: readFileSync(appContext.certificate),
            key: readFileSync(appContext.key)
        }, handleHttpRequest);
        secureListener.listen(appContext.httpsPort);
        if (appContext.onServerInitialised) {
            appContext.onServerInitialised({
                http: nonSecureListener,
                https: secureListener
            });
        }
    } else {
        if (appContext.onServerInitialised) {
            appContext.onServerInitialised({
                http: nonSecureListener
            });
        }
    }
}

/**
 * Custom error class for ApplicationContext errors.
 */
export class ApplicationContextError extends Error {}
