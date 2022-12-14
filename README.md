# gitbook-plugin-sequence

[![Build Status](https://github.com/vowstar/gitbook-plugin-sequence/actions/workflows/test.yml/badge.svg)](https://github.com/vowstar/gitbook-plugin-sequence/actions)
[![Coverage Status](https://coveralls.io/repos/github/vowstar/gitbook-plugin-sequence/badge.svg?branch=master)](https://coveralls.io/github/vowstar/gitbook-plugin-sequence?branch=master)
[![NPM Version](https://img.shields.io/npm/v/gitbook-plugin-sequence.svg?style=flat)](https://www.npmjs.org/package/gitbook-plugin-sequence)
[![NPM Downloads](https://img.shields.io/npm/dm/gitbook-plugin-sequence.svg?style=flat)](https://www.npmjs.org/package/gitbook-plugin-sequence)

[js-sequence-diagrams](https://github.com/bramp/js-sequence-diagrams) plugin for [Honkit](https://github.com/honkit/honkit) ~~and [GitBook](https://github.com/GitbookIO/gitbook)~~.

## Installation

```bash
npm install gitbook-plugin-sequence
```

Add this plugin into ``book.json``.

```json
{
  "plugins": ["sequence"]
}
```

## Features

* Support HTML, PDF, EPUB output(make sure your gitbook support SVG)
* Support ```flow code block quote
* Multi code style support

## Configuration

The default config is ``"theme": "simple"``.

book.json add the js-sequence-diagrams options

```json
"pluginsConfig": {
  "sequence": {
    "theme": "simple"
  }
}
```

## Usage


To include a sequence diagram, just wrap your definition in a "sequence" code block. For example:

<pre lang="no-highlight"><code>```sequence
    Title: Here is a title
    A->B: Normal line
    B-->C: Dashed line
    C->>D: Open arrow
    D-->>A: Dashed open arrow
```
</code></pre>

Also you can put in your book block as

```bash
{% sequence %}
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
{% endsequence %}
```

### Extend the width

```bash
{% sequence width=770 %}
```

## Thanks

This project learn from:

* [midnightSuyama/gitbook-plugin-flowchart](https://github.com/midnightSuyama/gitbook-plugin-flowchart).
* [midnightSuyama/gitbook-plugin-sequence-diagrams](https://github.com/midnightSuyama/gitbook-plugin-sequence-diagrams).
* [massanek/gitbook-plugin-js-sequence-diagram](https://github.com/gmassanek/gitbook-plugin-js-sequence-diagram).
* [nsdont/gitbook-plugin-new-flowchart](https://github.com/nsdont/gitbook-plugin-new-flowchart).
* [lyhcode/gitbook-plugin-plantuml](https://github.com/lyhcode/gitbook-plugin-plantuml).

## See also

These plugins are also available on honkit.

|                                    Plugin                                     |                               Description                                |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [gitbook-plugin-uml](https://github.com/vowstar/gitbook-plugin-uml)           | A plug-in that use plantuml to draw beautiful pictures                   |
| [gitbook-plugin-wavedrom](https://github.com/vowstar/gitbook-plugin-wavedrom) | A plug-in that can draw waveforms and register tables                    |
| [gitbook-plugin-sequence](https://github.com/vowstar/gitbook-plugin-sequence) | A plug-in that can draw sequence diagrams                                |
| [gitbook-plugin-flow](https://github.com/vowstar/gitbook-plugin-flow)         | A plug-in that can draw flowchart.js diagrams                            |
| [gitbook-plugin-echarts](https://github.com/vowstar/gitbook-plugin-echarts)   | A plug-in that can draw various charts such as bar charts and pie charts |
