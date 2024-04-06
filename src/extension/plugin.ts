import { IncomingMessage, ServerResponse } from 'http'

export type BeforeResponseEvent = {
    outputBuffer: string,
    request: IncomingMessage,
    response: ServerResponse
}

export type AnodizedPlugin = {
    /* 
        listen to the incoming request and perform an action, use cases include (not limited to)
        - analytics
        - ip blacklisting/whitelisting
        - reporting
    */
    onRequest?: (req: IncomingMessage) => void;
    /*
       listen to the server being ready to fire the response, allow response modification too.
       - inject CSS & JS 
       - run any necessary cleaning operations
       - dead link analysis etc..
    */
    onBeforeResponse?: (event: BeforeResponseEvent) => BeforeResponseEvent;

    onResponseSent?: () => void;
}