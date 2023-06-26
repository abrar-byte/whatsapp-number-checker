const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
const myArray = JSON.parse(data);

console.log(myArray);