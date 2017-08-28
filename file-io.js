// const { readFileSync } = require('fs');

// console.log(readFileSync(process.argv[2]).toString());

const { readFile } = require('fs');

readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});