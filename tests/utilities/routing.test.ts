import { routeMatches } from '../../src/framework/routing';

describe('Routing Utility tests', () => {
    it('Match valid and successful', () => {
        const result = routeMatches('/myapp/homepage', '/myapp/homepage');

        expect(result.isMatch).toEqual(true);
    });
    it('Match valid and unsuccessful', () => {
        const result = routeMatches('/myapp/homepage', '/myapp/dashboard');

        expect(result.isMatch).toEqual(false);
    });
    it('Wildcards in routes work', () => {
        const result = routeMatches('/myapp/*', '/myapp/1');

        expect(result.isMatch).toEqual(true);
    })
    it('Url parameters work as expected', () => {
        const result = routeMatches('/myapp/{username}/dashboard/{pageId}', '/myapp/john/dashboard/2');

        expect(result.isMatch).toEqual(true);
        
        const { urlParameters } = result;

        expect(urlParameters.username).toEqual('john');
        expect(urlParameters.pageId).toEqual('2');

    })
})