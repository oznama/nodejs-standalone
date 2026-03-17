let http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World from http module!');
}).listen(8080);

console.log('Server running at http://localhost:8080/');