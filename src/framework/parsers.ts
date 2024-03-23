import { parse as qsParse } from 'querystring';
import { MimeType } from '../exports';

/**
 * Parses data based on the specified MIME type.
 * @param {string} data - The data to parse.
 * @param {MimeType} mime - The MIME type of the data.
 * @returns {any} The parsed data.
 */
export function parse(data: string, mime: MimeType): any {
    switch (mime) {
        case 'application/json':
            return JSON.parse(data);
        case 'application/x-www-form-urlencoded':
            return qsParse(data);
        default:
            return { data };
    }
}
