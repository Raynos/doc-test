#! /usr/bin/env node

var pathToRun = process.argv[2]
    , path = require("path")
    , iterateFiles = require("iterate-files")

iterateFiles(path.join(process.cwd(), pathToRun), function (fileName) {
    require(fileName)
}, noop, /\.js$/)

function noop() {}
