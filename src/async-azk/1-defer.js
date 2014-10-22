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

module.exports = function() { debugger;

    // can call like a defered
    defer(function(resolve, reject, notify) {
        resolve(10);
    })
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err) {
        logError(err);
    })


    // can call like a function
    defer(function() {
        return 20;
    })
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err) {
        logError(err);
    })

};

