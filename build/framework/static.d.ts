/// <reference types="node" />
import { ServerResponse } from 'http';
export declare const serveStatic: (response: ServerResponse, file: string) => Promise<void>;
