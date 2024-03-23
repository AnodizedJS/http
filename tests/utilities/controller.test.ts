import { AnodizedApp } from '../../src/configuration/app';
import axios, { AxiosError, AxiosResponse } from 'axios';

AnodizedApp({
    httpPort: 8080,
    sourceDirectory: 'example',
    runtimeType: 'node',
    onServerInitialised: ({ http }) => {
        testsComplete().then(() => {
            http.close();
        })
    }
})

let completeTests = 0;
let totalTests = 0;

const testsComplete = async (): Promise<void> => {
    return new Promise((resolve) => {
        const itvl = setInterval(() => {
            if (totalTests === completeTests) {
                clearInterval(itvl);
                resolve();
            }
        }, 50);
    });
}

describe('Controller tests', () => {
       
    it('Request valid URL with correct request method', async () => {
        
        totalTests++;
        
        try{
            const resp:AxiosResponse = await axios({
                url: 'http://localhost:8080/'
            });

            expect(resp.status).toEqual(200);
            expect(resp.data).toEqual('<h1>Hello world</h1>');
        }catch(e)
        {
            console.log(e);
            fail();
        }

        completeTests++;
    })

    it('Request valid URL with incorrect request method that returns 404', async () => {
        
        totalTests++;
        try{
            const resp:AxiosResponse = await axios({
                url: 'http://localhost:8080/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({})
            });
        }catch(e:any){
            if (e instanceof AxiosError) {
                expect(e.response.status).toEqual(404);
            } else {
                fail();
            }
        }
        completeTests++;
    })

    it('Request valid URL with request method that returns JSON', async () => {
        
        totalTests++;
        try{
            const resp:AxiosResponse = await axios({
                url: 'http://localhost:8080/test',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({})
            });

            expect(resp.status).toEqual(200)
            expect(resp.data.success).toBeTruthy();
        }catch(e:any){
            fail();
        }
        completeTests++;
    })

    it('Endpoint context building works', async () => {
        
        totalTests++;
        try{
            const resp:AxiosResponse = await axios({
                url: 'http://localhost:8080/name',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    name: 'John Hudson'
                })
            });

            expect(resp.status).toEqual(200)
            expect(resp.data.data.message).toEqual('Your name is John Hudson');
        }catch(e:any){
            fail();
        }
        completeTests++;
    })
    
})