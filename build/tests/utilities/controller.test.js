var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { AnodizedApp } from '../../src/configuration/app';
import axios, { AxiosError } from 'axios';
AnodizedApp({
    httpPort: 8080,
    sourceDirectory: 'example',
    runtimeType: 'node',
    onServerInitialised: function (_a) {
        var http = _a.http;
        testsComplete().then(function () {
            http.close();
        });
    }
});
var completeTests = 0;
var totalTests = 0;
var testsComplete = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                var itvl = setInterval(function () {
                    if (totalTests === completeTests) {
                        clearInterval(itvl);
                        resolve();
                    }
                }, 50);
            })];
    });
}); };
describe('Controller tests', function () {
    it('Request valid URL with correct request method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    totalTests++;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios({
                            url: 'http://localhost:8080/'
                        })];
                case 2:
                    resp = _a.sent();
                    expect(resp.status).toEqual(200);
                    expect(resp.data).toEqual('<h1>Hello world</h1>');
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    fail();
                    return [3 /*break*/, 4];
                case 4:
                    completeTests++;
                    return [2 /*return*/];
            }
        });
    }); });
    it('Request valid URL with incorrect request method that returns 404', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    totalTests++;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios({
                            url: 'http://localhost:8080/',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({})
                        })];
                case 2:
                    resp = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    if (e_2 instanceof AxiosError) {
                        expect(e_2.response.status).toEqual(404);
                    }
                    else {
                        fail();
                    }
                    return [3 /*break*/, 4];
                case 4:
                    completeTests++;
                    return [2 /*return*/];
            }
        });
    }); });
    it('Request valid URL with request method that returns JSON', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    totalTests++;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios({
                            url: 'http://localhost:8080/test',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({})
                        })];
                case 2:
                    resp = _a.sent();
                    expect(resp.status).toEqual(200);
                    expect(resp.data.success).toBeTruthy();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    fail();
                    return [3 /*break*/, 4];
                case 4:
                    completeTests++;
                    return [2 /*return*/];
            }
        });
    }); });
    it('Endpoint context building works', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    totalTests++;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios({
                            url: 'http://localhost:8080/name',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({
                                name: 'John Hudson'
                            })
                        })];
                case 2:
                    resp = _a.sent();
                    expect(resp.status).toEqual(200);
                    expect(resp.data.data.message).toEqual('Your name is John Hudson');
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    fail();
                    return [3 /*break*/, 4];
                case 4:
                    completeTests++;
                    return [2 /*return*/];
            }
        });
    }); });
});
