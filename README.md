# doc-test

Examples are tests!

## Example

Imagine we are writing tests/examples for [ready-signal][1]

``` js
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

/*
    Multiple callbacks will also fire!
*/

var r = Signal()

r(function callback() {
    log("4", true)
    // true
})

r()

r(function callback() {
    log("5", true)
    // true
})
```

Now just run `node file.js` and it should print

```
1 function
2 true
3 true
4 true
5 true
```

What it's doing is matching every log call with the value
descriped in the comment below it. That's it.

This is your test, example and documentation

## CLI Usage

`npm install doc-test -g`

`doc-test <relative folder>`

This will basically just run node on every file.

You can also run the entire file in a REPL

`doc-test <relative file> --repl`

## Inspiration

 - [doctest.js](https://github.com/ianb/doctestjs)

## Installation

`npm install doc-test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://github.com/Raynos/ready-signal
