var Q = require('q');
var fs = require('fs');
var logError = require('../helpers/error-helper');
Q.longStackSupport = true;

process.on('uncaughtException', function (err) {
    throw err;
});

function printNumber(config){
    return new Q.Promise(function (resolve, reject, notify){
        config.number = config.number - 1;
        setTimeout(function() {
            console.log(config.number, ' : ', config.delay, 'ms')
            resolve(config);
        }, config.delay);
    })
}

module.exports = function() {  debugger;

    console.log('At the same time');
    printNumber({ number: 1, delay: 500 })
    printNumber({ number: 2, delay: 500 })
    printNumber({ number: 3, delay: 500 })
    printNumber({ number: 4, delay: 500 })

};