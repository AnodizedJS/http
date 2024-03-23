var Memory = /** @class */ (function () {
    function Memory() {
        this.objects = {};
        Memory.self = this;
    }
    Memory.prototype.put = function (key, object) {
        this.objects[key] = object;
    };
    Memory.prototype.get = function (key) {
        return this.objects[key];
    };
    Memory.getInstance = function () {
        var _a;
        return (_a = Memory.self) !== null && _a !== void 0 ? _a : new Memory();
    };
    Memory.self = null;
    return Memory;
}());
export { Memory };
