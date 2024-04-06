import { readdirSync, lstatSync } from 'fs';
/**
 * Matches files in a directory and its subdirectories based on a custom matcher function.
 * @param {string} directory - The directory path to search for files.
 * @param {Function} matcher - The function used to match files.
 * @returns {string[]} An array of matched file paths.
 */
export var matchFiles = function (directory, matcher) {
    var out = [];
    // Synchronously read the contents of the directory.
    readdirSync(directory)
        .forEach(function (entry) {
        var fullPath = "".concat(directory, "/").concat(entry);
        // Check if the entry is a directory.
        if (lstatSync(fullPath).isDirectory()) {
            // Recursively search subdirectories.
            out.push.apply(out, matchFiles(fullPath, matcher));
        }
        else {
            // Check if the entry matches the criteria specified by the matcher function.
            if (matcher(fullPath)) {
                out.push(fullPath);
            }
        }
    });
    return out;
};
/**
 * Gets files in a directory with a specific extension.
 * @param {string} directory - The directory path to search for files.
 * @param {string} extension - The file extension to filter by.
 * @returns {string[]} An array of file paths with the specified extension.
 */
export var getFilesByExtension = function (directory, extension) {
    return matchFiles(directory, function (file) { return file.endsWith(extension); });
};
/**
 * Gets TypeScript files in a directory.
 * @param {string} directory - The directory path to search for TypeScript files.
 * @returns {string[]} An array of TypeScript file paths.
 */
export var getTsFiles = function (directory) { return getFilesByExtension(directory, '.ts'); };
export var getTsxFiles = function (directory) { return getFilesByExtension(directory, '.tsx'); };
/**
 * Gets JavaScript files in a directory.
 * @param {string} directory - The directory path to search for JavaScript files.
 * @returns {string[]} An array of JavaScript file paths.
 */
export var getJsFiles = function (directory) { return getFilesByExtension(directory, '.js'); };
