const fs = require('fs');

const myArray = [1, 2, 3, 4, 5];

fs.writeFileSync('data.txt', JSON.stringify(myArray));