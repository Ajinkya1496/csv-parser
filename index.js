const parser =  require('./parser/parser');

let json = parser('./sample.csv')

console.log(json);