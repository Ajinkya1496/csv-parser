const fs = require('fs');
const { Readable } = require('stream');

let options = {
    skipError: false,
    ignoreHeader: false,
}

function parser(filepath) {
    if(typeof filepath !== 'string') {
        throw new TypeError(`Expected string got ${typeof filepath}`);
    }

    let fileData;
    try {
        fileData = fs.readFileSync(filepath, {encoding: 'utf-8'});
    } catch(error) {
        throw new Error(`File not found ${filepath}`);
    }
    // let readStream = fs.createReadStream(filepath, {encoding: 'utf-8'});
    // readStream.on('data', function(chunk) {
    //     fileData += chunk;
    // });

    // readStream.on('end', function() {
    //     console.log(fileData);
    // })
    let allLines = fileData.split(/\r\n|\n/);

    let headersFields = allLines[0].split(',');
    let parsedData = [];

    let i = options.ignoreHeader === true? 0 : 1;

    for (; i<allLines.length; i++) {
        const data = allLines[i].split(',');
        if(options.ignoreHeader === true) {
            parsedData.push(data);
        } else {
            if (data.length === headersFields.length) {
                let obj = {};
                for (var j=0; j<headersFields.length; j++) {
                    obj[headersFields[j]] = data[j];
                }
                parsedData.push(obj);
            }
        }
    }
    return parsedData;
}

module.exports = parser;