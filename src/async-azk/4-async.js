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

var async = function(obj, func, ...args) {
    return defer((_resolve, _reject, notify) => {
        if (typeof obj == "function")
            [func, obj] = [obj, null];

        if (typeof obj == "object") {
            func = func.bind(obj);
        }

        return Q.async(func)(...args, notify);
    });
}

var funcPrintAndWait = function(value) {
    return async(function* () {
        return Q.delay(value, 500);
    });
}

module.exports = function() { debugger;

    Q.onerror = logError;

    Q.spawn(function* () {
        console.log( yield funcPrintAndWait(1) );
        console.log( yield funcPrintAndWait(2) );
        console.log( yield funcPrintAndWait(3) );
        console.log( yield funcPrintAndWait(4) );
        console.log( yield funcPrintAndWait(5) );
    })

};

