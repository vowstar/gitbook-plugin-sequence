#!/usr/bin/env node
/*jshint esversion: 8 */

const path = require('path');
const fs = require('fs');
const download = require('./download');

const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');
const { raphaelVersion, sequenceVersion, snapsvgVersion, underscoreVersion, webfontVersion } = require(PACKAGE_JSON_PATH);

const ASSETS_DIR_PATH = path.join(__dirname, '../assets');
const assets = [
  {
    name: 'Raphael',
    path: path.join(ASSETS_DIR_PATH, 'raphael.min.js'),
    version: raphaelVersion,
    url: `https://cdnjs.cloudflare.com/ajax/libs/raphael/${raphaelVersion}/raphael.min.js`,
    verFile: path.join(ASSETS_DIR_PATH, 'raphael')
  },
  {
    name: 'Sequence Diagram',
    path: path.join(ASSETS_DIR_PATH, 'sequence-diagram-min.js'),
    version: sequenceVersion,
    url: `https://bramp.github.io/js-sequence-diagrams/js/sequence-diagram-min.js`,
    verFile: path.join(ASSETS_DIR_PATH, 'sequence-diagram')
  },
  {
    name: 'Snap.svg',
    path: path.join(ASSETS_DIR_PATH, 'snap.svg-min.js'),
    version: snapsvgVersion,
    url: `https://cdnjs.cloudflare.com/ajax/libs/snap.svg/${snapsvgVersion}/snap.svg-min.js`,
    verFile: path.join(ASSETS_DIR_PATH, 'snap-svg')
  },
  {
    name: 'Underscore',
    path: path.join(ASSETS_DIR_PATH, 'underscore-min.js'),
    version: underscoreVersion,
    url: `https://cdnjs.cloudflare.com/ajax/libs/underscore.js/${underscoreVersion}/underscore-min.js`,
    verFile: path.join(ASSETS_DIR_PATH, 'underscore')
  },
  {
    name: 'Webfont',
    path: path.join(ASSETS_DIR_PATH, 'webfont.js'),
    version: webfontVersion,
    url: `https://cdnjs.cloudflare.com/ajax/libs/webfont/${webfontVersion}/webfontloader.js`,
    verFile: path.join(ASSETS_DIR_PATH, 'webfont')
  }
];

if (!fs.existsSync(ASSETS_DIR_PATH)) {
  fs.mkdirSync(ASSETS_DIR_PATH, { recursive: true });
}

async function downloadAssets() {
  for (const asset of assets) {
    console.info(`Downloading ${asset.name} ${asset.version}...`);
    try {
      if (!fs.existsSync(asset.verFile) || !fs.existsSync(asset.path)) {
        await download(asset.url, asset.path, true);
        try {
          const time = new Date();
          fs.utimesSync(asset.verFile, time, time);
        } catch (err) {
          fs.closeSync(fs.openSync(asset.verFile, 'w'));
        }
        console.info(`${asset.name} ${asset.version} download complete.`);
      } else {
        console.info(`${asset.name} ${asset.version} is already up to date.`);
      }
    } catch (error) {
      console.error(`Failed to download ${asset.name} ${asset.version}:`, error);
    }
  }
}

downloadAssets().catch(error => console.error('Error during downloads:', error));
