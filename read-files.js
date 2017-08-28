const { createReadStream } = require('fs');
const { Writable } = require('stream');
const { map, split } = require('event-stream');
const limitToTen = require('./limit-ten.js');

const userInput = process.argv[2] ? process.argv[2].toLowerCase() : null;
const writeStream = Writable();
//const worldListStream = createReadStream("/User/EmLem/AppData/Roaming/Microsoft/Spelling/en-US/default.dic");
const worldListStream = createReadStream("./en-US/en-US/en-US.dic");

writeStream._write = (word, _, next) => {
    const output = word || "No matching words found."
    process.stdout.write(output);
    next();
};


if (!userInput) {
    console.log('Usage: ./word-search [search term]');
    process.exit();
};

worldListStream
.pipe(split())
.pipe(map( (word, done ) => {
    word.toString().toLowerCase().includes(userInput) ? done(null, word+"\n"): done();
    })
)
//.pipe(limitToTen)
.pipe(writeStream)

worldListStream.on('end', function() {
    console.log("Finished reading that huge doc");
})