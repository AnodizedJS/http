/**
 * Class representing a memory storage.
 */
var Memory = /** @class */ (function () {
    /**
     * Private constructor to enforce singleton pattern.
     */
    function Memory() {
        this.objects = {};
        Memory.self = this;
    }
    /**
     * Puts an object into memory with the specified key.
     * @param {string} key - The key to store the object.
     * @param {any} object - The object to store.
     */
    Memory.prototype.put = function (key, object) {
        this.objects[key] = object;
    };
    /**
     * Retrieves the object stored with the specified key from memory.
     * @param {string} key - The key of the object to retrieve.
     * @returns {any} The object stored with the specified key, or undefined if not found.
     */
    Memory.prototype.get = function (key) {
        return this.objects[key];
    };
    /**
     * Gets the singleton instance of the Memory class.
     * If the instance doesn't exist, it creates one.
     * @returns {Memory} The singleton instance of the Memory class.
     */
    Memory.getInstance = function () {
        var _a;
        return (_a = Memory.self) !== null && _a !== void 0 ? _a : (Memory.self = new Memory());
    };
    Memory.self = null;
    return Memory;
}());
export { Memory };
