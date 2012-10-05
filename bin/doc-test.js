#! /usr/bin/env node

var pathToRun = process.argv[2]
    , iterateFiles = require("iterate-files")

iterateFiles(pathToRun, function (fileName) {
    require(fileName)
}, function () {
    console.log("all done!")
}, /\.js$/)
