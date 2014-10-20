var Q = require('q');
var fs = require('fs');
var logError = require('../helpers/error-helper').logError;
Q.longStackSupport = true;

process.on('uncaughtException', function (err) {
    throw err;
});

function readFile(filename, enc){
    return new Q.Promise(function (resolve, reject, notify){
        fs.readFile(filename, enc, function (err, res){
            if (err){
                reject(err);
            }
            resolve(res);
        })
    })
}

function readJSON(filename){
    return new Q.Promise(function (resolve, reject, notify){
        readFile(filename, 'utf8').done(function (res){
            try {
                resolve(JSON.parse(res));
            } catch (err) {
                reject(err);
            }
        }, reject);
    })
}

module.exports = function() {  debugger;

    Q.all([

        // 1: version: 1.0.0
        readJSON('./src/promises/package.json').then(function(result) {
            // success
            console.log('1: version:', result.version);
        }),



        // ERROR: ENOENT, open './NOT_EXIST.json'
        readJSON('./NOT_EXIST.json')
        .then(function(result) {
            console.log('2: version:', result.version);
        })
        .catch(function(err) {
            throw err;
        })
        .catch(function(err) {
            logError('readFile:', err);
            throw err;
        }),



        // ERROR: Unexpected token n
        readJSON('./src/promises/package-invalid.json')
        .then(function(result) {
            console.log('3: version:', result.version);
        })
        .catch(function(err) {
            throw err;
        })
        .catch(function(err) {
            logError('readJSON:', err);
            throw err;
        })

    ]).then(function() {
        console.log('No errors');
    })
    .catch(function(err) {
        logError('Q.ALL:', err);
        throw err;
    });

};