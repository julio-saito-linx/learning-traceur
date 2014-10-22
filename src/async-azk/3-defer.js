"use strict";

var Q = require("q");
var logError = require('../helpers/error-helper');
var _ = require('lodash');

var defer = function(func) {
    return Q.Promise((resolve, reject, notify) => {
        process.nextTick(() => {
            try {
                resolve = _.extend(resolve, { resolve, reject, notify });
                var result = func(resolve, reject, notify);
            } catch (e) {
                return reject(e);
            }

            if (Q.isPromise(result)) {
                result.progress(notify).then(resolve, reject);
            } else if (typeof(result) != "undefined") {
                resolve(result);
            }
        });
    });
}

var funcPrintAndWait = function(value) {
    return defer(function() {
        return Q.delay(value, 500);
    });
}

module.exports = function() { debugger;

    funcPrintAndWait(1)
    .then(function(value) {
        console.log(value);
        return funcPrintAndWait(2);
    })
    .then(function(value) {
        console.log(value);
        return funcPrintAndWait(3);
    })
    .then(function(value) {
        console.log(value);
        return funcPrintAndWait(4);
    })
    .then(function(value) {
        console.log(value);
        return funcPrintAndWait(5);
    })
    .then(function(value) {
        console.log(value);
    })
    .catch(function(err) {
        logError(err);
    })

};

