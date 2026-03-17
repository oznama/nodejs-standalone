async function myFunction() {
    return 'Hello';
}

const result = myFunction();
console.log(result); // Promise { 'Hello }

myFunction().then(message => console.log(message)); // Hello

result.then(message => console.log(message)); // Hello

// This is a error
// const result2 = await myFunction();
// console.log(result2); // Hello


// Avoid mixing async/await with callbacks
// Convert callback-based functions to Promise using util.promisify or custom wrappers.
const util = require('util');
const fs = require('fs');
const path = require('path');

// Convert callback-based function to Promise-based
const readFile = util.promisify(fs.readFile);

async function readFileContents() {
    const data = await readFile(path.join(__dirname, '../../assets/lorem.txt'), 'utf8');
    return data;
}
const fileData = readFileContents();
fileData.then(data => console.log('Data:', data));