## CSV Parser

Converts csv data to json. Automatically detects the delimeter of the csv data.<br>
Currently limited to detect only from `,` `;` `\t`.

## Usage

```es
const parser = require('parser');

let jsonData = parser('sample.csv');

console.log(jsonData);

```

## Options
| Property | Description | Default
|----------|:-----------:|-------:|
|`skipHeader: boolean` | Gives an option to skip<br>headers while parsing the data | false
| `callback: function` | If a callback function is passed<br>the callback is called with the result | NA
