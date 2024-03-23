export declare class Memory {
    private static self;
    private objects;
    private constructor();
    put(key: string, object: any): void;
    get(key: string): any;
    static getInstance(): Memory;
}
