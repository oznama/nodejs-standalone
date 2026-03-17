const fs = require('fs');
const path = require('path');

console.log('Before file read');
fs.readFile(path.join(__dirname, '../../assets/lorem.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File contents:', data);
});
console.log('After file read');