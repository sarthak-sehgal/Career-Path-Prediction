var request = require('request');
var cheerio = require('cheerio');

request('https://www.linkedin.com/company/bseindia/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        console.log(html);
    }
    if(error) {
        console.log("Error!");
    }
    if(response.statusCode !== 200) {
        console.log(response.statusCode);
    }
});