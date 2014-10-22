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
        console.log(value);
        return Q.delay(500);
    });
}

module.exports = function() { debugger;

    funcPrintAndWait(1)
    .then(function() {
        return funcPrintAndWait(2);
    })
    .then(function() {
        return funcPrintAndWait(3);
    })
    .then(function() {
        return funcPrintAndWait(4);
    })
    .then(function() {
        return funcPrintAndWait(5);
    })
    .catch(function(err) {
        logError(err);
    })

};

