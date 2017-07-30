var request = require('request');
var csv = require('csvtojson');



var thing = csv()
  .fromStream(request.get('http://mywebsite.com/mycsvfile.csv'))
  .on('csv', (csvRow) => {
    // csvRow is an array 
  })
  .on('done', (error) => {

  })
