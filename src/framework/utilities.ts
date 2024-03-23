import { readdirSync, lstatSync } from 'fs';

/**
 * Matches files in a directory and its subdirectories based on a custom matcher function.
 * @param {string} directory - The directory path to search for files.
 * @param {Function} matcher - The function used to match files.
 * @returns {string[]} An array of matched file paths.
 */
export const matchFiles = (directory: string, matcher: (file: string) => boolean): string[] => {
    const out: string[] = [];

    // Synchronously read the contents of the directory.
    readdirSync(directory)
      .forEach((entry: string) => {
          const fullPath = `${directory}/${entry}`;
          
          // Check if the entry is a directory.
          if (lstatSync(fullPath).isDirectory()) {
              // Recursively search subdirectories.
              out.push(...matchFiles(fullPath, matcher));
          } else {
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
export const getFilesByExtension = (directory: string, extension: string): string[] =>
    matchFiles(directory, (file: string) => file.endsWith(extension));

/**
 * Gets TypeScript files in a directory.
 * @param {string} directory - The directory path to search for TypeScript files.
 * @returns {string[]} An array of TypeScript file paths.
 */
export const getTsFiles = (directory: string): string[] => getFilesByExtension(directory, '.ts');

/**
 * Gets JavaScript files in a directory.
 * @param {string} directory - The directory path to search for JavaScript files.
 * @returns {string[]} An array of JavaScript file paths.
 */
export const getJsFiles = (directory: string): string[] => getFilesByExtension(directory, '.js');
