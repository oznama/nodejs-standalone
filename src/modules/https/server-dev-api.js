import https from 'https';
import fs from 'fs';
import path from 'path';
import url, { URL } from 'url';
import { constants } from 'crypto';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store (for demostration)
let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build an API', completed: false }
]

// Path to your SSL/TLS certificate and key
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, '../../../certificate/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../../certificate/cert.pem')),
    // Enable all security features
    minVersion: 'TLSv1.2',
    // Recommended security settings
    secureOptions: constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1
}

// Create the HTTPS server
const server = https.createServer(sslOptions, (req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    console.log("===================================");
    console.log(`Atteding request ${method} ${url}`);
    // Security headers
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Handle different routes
    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Welcome to the Secure Server</h1><p>Your connection is encrypted!</p>');
    } else if (pathname === '/api/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    } else if (pathname.startsWith('/todos')) {
        // Route: GET
        if (method === 'GET') {
            const id = parseInt(pathname.split('/')[2]);
            if (id) {
                const index = todos.findIndex(t => t.id === id);
                if (index === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Todo not found' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(todos[index]));
                }
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(todos));
            }
        }
        // Route: POST
        else if (method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const newTodo = JSON.parse(body);
                    newTodo.id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
                    todos.push(newTodo);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newTodo));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
            });
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('404 Not Found');
    }
    console.log("===================================");
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
})

// Start the server on port 8080 (HTTPS default is 443 but requires root)
const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at https://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});