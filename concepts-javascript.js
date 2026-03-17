/*
Variables and Functions
*/

// Variables (let, const, var)
let nameNode = 'Node.js';
const version = 20;

// Function declaration
function greet(user) {
    return `Hello, ${user}!`;
}

// Arrow function (ES6+)
const add = (a, b) => a + b;

console.log(greet('Oziel Naranjo')); // Hello, Oziel Naranjo!
console.log(add(20, 7)); // 27

/*
Objects and Arrays
*/

// Object
const user = {
    name: 'Oziel',
    age: 39,
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
};

// Array
const colors = ['red', 'green', 'blue'];

// Array methods (ES6+)
colors.forEach(color => console.log(color));
const lengths = colors.map(color => color.length);
console.log(lengths);


/*
Asynchronous JavaScript
*/

// 1. Callbacks (traditional)
function fetchData(callback) {
    setTimeout(() => {
        callback('Data received!');
    }, 1000);
}

fetchData(data => console.log(data));

// 2. Promises (ES6+)
const fetchDataPromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Promise resolved!')
        }, 1000);
    });
};

// 3. Async/Await (ES8+)
async function getData() {
    const result = await fetchDataPromise();
    console.log(result);
}

getData(); // Call the async function


/*
Destructuring & Template Literals (ES6+)
*/
const { name } = user;
console.log(`Hello again, ${name}!`);

/*
Exercise
*/
async function fetchData() {
    return await Promise.resolve('Hello now from fetchData!');
}

fetchData().then(data => console.log(data));