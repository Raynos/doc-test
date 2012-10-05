var Signal = require("ready-signal")
    , log = require("..")(__filename)

/*
    Signal gives you a signal function.
*/
log("1", typeof Signal)
// "function"

/*
    You can attach a listener to signal
    And it will be called
*/

var r = Signal()
r(function callback () {
    log("2", true)
    // true
})

r()

/*
    It also calls your listener if you add it
    after the signal is ready
*/

var r = Signal()

r()

r(function callback() {
    log("3", true)
    // true
})
