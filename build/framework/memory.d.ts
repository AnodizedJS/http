/**
 * Class representing a memory storage.
 */
export declare class Memory {
    private static self;
    private objects;
    /**
     * Private constructor to enforce singleton pattern.
     */
    private constructor();
    /**
     * Puts an object into memory with the specified key.
     * @param {string} key - The key to store the object.
     * @param {any} object - The object to store.
     */
    put(key: string, object: any): void;
    /**
     * Retrieves the object stored with the specified key from memory.
     * @param {string} key - The key of the object to retrieve.
     * @returns {any} The object stored with the specified key, or undefined if not found.
     */
    get(key: string): any;
    /**
     * Gets the singleton instance of the Memory class.
     * If the instance doesn't exist, it creates one.
     * @returns {Memory} The singleton instance of the Memory class.
     */
    static getInstance(): Memory;
}
