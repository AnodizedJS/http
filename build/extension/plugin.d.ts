/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
export type BeforeResponseEvent = {
    outputBuffer: string;
    request: IncomingMessage;
    response: ServerResponse;
};
export type AnodizedPlugin = {
    onRequest?: (req: IncomingMessage) => void;
    onBeforeResponse?: (event: BeforeResponseEvent) => BeforeResponseEvent;
    onResponseSent?: () => void;
};
