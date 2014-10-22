var Q = require('q');
var fs = require('fs');
var _ = require('lodash');
var logError = require('../helpers/error-helper');
Q.longStackSupport = true;

process.on('uncaughtException', function (err) {
    throw err;
});

function printNumber(config){
    return new Q.Promise(function (resolve, reject, notify){
        setTimeout(function() {
            console.log(config.number, ' : ', config.delay, 'ms')
            resolve(config);
        }, config.delay);
    })
}

module.exports = function() {  debugger;

    console.log('Sequence');

    Q.all([
        printNumber({ number: 1, delay: 500 }),
        printNumber({ number: 2, delay: 400 }),
        printNumber({ number: 3, delay: 300 }),
        printNumber({ number: 4, delay: 200 }),
        printNumber({ number: 5, delay: 100 }),
    ]).then(function(result) {
        var results = _.pluck(result, 'number');
        console.log('Q.all done', results);
    })
    .catch(function(err) {
        logError('Q.all error', err);
        throw err;
    });

};