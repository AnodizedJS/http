import { createReadStream, readFileSync } from 'fs';
import { ServerResponse } from 'http';
import { extname } from 'path';


export const serveStatic = async (response: ServerResponse, file: string) => {
    
    return new Promise<void>((resolve, reject) => {
        const ext = extname(file);
        let isBinary: boolean = false;
        if (
            [".png", ".jpeg", ".jpg", ".webp", ".avif", ".gif", ".bmp", ".jiff"].includes(ext)
        ) 
        {
            response.setHeader('Content-Type', 'image/' + ext.replace('.', ''));
            isBinary = true;
        }
        else if (
            [".ogg", ".mp4", ".mov", ".flv", ".avi", ".webm"].includes(ext)
        )
        {
            response.setHeader('Content-Type', 'video/' + ext.replace('.', ''));
            isBinary = true;
        }
        else if (
            [".js", ".json"].includes(ext)
        )
        {
            response.setHeader('Content-Type', 'application/' + ext.replace('.', ''));
        }
        else 
        {
            response.setHeader('Content-Type', 'text/' + ext.replace('.', ''));
        }

        if (isBinary) {
            const stream = createReadStream(file);

            stream.on('open', () => {
                stream.pipe(response);
            })
            stream.on('end', () => {
                response.end();
                resolve();
            });
        } else {
            response.end(readFileSync(file, 'utf-8'));
            resolve();
        }
    });
}