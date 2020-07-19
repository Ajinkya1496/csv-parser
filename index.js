const parser =  require('./parser/parser');

let json = parser('./sample.csv', {ignoreHeader: true , ignoreErrors:true});
json.then(data => {
    console.log("Result\n", data);
})