const fs = require('fs');
const path = require('path');

async function readFiles() {
    try {
        console.log('1. Starting to read files...');
        const data1 = await fs.promises.readFile(path.join(__dirname, '../../assets/file1.txt'), 'utf8');
        const data2 = await fs.promises.readFile(path.join(__dirname, '../../assets/file2.txt'), 'utf8');
        console.log('2. File read successfully!');
        return {data1, data2};
    } catch (error) {
        console.error('Error reading files:', error);
    }
}

readFiles().then(({data1, data2}) => {
    console.log('File 1 content:', data1);
    console.log('File 2 content:', data2);
});