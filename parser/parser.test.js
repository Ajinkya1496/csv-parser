const parser = require('./parser');

describe('API ignore headers.', () => {

    test('CSV data for ignoreHeader: true', async () => {
        return parser('./sample.csv', {ignoreHeader: true}).then(data => {
          expect(data).toEqual([
            [ 'id', ' name', ' marks' ],
            [ '1', 'Ajinkya', '20' ],
            [ '2', 'Hitman', '30' ],
            [ '3', 'Arfat', '40' ],
            [ '4', 'Aditya', '50' ]
          ]);
        });
      });

    test('CSV data for ignoreHeader: false', async () => {
        return parser('./sample.csv', {ignoreHeader: false}).then(data => {
          expect(data).toEqual([
            { id: '1', ' name': 'Ajinkya', ' marks': '20' },
            { id: '2', ' name': 'Hitman', ' marks': '30' },
            { id: '3', ' name': 'Arfat', ' marks': '40' },
            { id: '4', ' name': 'Aditya', ' marks': '50' }
          ]);
        });
      });
})