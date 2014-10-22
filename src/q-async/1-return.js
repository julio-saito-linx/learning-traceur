"use strict";

var Q = require("q");

/**
 * Q.async - https://github.com/kriskowal/q/wiki/API-Reference#qasyncgeneratorfunction
 *
 * This is an experimental tool for converting a generator function into a
 * deferred function. This has the potential of reducing nested callbacks in
 * engines that support yield.
 */
var generator = Q.async(function* () {

    var value = yield 1;
    console.log(1);

    value = yield value + 1;
    console.log(2);

    value = yield value + 1;
    console.log(3);

    return value + 1;

});

module.exports = function() { debugger;

    // 1, 2, 3
    var promise = generator();

    // 4
    promise.then(function(result) {
        console.log(result);
    })

};

