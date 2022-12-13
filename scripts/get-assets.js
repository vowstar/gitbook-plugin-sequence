var fs = require('fs');
var path = require('path');

var download = require('./download');

var PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');
var raphaelVersion = require(PACKAGE_JSON_PATH).raphaelVersion;

var ASSETS_DIR_PATH = path.join(__dirname, '../assets');
var RAPHAEL_PATH = path.join(ASSETS_DIR_PATH, 'raphael.min.js');
var SEQUENCE_PATH = path.join(ASSETS_DIR_PATH, 'sequence-diagram-min.js');
var SNAPSVG_PATH = path.join(ASSETS_DIR_PATH, 'snap.svg-min.js');
var UNDERSCORE_PATH = path.join(ASSETS_DIR_PATH, 'underscore-min.js');
var WEBFONT_PATH = path.join(ASSETS_DIR_PATH, 'webfont.js');

var RAPHAEL_URL = 'https://cdnjs.cloudflare.com/ajax/libs/raphael' + '/' + raphaelVersion + '/raphael.min.js';
var SEQUENCE_URL = 'https://bramp.github.io/js-sequence-diagrams/js/sequence-diagram-min.js';
var SNAPSVG_URL = 'https://bramp.github.io/js-sequence-diagrams/js/snap.svg-min.js';
var UNDERSCORE_URL = 'https://bramp.github.io/js-sequence-diagrams/js/underscore-min.js';
var WEBFONT_URL = 'https://bramp.github.io/js-sequence-diagrams/js/webfont.js';

console.log('Downloading asserts ...');
download(RAPHAEL_URL, RAPHAEL_PATH, true);
download(SEQUENCE_URL, SEQUENCE_PATH, true);
download(SNAPSVG_URL, SNAPSVG_PATH, true);
download(UNDERSCORE_URL, UNDERSCORE_PATH, true);
download(WEBFONT_URL, WEBFONT_PATH, true);



