// 1. Standard JavaScript Errors 

// SyntaxError
// JSON.parse('{invalid json}');

// TypeError
// null.someProperty;

// ReferenceError
// unknownVariable;


// 2. System Errors

// ENOENT: No such file or directory
const fs = require('fs');
fs.readFile('nonexistent.txt', (error) => {
    console.error(error.code); // 'ENOENT'
});

// ECONNREFUSED: Connection refused
const http = require('http');
const req = http.get('http://nonexistent-site.com', (res) => {});
req.on('error', (error) => {
    console.log(error.code); // 'ECONNREFUSED' or 'ENOTFOUND'
});