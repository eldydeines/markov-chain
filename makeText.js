/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const markov = require('./markov');

const argv = process.argv;



function fileText(path) {
    fs.readFile(path, 'utf-8', function (err, data) {
        if (err) {
            console.error("File Read Error", err);
            process.exit(1);
        }
        let mm = new markov.MarkovMachine(data);
        console.log(mm.makeText());
    })
}

async function webText(URL) {
    try {
        let resp = await axios.get(URL);
        let mm = new markov.MarkovMachine(`${resp}`);
        console.log(mm.makeText());
    }
    catch (err) {
        console.log("URL Read Error", err);
    }
}


if (argv[2] == "file") {
    fileText(argv[3]);
}
else if (argv[2] == "url") {
    webText(argv[3]);
}
else {
    console.log("Incorrect Command");
}