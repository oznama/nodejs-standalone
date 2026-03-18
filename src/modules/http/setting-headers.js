import http from 'http';

const server = http.createServer((req, res) => {

    // Set status code and multiple headers
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'X-Powered-By': 'Node.js',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': 'sessionid=abc123; HttpOnly'
    });

    // Send the response body as 'Hello World!'
    res.end('<h1>Hello, World!</h1>');
})

// Define the port to listen on
const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});