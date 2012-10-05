var ReadStream = require("read-stream")
    , log = require("../")(__filename)
    , fromArray = ReadStream.fromArray
    , toArray = require("write-stream").toArray

var one = fromArray([1,2,3,4])

one.pipe(toArray(function (list) {
    log("one", list)
    // [1, 2, 3, 4]
}))

var two = ReadStream(function (bytes, state) {
    var item = ++state.count
    if (item < 9) {
        return item
    }
    state.end()
}, { count: 4 })

two.stream.pipe(toArray(function (list) {
    log("two", list)
    // [5, 6, 7, 8]
}))

var three = ReadStream()
    , threeCount = 8

var timer = setInterval(function () {
    threeCount++
    if (threeCount < 13) {
        three.push(threeCount)
    } else {
        clearInterval(timer)
        three.end()
    }
}, 500)

three.stream.pipe(toArray(function (list) {
    log("three", list)
    // [9, 10, 11, 12]
}))
