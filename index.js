const parser =  require('./parser/parser');

let json = parser('./sample.csv', {ignoreHeader: false });

json.then(data => {
    console.log(data)
})

