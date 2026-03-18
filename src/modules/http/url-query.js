import http from 'http';

const server = http.createServer((req, res) => {

    // Get the URL and HTTP method
    const { url, method } = req;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`You made a ${method} request to ${url}`);
})

// Start the server and listen on the specified port
server.listen(3000, 'localhost', () => {
    console.log(`Server running at http://localhost:3000/`);
});