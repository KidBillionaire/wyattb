const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the server
const server = http.createServer(function(request, response) {
    console.log('Request URL:', request.url);

    let filePath = '.' + request.url;
    if (filePath === './' || filePath === './app.js') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        // ... other MIME types as needed ...
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                response.writeHead(500);
                response.end('Sorry, an error occurred: ' + error.code + ' ..\n');
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

// Start the server on port 3000
server.listen(3000, function() {
    console.log('Server running at http://localhost:3000/');
});