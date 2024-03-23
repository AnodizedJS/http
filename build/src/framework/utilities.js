import * as fs from 'fs';
export var matchFiles = function (directory, matcher) {
    var out = [];
    fs.readdirSync(directory)
        .forEach(function (entry) {
        if (fs.lstatSync("".concat(directory, "/").concat(entry)).isDirectory()) {
            out.push.apply(out, matchFiles("".concat(directory, "/").concat(entry), matcher));
        }
        else {
            if (matcher("".concat(directory, "/").concat(entry))) {
                out.push("".concat(directory, "/").concat(entry));
            }
        }
    });
    return out;
};
// basic wrapper of matchFiles.
export var getFilesByExtension = function (directory, extension) { return matchFiles(directory, function (file) { return file.endsWith(extension); }); };
// preset methods.
export var getTsFiles = function (directory) { return getFilesByExtension(directory, '.ts'); };
export var getJsFiles = function (directory) { return getFilesByExtension(directory, '.js'); };
