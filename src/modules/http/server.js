// HTTP Module

// Using CommonJS require (Node.js default)
// const http = require('http');

// Or using ES modules (Node.js 14+ with "type": "module" in package.json)
import http from 'http';

const server = http.createServer((req, res) => {

    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send the response body as 'Hello World!'
    res.end('<h1>Hello, World!</h1>');
})

// Define the port to listen on
const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});