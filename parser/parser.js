const fs = require('fs');
const readline = require('readline');

function parser(filepath, {ignoreHeader=false}) {
    if(typeof filepath !== 'string') {
        throw new TypeError(`Expected string got ${typeof filepath}`);
    }

    let fileData = '';
    try {
        fileData = fs.readFileSync(filepath, {encoding: 'utf-8'});
    } catch(error) {
        throw new Error(`File not found ${filepath}`);
    }
    
    let delimiter = detectDelimiter(fileData)[0];
    let allLines = fileData.split(/\r\n|\n/);

    let headersFields = allLines[0].split(delimiter);
    let parsedData = [];

    let i = ignoreHeader === true? 0 : 1;

    for (; i<allLines.length; i++) {
        const data = allLines[i].split(delimiter);
        if(ignoreHeader === true) {
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

function detectDelimiter(text) {
    let possibleDelimiters = [',',';','\t'];
    return possibleDelimiters.filter(filterOut);

    function filterOut(delimiter) {
        let cache = -1;
        return text.split('\n').every(checkLength);

        function checkLength (line) {
            if (!line) {
                return true;
            }
            let length = line.split(delimiter).length;
            if (cache < 0) {
                cache = length;
            }
            return cache === length && length > 1;
        }
    }
}

module.exports = parser;