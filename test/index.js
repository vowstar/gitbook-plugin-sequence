/*jshint esversion: 8 */

var path = require('path');
var tester = require('honkit-tester');
var assert = require('assert');

var pkg = require('../package.json');

describe('sequence', function() {
    this.timeout(50000);
    it('should correctly replace by ```sequence``` tag', function() {
        return tester.builder()
            .withContent("\n```sequence\nTitle: Here is a title\nA->B: Normal line\nB-->C: Dashed line\nC->>D: Open arrow\nD-->>A: Dashed open arrow\n```")
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                plugins: ['sequence']
            })
            .create()
            .then(function(result) {
                const isSvg = require('is-svg');
                const svg = result[0].content.match(/<svg[^]*<\/svg>/m).toString();

                assert.equal(isSvg(svg), true);
                assert.equal(svg.includes('Here is a title'), true);
                assert.equal(svg.includes('Normal line'), true);
                assert.equal(svg.includes('Dashed line'), true);
                assert.equal(svg.includes('Dashed open arrow'), true);
            });
    });
    it('should correctly replace by ```sequence { width = 600, foo = "bar" }``` tag', function() {
        return tester.builder()
            .withContent('\n```sequence { width = 600, foo = "bar" }\n\nTitle: Here is a title\nA->B: Normal line\nB-->C: Dashed line\nC->>D: Open arrow\nD-->>A: Dashed open arrow\n\n```')
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                plugins: ['sequence']
            })
            .create()
            .then(function(result) {
                const isSvg = require('is-svg');
                const svg = result[0].content.match(/<svg[^]*<\/svg>/m).toString();

                assert.equal(isSvg(svg), true);
                assert.equal(svg.includes('Here is a title'), true);
                assert.equal(svg.includes('Normal line'), true);
                assert.equal(svg.includes('Dashed line'), true);
                assert.equal(svg.includes('Dashed open arrow'), true);
                assert.equal(svg.includes('width="600px"'), true);
            });
    });
    it('should correctly replace by {% sequence %} and endsequence {% endsequence %} tag', function() {
        return tester.builder()
            .withContent('\n{% sequence %}\nTitle: Here is a title\nA->B: Normal line\nB-->C: Dashed line\nC->>D: Open arrow\nD-->>A: Dashed open arrow\n{% endsequence %}')
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                plugins: ['sequence']
            })
            .create()
            .then(function(result) {
                const isSvg = require('is-svg');
                const svg = result[0].content.match(/<svg[^]*<\/svg>/m).toString();

                assert.equal(isSvg(svg), true);
                assert.equal(svg.includes('Here is a title'), true);
                assert.equal(svg.includes('Normal line'), true);
                assert.equal(svg.includes('Dashed line'), true);
                assert.equal(svg.includes('Dashed open arrow'), true);
            });
    });
});
