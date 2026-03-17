const fs = require('fs').promises;
const path = require('path');

async function readFile() {
    try {
        const data = await fs.readFile(path.join(__dirname, '../../assets/lorem.txt'), 'utf8');
        console.log(data);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile();