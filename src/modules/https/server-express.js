import dotenv from 'dotenv';
import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import url from 'url';
import helmet from 'helmet'; // Security middleware

// require('dotenv').config(); used with CommonJS traditional
dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Security middleware
app.use(helmet());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../../../public'), {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['html', 'htm'],
    index: 'index.html',
    maxAge: '1d',
    redirect: true
}));

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Secure Express Server</h1>');
});

app.get('/api/status', (req, res) => {
    res.json({
        status: 'operational',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// SSL/TLS options
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, process.env.SSL_KEY_PATH)),
    cert: fs.readFileSync(path.join(__dirname, process.env.SSL_CERT_PATH)),
    // Enable HTTP/2 if available
    allowHTTP1: true,
    // Recommended security options
    minVersion: 'TLSv1.2',
    ciphers: [
        'TLS_AES_256_GCM_SHA384',
        'TLS_CHACHA20_POLY1305_SHA256',
        'TLS_AES_128_GCM_SHA256',
        'ECDHE-RSA-AES128-GCM-SHA256',
        '!DSS',
        '!aNULL',
        '!eNULL',
        '!EXPORT',
        '!DES',
        '!RC4',
        '!3DES',
        '!MD5',
        '!PSK'
    ].join(':'),
    honorCipherOrder: true
};

// Create HTTPS Server
const PORT = process.env.PORT || 3000;
const server = https.createServer(sslOptions, app);

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Perfom cleanup and exit if needed
    process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);

    server.close(() => {
        console.log('HTTP server closed.');
        // Close database connections, etc.
        process.exit(0);
    });

    // Force close server after 10 seconds
    setTimeout(() => {
        console.error('Forcing shutdown...');
        process.exit(1);
    }, 1000);
};

// Listening for shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start the server
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => {
    console.log(`Express server running at https://${HOST}:${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Press Ctrl+C to stop the server');
});