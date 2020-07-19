const fs = require("fs");

function parser(filepath, { ignoreHeader = false, ignoreErrors = true }) {
  console.log(ignoreErrors);
  if (typeof filepath !== "string") {
    throw new TypeError(`Expected string got ${typeof filepath}`);
  }
  return new Promise((resolve) => {
    let fileData = "";
    let readStream = fs.createReadStream(filepath, { encoding: "utf-8" });
    readStream.on("data", (chunk) => {
      fileData += chunk;
    });

    readStream.on("end", () => {
      let delimiter = detectDelimiter(fileData)[0];
      let allLines = fileData.split(/\r\n|\n/);
      let headersFields = allLines[0].split(delimiter);

      const headersFieldsLength = headersFields[0].split(";").length;

      let parsedData = [];
      let i = ignoreHeader === true ? 0 : 1;
      for (; i < allLines.length; i++) {
        const data = allLines[i].split(delimiter);
        let dataLength = data[0].split(";").length;
        if (headersFieldsLength !== dataLength) {
          if (ignoreErrors) continue;
          else parsedData.push(["error"]);
        } else if (ignoreHeader === true) {
          parsedData.push(data);
        } else {
          if (data.length === headersFields.length) {
            let obj = {};
            for (var j = 0; j < headersFields.length; j++) {
              obj[headersFields[j]] = data[j];
            }
            parsedData.push(obj);
          }
        }
      }
      resolve(parsedData);
    });
  });
}

function detectDelimiter(text) {
  let possibleDelimiters = [",", ";", "\t"];
  return possibleDelimiters.filter(filterOut);

  function filterOut(delimiter) {
    let cache = -1;
    return text.split("\n").every(checkLength);

    function checkLength(line) {
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
