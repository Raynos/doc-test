# doc-test

Examples are tests!

## Example

Imagine we are writing tests/examples for [ready-signal][1]

```
var Signal = require("ready-signal")
    , log = require("doc-test")(__filename)

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
```

Now just run `node file.js` and it should print

```
1 function
2 true
3 true
```

What it's doing is matching every log call with the value
descriped in the comment below it. That's it.

This is your test, example and documentation

## Inspiration

 - [doctest.js](https://github.com/ianb/doctestjs)

## Installation

`npm install doc-test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://github.com/Raynos/ready-signal
