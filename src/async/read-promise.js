const fs = require('fs');
const path = require('path');

console.log('1, Reading file...');
fs.promises.readFile(path.join(__dirname, '../../assets/lorem.txt'), 'utf8')
    .then(data => {
        console.log('3. File content: ', data);
    })
    .catch(err => console.error('Error:', err));

console.log('2. This runs before file is read!');