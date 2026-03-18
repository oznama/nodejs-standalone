import https from 'https';
import { URL } from 'url';

// Parse the URL
const url = new URL('https://127.0.0.1:8080/todos/1');

// Request options
const options = {
    hostname: url.hostname,
    port: 8080,
    path: url.pathname,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'MySecureApp/1.0'
    },
    rejectUnauthorized: false, // Disable certificate verification for self-signed certs (development only)
};

console.log(`Fetching data from ${url}`);

// Make the GET request
const req = https.get(options, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    if (statusCode !== 200) {
        console.error(`Redirect failed with status code: ${statusCode}`);
        res.resume(); // Consume response data to free up memory
        return;
    }

    if (!/^application\/json/.test(contentType)) {
        console.error(`Expected JSON but got ${contentType}`);
        res.resume();
        return;
    }
    
    let rawData = '';
    res.setEncoding('utf8');

    // Collect data chunks
    res.on('data', (chunk) => rawData += chunk);

    // Process the complete response
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log('Received data:', parsedData);
        } catch (e) {
            console.log('Error parsing JSON:', e.message);
        }
    });
});

// Handle errors
req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
});

// Set a timeout
req.setTimeout(10000, () => {
    console.error('Request timeout');
    req.destroy();
});