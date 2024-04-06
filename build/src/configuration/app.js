var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as http from 'http';
import * as https from 'https';
import { readFileSync, existsSync } from 'fs';
import { getTsFiles } from '../framework/utilities';
import { Memory } from '../framework/memory';
import { routeMatches } from '../framework/routing';
import { stringifyResponse } from '../framework/serialize';
import { parse } from '../framework/parsers';
/**
 * Initializes the Anodized application.
 * @param {ApplicationContextParameter} appContext - Application context parameters.
 */
export function AnodizedApp(appContext) {
    return __awaiter(this, void 0, void 0, function () {
        var memory, tsFiles, _i, tsFiles_1, file, handler, handleHttpRequest, nonSecureListener, secureListener;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Load the application and check if sourceDirectory is valid and exists.
                    if (appContext.sourceDirectory.length === 0) {
                        throw new ApplicationContextError('AppContext({ sourceDirectory }) cannot be empty');
                    }
                    if (!existsSync(appContext.sourceDirectory)) {
                        throw new ApplicationContextError("AppContext({ sourceDirectory: '".concat(appContext.sourceDirectory, "' }) the sourceDirectory doesn't exist"));
                    }
                    memory = Memory.getInstance();
                    memory.put('endpoints', []);
                    memory.put('controllers', []);
                    tsFiles = getTsFiles(appContext.sourceDirectory);
                    _i = 0, tsFiles_1 = tsFiles;
                    _a.label = 1;
                case 1:
                    if (!(_i < tsFiles_1.length)) return [3 /*break*/, 4];
                    file = tsFiles_1[_i];
                    if (appContext.verbose) {
                        console.log("[LOAD] ".concat(file));
                    }
                    return [4 /*yield*/, import("".concat(process.cwd(), "/").concat(file))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (appContext.verbose) {
                        console.log("[LOAD] Complete");
                    }
                    if (appContext.onTypescriptReady) {
                        // allow hooks in lifecycles.
                        appContext.onTypescriptReady();
                    }
                    handler = function (req, res, body) { return __awaiter(_this, void 0, void 0, function () {
                        var endpoints, handled;
                        return __generator(this, function (_a) {
                            endpoints = memory.get('endpoints');
                            handled = false;
                            endpoints.some(function (endpoint) {
                                var _a, _b;
                                var matchResult = routeMatches(endpoint.path, req.url);
                                if (endpoint.method === req.method.toUpperCase() && matchResult.isMatch) {
                                    handled = true;
                                    var classDefinition_1 = endpoint.class;
                                    var classMethod = endpoint.classMethod, consumes = endpoint.consumes;
                                    var controller = memory.get('controllers').find(function (instanceMap) { return instanceMap.constructor === classDefinition_1; });
                                    var data = parse(body, consumes !== null && consumes !== void 0 ? consumes : 'text/plain');
                                    var context = __assign(__assign(__assign({}, matchResult.urlParameters), data), { response: res, request: req });
                                    if (!controller) {
                                        res.writeHead(500, {
                                            'Content-Type': 'text/html'
                                        });
                                        console.error('The annotation that declares endpoints has been passed a class that isn\'t a controller, please add the @Controller decorator to that class to prevent this error');
                                        res.end('Internal server error');
                                        return true;
                                    }
                                    var instance = controller.instance;
                                    var result = instance[classMethod](context);
                                    res.setHeader('Content-Type', (_a = endpoint.produces) !== null && _a !== void 0 ? _a : 'text/html');
                                    if (result instanceof Promise) {
                                        result.then(function (response) {
                                            var _a;
                                            res.end(stringifyResponse(response, (_a = endpoint.produces) !== null && _a !== void 0 ? _a : 'text/html'));
                                        })
                                            .catch(function (reason) {
                                            res.end('<h2>Internal server error</h2>');
                                        });
                                    }
                                    else {
                                        res.end(stringifyResponse(result, (_b = endpoint.produces) !== null && _b !== void 0 ? _b : 'text/html'));
                                    }
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            });
                            if (!handled) {
                                res.writeHead(404);
                                res.end('404');
                            }
                            return [2 /*return*/];
                        });
                    }); };
                    handleHttpRequest = function (req, res) {
                        if (!req.method) {
                            res.end();
                            return;
                        }
                        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method.toUpperCase())) {
                            handler(req, res, '');
                            return;
                        }
                        var data = '';
                        req.on('data', function (chunk) { return data += chunk; });
                        req.on('end', function () {
                            handler(req, res, data);
                        });
                    };
                    nonSecureListener = http.createServer(handleHttpRequest);
                    nonSecureListener.listen(appContext.httpPort);
                    if (appContext.httpsPort) {
                        if (!appContext.certificate || !appContext.key) {
                            nonSecureListener.close();
                            throw new ApplicationContextError('No certificate or key file supplied');
                        }
                        secureListener = https.createServer({
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
                    }
                    else {
                        if (appContext.onServerInitialised) {
                            appContext.onServerInitialised({
                                http: nonSecureListener
                            });
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Custom error class for ApplicationContext errors.
 */
var ApplicationContextError = /** @class */ (function (_super) {
    __extends(ApplicationContextError, _super);
    function ApplicationContextError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApplicationContextError;
}(Error));
export { ApplicationContextError };
