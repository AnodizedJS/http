/**
 * Matches files in a directory and its subdirectories based on a custom matcher function.
 * @param {string} directory - The directory path to search for files.
 * @param {Function} matcher - The function used to match files.
 * @returns {string[]} An array of matched file paths.
 */
export declare const matchFiles: (directory: string, matcher: (file: string) => boolean) => string[];
/**
 * Gets files in a directory with a specific extension.
 * @param {string} directory - The directory path to search for files.
 * @param {string} extension - The file extension to filter by.
 * @returns {string[]} An array of file paths with the specified extension.
 */
export declare const getFilesByExtension: (directory: string, extension: string) => string[];
/**
 * Gets TypeScript files in a directory.
 * @param {string} directory - The directory path to search for TypeScript files.
 * @returns {string[]} An array of TypeScript file paths.
 */
export declare const getTsFiles: (directory: string) => string[];
export declare const getTsxFiles: (directory: string) => string[];
/**
 * Gets JavaScript files in a directory.
 * @param {string} directory - The directory path to search for JavaScript files.
 * @returns {string[]} An array of JavaScript file paths.
 */
export declare const getJsFiles: (directory: string) => string[];
