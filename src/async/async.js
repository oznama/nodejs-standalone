const fs = require('fs');
const path = require('path');

console.log('1. Starting async read...');
fs.readFile(path.join(__dirname, '../../assets/lorem.txt'), 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('2. File contents:', data);
});

console.log('3. Done staring read operation');