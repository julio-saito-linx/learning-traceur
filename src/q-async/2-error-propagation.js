"use strict";

var Q = require("q");

var generator = Q.async(function* () {
    try {
        var ten = yield Q.reject(new Error("`Error`"));
        console.log("Should not get here 1");
    } catch (exception) {
        console.log("catch: Should get here 1");
        console.log(exception.message, " === ", "`Error`\n");
        throw new Error("`Threw`");
    }
});

module.exports = function() { debugger;

    generator().then(function () {
        console.log("Should not get here 2");
    }, function (reason) {
        console.log("err: Should get here 2");
        console.log(reason.message, " === ", "`Threw`");
    });

};

