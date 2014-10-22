var Q = require('q');
var fs = require('fs');
var logError = require('../helpers/error-helper')();
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
    printNumber({
        number: 0,
        delay: 400
    })
    .then(printNumber)
    .then(printNumber)
    .then(printNumber)

};