import { routeMatches } from '../../src/framework/routing';
describe('Routing Utility tests', function () {
    it('Match valid and successful', function () {
        var result = routeMatches('/myapp/homepage', '/myapp/homepage');
        expect(result.isMatch).toEqual(true);
    });
    it('Match valid and unsuccessful', function () {
        var result = routeMatches('/myapp/homepage', '/myapp/dashboard');
        expect(result.isMatch).toEqual(false);
    });
    it('Wildcards in routes work', function () {
        var result = routeMatches('/myapp/*', '/myapp/1');
        expect(result.isMatch).toEqual(true);
    });
    it('Url parameters work as expected', function () {
        var result = routeMatches('/myapp/{username}/dashboard/{pageId}', '/myapp/john/dashboard/2');
        expect(result.isMatch).toEqual(true);
        var urlParameters = result.urlParameters;
        expect(urlParameters.username).toEqual('john');
        expect(urlParameters.pageId).toEqual('2');
    });
});
