import { AnodizedApp, ApplicationContextError } from '../../src/configuration/app';

describe('HTTP Server Tests', () => {
    it('Throws Exception when source directory doesn\'t exist', async () => {
        try {
            await AnodizedApp({
                httpPort: 8080,
                sourceDirectory: 'app',
                runtimeType: 'node'
            })
            fail();
        } catch (e) {
            expect(e).toBeInstanceOf(ApplicationContextError) // we expect an error
        }
    });
    it('Insecure only server (http)', async () => {
        await AnodizedApp({
            httpPort: 8080,
            sourceDirectory: 'example',
            runtimeType: 'node',
            onServerInitialised: ({ http, https }) => {
                expect(http).not.toEqual(null);
                expect(https).toBeFalsy();

                http.close();
                https?.close();
            }
        })
    });
    it('Secure server rejects when no certificate or key exists', async () => {
        try {
            await AnodizedApp({
                httpPort: 8080,
                httpsPort: 8081,
                sourceDirectory: 'example',
                runtimeType: 'node',
                onServerInitialised: ({ http, https }) => {    
                    http.close();
                    https?.close();
                }
            })
            fail();
        } catch (e) {
            expect(e).toBeInstanceOf(ApplicationContextError) // we expect an error
        }
    })
    it('Secure server starts alongside insecure', async () => {
        
        await AnodizedApp({
            httpPort: 8080,
            httpsPort: 8081,
            sourceDirectory: 'example',
            runtimeType: 'node',
            certificate: 'example/localhost.crt',
            key: 'example/localhost.key',
            onServerInitialised: ({ http, https }) => {    
                http.close();
                
                expect(https).not.toBeFalsy();
                https?.close();
            }
        });
        
    })
})