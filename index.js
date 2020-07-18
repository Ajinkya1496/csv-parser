const parser =  require('./parser/parser');

let json = parser('./sample.csv', {ignoreHeader: true});

console.log(json);