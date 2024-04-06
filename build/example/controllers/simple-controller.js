var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Controller, Get, Post } from '../../src/exports';
/**
 * Controller for handling HTTP requests.
 */
var SimpleController = /** @class */ (function () {
    function SimpleController() {
    }
    /**
     * Handler for GET requests to the homepage.
     * @returns {string} HTML content for the homepage.
     */
    SimpleController.prototype.showHomepage = function () {
        return '<h1>Hello world</h1>';
    };
    /**
     * Handler for POST requests to '/test'.
     * @returns {object} JSON response indicating success.
     */
    SimpleController.prototype.testApiResponse = function () {
        return {
            success: true,
            data: {
                isTestSuccess: true
            }
        };
    };
    /**
     * Handler for POST requests to '/name'.
     * @param {object} params - Request parameters containing 'name'.
     * @param {string} params.name - The name sent in the request.
     * @returns {object} JSON response with a personalized message.
     */
    SimpleController.prototype.testInjectResponse = function (_a) {
        var name = _a.name;
        return {
            success: true,
            data: {
                message: 'Your name is ' + name
            }
        };
    };
    __decorate([
        Get({ path: '/', produces: 'text/html' })
    ], SimpleController.prototype, "showHomepage", null);
    __decorate([
        Post({ path: '/test', produces: 'application/json' })
    ], SimpleController.prototype, "testApiResponse", null);
    __decorate([
        Post({ path: '/name', produces: 'application/json', consumes: 'application/json' })
    ], SimpleController.prototype, "testInjectResponse", null);
    SimpleController = __decorate([
        Controller()
    ], SimpleController);
    return SimpleController;
}());
