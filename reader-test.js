// We load the built-in fs module
const fs = require('fs');

// We call readFile to read a file
fs.readFile('assets/lorem.txt', 'utf8', (err, data) => {
    // When the file is read, out callback functions runs
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content: ', data);
});

// Node.js continues to the next line while reading the file
console.log('Reading file... (this run first!)');