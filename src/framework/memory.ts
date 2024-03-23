/**
 * Class representing a memory storage.
 */
export class Memory {
    private static self: Memory | null = null;
    private objects: Record<string, any> = {};

    /**
     * Private constructor to enforce singleton pattern.
     */
    private constructor() {
        Memory.self = this;
    }

    /**
     * Puts an object into memory with the specified key.
     * @param {string} key - The key to store the object.
     * @param {any} object - The object to store.
     */
    public put(key: string, object: any): void {
        this.objects[key] = object;
    }

    /**
     * Retrieves the object stored with the specified key from memory.
     * @param {string} key - The key of the object to retrieve.
     * @returns {any} The object stored with the specified key, or undefined if not found.
     */
    public get(key: string): any {
        return this.objects[key];
    }
    
    /**
     * Gets the singleton instance of the Memory class.
     * If the instance doesn't exist, it creates one.
     * @returns {Memory} The singleton instance of the Memory class.
     */
    public static getInstance(): Memory {
        return Memory.self ?? (Memory.self = new Memory());
    }
}
