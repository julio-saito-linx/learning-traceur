"use strict";

var Q = require("q");

function getX() {
    /**
     * Q.delay(ms) - https://github.com/kriskowal/q/wiki/API-Reference#qdelayms
     *
     * If the static version of Q.delay is passed only a single argument, it
     * returns a promise that will be fulfilled with undefined after at least ms
     * milliseconds have passed. (If it's called with two arguments, it uses the
     * usual static-counterpart translation, i.e. Q.delay(value, ms) is
     * equivalent to Q(value).delay(ms).)
     *
     * This is a convenient way to insert a delay into a promise chain, or even
     * simply to get a nicer syntax for setTimeout:
     */
    return Q.delay(5, 500);
}

function getY() {
    return Q.delay(10, 500);
}

function sumXY(x, y) {
    return Q.delay(x+y, 500);
}

module.exports = function() { debugger;


    /**
     * Q.spawn - https://github.com/kriskowal/q/wiki/API-Reference#qspawngeneratorfunction
     *
     * This immediately runs a generator function, and forwards any uncaught
     * errors to Q.onerror. An uncaught error is deemed to occur if the function
     * returns a rejected promise. Note that this automatically occurs if the
     * generator function throws an error, e.g. by yielding on a promise that
     * becomes rejected without surrounding that code with a try/catch
     */
    Q.spawn(function* () {
        var x = yield getX();
        console.log('x =', x);

        var y = yield getY();
        console.log('y =', y);

        var sum = yield sumXY(x, y);
        console.log('sum =', sum);
    });

};

