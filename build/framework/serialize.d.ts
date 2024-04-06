import { MimeType } from '../exports';
/**
 * Converts a response object into a string representation based on the specified MIME type.
 * @param {any} response - The response object to stringify.
 * @param {MimeType} mime - The MIME type of the response.
 * @returns {string} The string representation of the response.
 */
export declare const stringifyResponse: (response: any, mime: MimeType) => string;
