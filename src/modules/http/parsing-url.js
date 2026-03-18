import http from 'http';
import url from 'url';

const server = http.createServer((req, res) => {

    // Parse the URL
    const parsedUrl = url.parse(req.url, true);

    // Get different parts of the URL
    const pathname = parsedUrl.pathname; // The path without query string
    const query = parsedUrl.query; // The query string as an object

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        pathname,
        query,
        fullUrl: req.url
    }, null, 2));
})

// Start the server and listen on the specified port
server.listen(3000, 'localhost', () => {
    console.log(`Server running at http://localhost:3000/`);
});