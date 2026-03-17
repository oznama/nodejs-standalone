const fs = require('fs');
const path = require('path');
const promise1 = Promise.resolve('First result');
const promise2 = new Promise((resolve) => setTimeout(() => resolve('Second result'), 1000));
const promise3 = fs.promises.readFile(path.join(__dirname, '../../assets/lorem.txt'), 'utf8'); // Read local file instead of fetch

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log('Results', results);
        // results[0] is from promise1
        // results[1] is from promise2
        // results[2] is the content of lorem.txt
    })
    .catch(error => {
        console.error('Error in  one of the promises:', error);
    });
