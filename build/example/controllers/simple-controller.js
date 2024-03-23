var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Controller, Get, Post } from '../../src/exports';
var SimpleController = /** @class */ (function () {
    function SimpleController() {
    }
    SimpleController.prototype.showHomepage = function () {
        return '<h1>Hello world</h1>';
    };
    SimpleController.prototype.testApiResponse = function () {
        return {
            success: true,
            data: {
                isTestSuccess: true
            }
        };
    };
    __decorate([
        Get({ path: '/', produces: 'text/html' })
    ], SimpleController.prototype, "showHomepage", null);
    __decorate([
        Post({ path: '/test', produces: 'application/json' })
    ], SimpleController.prototype, "testApiResponse", null);
    SimpleController = __decorate([
        Controller()
    ], SimpleController);
    return SimpleController;
}());
