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
/**
 * Abstract class representing a security authorizer.
 */
var SecurityAuthorizer = /** @class */ (function () {
    function SecurityAuthorizer() {
    }
    /**
     * Generates an error response HTML, this can be overriden to output JSON for instance.
     * @param {string} code - The error code.
     * @param {string} message - The error message.
     * @returns {string} The error response HTML.
     */
    SecurityAuthorizer.prototype.errorResponse = function (code, message) {
        return "<h1>Error ".concat(code, "</h1><p>").concat(message, "</p>");
    };
    return SecurityAuthorizer;
}());
export { SecurityAuthorizer };
/**
 * Decorator factory for performing authorization checks before method execution.
 * @param {typeof SecurityAuthorizer} authorizer - The security authorizer class.
 * @param {string} [requiredPermission] - The required permission for the method.
 * @returns {Function} Decorator function.
 */
export var PreAuthorize = function (authorizer, requiredPermission) {
    return function (target, key, descriptor) {
        // Initialize authorizer if not already initialized
        if (!target.authorizer) {
            // @ts-ignore: Initializing authorizer dynamically
            target.authorizer = new authorizer();
        }
        var original = descriptor.value;
        target[key] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var params, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = args[0];
                            response = params.response;
                            return [4 /*yield*/, target.authorizer.isLoggedIn(params.headers)];
                        case 1:
                            // Check if user is logged in
                            if (!(_a.sent())) {
                                response.statusCode = 302;
                                response.setHeader('Location', target.authorizer.getLoginUrl());
                                return [2 /*return*/, target.authorizer.errorResponse('1', 'You are not logged in')];
                            }
                            if (!(target.authorizer.isRbacEnabled() && requiredPermission)) return [3 /*break*/, 3];
                            return [4 /*yield*/, target.authorizer.hasPermission(requiredPermission)];
                        case 2:
                            if (!(_a.sent())) {
                                response.statusCode = 403;
                                return [2 /*return*/, target.authorizer.errorResponse('2', 'You don\'t have the required permission to perform this action')];
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, original.apply(this, args)];
                        case 4: 
                        // Execute the original method
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
    };
};
