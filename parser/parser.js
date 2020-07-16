const fs = require('fs');

function parser(filepath) {
    let options = {
        skipError: false,
        ignoreHeader: false,
    }
    if(typeof filepath !== 'string') {
        throw new TypeError(`Expected string got ${typeof filepath}`);
    }
    // if file not found throw error
    let fileData;
    try {
        fileData = fs.readFileSync(filepath, {encoding: 'utf-8'});
    } catch(error) {
        throw new Error(`File not found ${filepath}`);
    }

    let allLines = fileData.split(/\r\n|\n/);

    let headersFields = allLines[0].split(',');
    let jsonData = [];
    
    for (let i=1; i<allLines.length; i++) {
        const data = allLines[i].split(',');
        if (data.length === headersFields.length) {
            let obj = {};
            for (var j=0; j<headersFields.length; j++) {
                obj[headersFields[j]] = data[j];
            }
            jsonData.push(obj);
        }
    }
    return jsonData;
}

module.exports = parser;