#! /usr/bin/env node

var argv = require("optimist").argv
    , path = require("path")
    , pathToRun = path.join(process.cwd(), argv._[0])
    , iterateFiles = require("iterate-files")
    , fs = require("fs")
    , repl = require("repl")
    , through = require("through")

if (argv.repl) {
    var input = through()
        , server = repl.start({
            input: input
            , output: process.stdout
        })

    input.write(
        'eval(' + "(" + function (pathToRun) {
            var str = require("fs").readFileSync(pathToRun).toString()
            global.__filename = pathToRun
            global.__dirname = require("path").dirname(pathToRun)
            module.filename = pathToRun
            return str
        } + ")('" + pathToRun + "')" + ')\n'
    )
    process.stdin.pipe(input)
    process.stdin.resume()
} else {
    iterateFiles(pathToRun, function (fileName) {
        require(fileName)
    }, noop, /\.js$/)
}

function noop() {}
