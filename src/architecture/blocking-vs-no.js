const fs = require('fs');
const path = require('path');

// Blocking code example
console.log('Start of blocking code');
const data = fs.readFileSync(path.join(__dirname, '../../assets/lorem.txt'), 'utf8'); // Blocks here
console.log('Blocking operation completed');

// No-blocking code example
console.log('Start of non-blocking code');
fs.readFile(path.join(__dirname, '../../assets/lorem.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Non-blocking operation completed');
});
console.log('This runs before the file is read');