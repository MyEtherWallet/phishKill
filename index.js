var webdriverio = require('webdriverio');
var cheerio = require('cheerio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

webdriverio
    .remote(options)
    .init()
    .url('http://www.google.com/search?q=myetherwallet')
    .getHTML('#tvcap').then(function(html) {
        var cont = cheerio.load(html)
        links = cont('a')
        links.each((idx, link)=>{
        	if(link.attribs.href)
        	console.log(link.attribs.href)
        })
    })
    .end()
    .init()
    .url('http://www.google.com/search?q=insurance')
    .end()
    .catch(function(err) {
        console.log(err);
    });