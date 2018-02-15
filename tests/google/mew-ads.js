const MAX_PROXIES = 10
var webdriverio = require('webdriverio')
var cheerio = require('cheerio')
var url = require('url')
var appRoot = require('app-root-path')
var shuffle = require('shuffle-array')
var proxies = shuffle(require('../../config/proxies.json')).slice(0, MAX_PROXIES)
var searchTerms = require('../../config/configs.json').googleSearch.terms
var searchPath = require('../../config/configs.json').googleSearch.path
const loggerOptions = {
    logDirectory: appRoot + '/logs',
    fileNamePattern: 'google-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
}
const log = require('simple-node-logger').createRollingFileLogger(loggerOptions)
console.log(appRoot)
var next = (i) => {
    if (proxies.length > i) {
        var curP = proxies[i]
        curP = url.parse(curP)
        runner(i, {
            desiredCapabilities: {
                proxy: {
                    proxyType: 'MANUAL',
                    httpProxy: curP.host,
                    sslProxy: curP.host
                },
                browserName: 'chrome'
            }
        })
    } else {
    	process.exit()
    }
}
var runner = (i, options) => {
    var count = searchTerms.length
    var browser = webdriverio.remote(options)
    browser.on('next', (_i) => {
        next(_i + 1)
    })
    var runAllSearch = (_browser) => {
        return new Promise((resolve) => {
            let searcher = (_i) => {
                if (_i == count) {
                    resolve()
                } else {
                    _sterm = searchTerms[_i]
                    _i++
                    _browser.url(searchPath + '?q=' + _sterm).then(() => {
                        if (_browser.isExisting('#tvcap')) {
                            _browser.getHTML('#tvcap').then((html) => {
                                var cont = cheerio.load(html)
                                links = cont('a')
                                links.each((idx, link) => {
                                    if (link.attribs.href)
                                        log.info('Ad Found ', link.attribs.href, ' found at ', new Date().toJSON());
                                })

                            })
                        }
                        searcher(_i)
                    })
                }
            }
            searcher(0)
        })
    }
    browser
        .init().then(() => {
            runAllSearch(browser).then(() => {
                browser
                    .end()
                    .emit('next', i)
            })
        })
        .catch(function(err) {
            console.log(err);
        });

}
next(0)