var Q = require('q');
var fs = require('fs');
var logError = require('../helpers/error-helper').logError;
Q.longStackSupport = true;

process.on('uncaughtException', function (err) {
    throw err;
});

function printNumber(config){
    return new Q.Promise(function (resolve, reject, notify){
        config.number = config.number + 1;
        setTimeout(function() {
            console.log(config.number, ' : ', config.delay, 'ms')
            resolve(config);
        }, config.delay);
    })
}

module.exports = function() {  debugger;

    console.log('Sequence');

    Q.all([
        printNumber({ number: 1, delay: 200 }),
        printNumber({ number: 2, delay: 500 }),
        printNumber({ number: 3, delay: 800 }),
        printNumber({ number: 4, delay: 100 }),
        printNumber({ number: 5, delay: 300 }),
    ]).then(function() {
        console.log('Q.all done');
    })
    .catch(function(err) {
        logError('Q.all error', err);
        throw err;
    });

};