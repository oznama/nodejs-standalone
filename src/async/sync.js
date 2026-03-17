const fs = require('fs');
const path = require('path');

console.log('1. Starting sync read...');
const data = fs.readFileSync(path.join(__dirname, '../../assets/lorem.txt'), 'utf-8');
console.log('2. File contents:', data);
console.log('3. Done reading file');