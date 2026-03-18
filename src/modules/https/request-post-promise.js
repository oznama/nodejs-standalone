import https from 'https';
import { URL } from 'url';

function httpsRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';

            // Colect response data
            res.on('data', (chunk) => {
                responseData += chunk;
            });

            // Process complete response
            res.on('end', () => {
                try {
                    const contentType = res.headers['content-type'] || '';
                    const isJSON = /^application\/json/.test(contentType);

                    const response = {
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: isJSON ? JSON.parse(responseData) : responseData
                    };

                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(response);
                    } else {
                        const error = new Error(`Request failed with status code ${res.statusCode}`);
                        error.response = response;
                        reject(error);
                    }
                } catch (e) {
                    e.response = { data: responseData };
                    reject(e);
                }
            });
        });

        // Handle errors
        req.on('error', (e) => {
            reject(e);
        });

        // Set timeout
        req.setTimeout(options.timeout || 1000, () => {
            req.destroy(new Error('Request timeout'));
        });

        // Write data if provided
        if (data) {
            req.write(data);
        }

        // End the request
        req.end();
    });
}

// Example usage
async function fetchData() {
    try {
        const url = new URL('https://127.0.0.1:8080/todos/2');

        const options = {
            hostname: url.hostname,
            port: 8080,
            path: url.pathname,
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            rejectUnauthorized: false, // Disable certificate verification for self-signed certs (development only)
            timeout: 5000
        };

        const response = await httpsRequest(options);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

// Run the example
fetchData();