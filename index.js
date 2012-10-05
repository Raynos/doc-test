var fs = require("fs")
    , util = require("util")
    , forEach = require("for-each")
    , esprima = require("esprima")
    , some = require("some-sync")
    , assert = require("assert")

module.exports = log

function log(filename, name) {
    var fileContent = fs.readFileSync(filename).toString()
        , ast = esprima.parse(fileContent, {
            loc: true
            , comment: true
        })
        , comments = ast.comments
        , executionMap = {}
        , count = 0

    name = name || "log"

    process.on("exit", checkSuccess)

    // console.log("comments", util.inspect(comments, true, 10))

    walkAst(ast, null, function (node, parent) {
        if (node.type !== "CallExpression") {
            return
        }

        if (node.callee.name !== name) {
            return
        }

        var text = node.arguments[0].value
            , endLine = node.loc.end.line
            , comment = findComment(comments, endLine)
            , value = getValue(comment && comment.value.trim())

        // inspect("node", node)
        // inspect("comment", comment)
        // inspect("value", value)
        executionMap[text] = value
    })

    return logger

    function logger(name, value) {
        count++
        var expected = executionMap[name]

        assert.deepEqual(value, expected
            , name + " " + JSON.stringify(value))
        console.log(name, value)
    }

    function checkSuccess() {
        if (count !== Object.keys(executionMap).length) {
            throw new Error("not all log's ran")
        }
    }
}

function findComment(comments, endLine) {
    return some(comments, function (comment) {
        var start = comment.loc.start.line

        if (endLine + 1 === start) {
            return comment
        }
    })
}

function getValue(text) {
    return new Function("return " + text || "")()
}

function walkAst(node, parent, callback) {
    forEach(node, function (child, key) {
        if (key === "parent") {
            return
        }

        if (Array.isArray(child)) {
            child.forEach(function (child) {
                if (child && typeof child.type === "string") {
                    walkAst(child, node, callback)
                }
            })
        } else if (child && typeof child.type === "string") {
            walkAst(child, node, callback)
        }
    })

    callback(node, parent)
}

function inspect(str, obj) {
    console.log(str, util.inspect(obj, true, 10))
}
