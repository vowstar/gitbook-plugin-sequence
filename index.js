/*jshint esversion: 8 */

var path = require('path');
var puppeteer = require('puppeteer');
var Q = require('q');

function processBlock(blk) {
    var deferred = Q.defer();

    var book = this;
    var code = blk.body;
    var config = book.config.get('pluginsConfig.sequence', {});

    var width = blk.kwargs.width;
    var height = 'Reserved';

    (async (code, config, width, height) => {
        const browser = await puppeteer.launch({
            args: ['--disable-dev-shm-usage', '--no-sandbox', '--allow-file-access-from-files', '--enable-local-file-accesses']
        });
        const page = await browser.newPage();

        const htmlFile = path.join(__dirname, 'renderer.html');
        await page.goto("file://" + htmlFile, { waitUntil: 'networkidle2' });

        xCode = encodeURIComponent(code);
        xConfig = encodeURIComponent(JSON.stringify(config));
        xWidth = encodeURIComponent(width);
        xHeight = encodeURIComponent(height);

        /* istanbul ignore next */
        var result = await page.evaluate(
            `(async() => {
                        code = decodeURIComponent("${xCode}");
                        config = JSON.parse(decodeURIComponent("${xConfig}"));
                        width = decodeURIComponent("${xWidth}");
                        height = decodeURIComponent("${xHeight}");
                        return render(code, config, width);
                 })()`
        );

        await browser.close();

        return result;
    })(code, config, width, height).then(
        function (result) {
            deferred.resolve(result);
        }
    );

    return deferred.promise;
}

module.exports = {
    blocks: {
        sequence: {
            process: processBlock
        }
    },
    hooks: {
        // Init plugin and read config
        "init": function () {
            if (!Object.keys(this.book.config.get('pluginsConfig.sequence', {})).length) {
                this.book.config.set('pluginsConfig.sequence', {
                    'theme': 'simple'
                });
            }
        },
        // Before parsing markdown
        "page:before": function (page) {
            // Get all code texts
            flows = page.content.match(/```(\x20|\t)*(sequence)((.*[\r\n]+)+?)?```/igm);
            // Begin replace
            if (flows instanceof Array) {
                for (var i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(
                        flows[i],
                        flows[i]
                            .replace(/```(\x20|\t)*(sequence)[ \t]+{(.*)}/i,
                                function (matchedStr) {
                                    if (!matchedStr)
                                        return "";
                                    var newStr = "";
                                    var modeQuote = false;
                                    var modeArray = false;
                                    var modeChar = false;
                                    var modeEqual = false;
                                    // Trim left and right space
                                    var str = matchedStr.replace(/^\s+|\s+$/g, "");
                                    // Remove ```sequence header
                                    str = str.replace(/```(\x20|\t)*(sequence)/i, "");

                                    // Build new str
                                    for (var i = 0; i < str.length; i++) {
                                        if (str.charAt(i) == "\"") {
                                            modeQuote = !modeQuote;
                                            modeChar = true;
                                            newStr += str.charAt(i);
                                            continue;
                                        }
                                        if (str.charAt(i) == "[") {
                                            modeArray = true;
                                            newStr += str.charAt(i);
                                            continue;
                                        }
                                        if (str.charAt(i) == "]") {
                                            modeArray = false;
                                            newStr += str.charAt(i);
                                            continue;
                                        }
                                        if (modeQuote || modeArray) {
                                            // In quote, keep all string
                                            newStr += str.charAt(i);
                                        } else {
                                            // Out of quote, process it
                                            if (str.charAt(i).match(/[A-Za-z0-9_]/)) {
                                                modeChar = true;
                                                newStr += str.charAt(i);
                                            } else if (str.charAt(i).match(/[=]/)) {
                                                modeEqual = true;
                                                modeChar = false;
                                                newStr += str.charAt(i);
                                            } else if (modeChar && modeEqual) {
                                                modeChar = false;
                                                modeEqual = false;
                                                newStr += ",";
                                            }
                                        }
                                    }

                                    newStr = newStr.replace(/,$/, "");

                                    return "{% sequence " + newStr + " %}";
                                })
                            .replace(/```(\x20|\t)*(sequence)/i, '{% sequence %}')
                            .replace(/```/, '{% endsequence %}')
                    );
                }
            }
            return page;
        }
    }
};
