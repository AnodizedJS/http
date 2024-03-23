import { Controller, Get, Post } from '../../src/exports';

/**
 * Controller for handling HTTP requests.
 */
@Controller()
class SimpleController {
    /**
     * Handler for GET requests to the homepage.
     * @returns {string} HTML content for the homepage.
     */
    @Get({ path: '/', produces: 'text/html' })
    public showHomepage(): string {
        return '<h1>Hello world</h1>';
    }

    /**
     * Handler for POST requests to '/test'.
     * @returns {object} JSON response indicating success.
     */
    @Post({ path: '/test', produces: 'application/json' })
    public testApiResponse(): object {
        return {
            success: true,
            data: {
                isTestSuccess: true
            }
        };
    }

    /**
     * Handler for POST requests to '/name'.
     * @param {object} params - Request parameters containing 'name'.
     * @param {string} params.name - The name sent in the request.
     * @returns {object} JSON response with a personalized message.
     */
    @Post({ path: '/name', produces: 'application/json', consumes: 'application/json' })
    public testInjectResponse({ name }: { name: string }): object {
        return {
            success: true,
            data: {
                message: 'Your name is ' + name
            }
        };
    }
}
