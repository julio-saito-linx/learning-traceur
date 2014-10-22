var Q = require('q');
var fs = require('fs');
var logError = require('../helpers/error-helper');
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

var readJSON_OK = readJSON('./src/promises/jsons/package.json').then(function(result) {
    // success
    console.log('\n\n1: OK!! version:', result.version, '\n\n');
});

var readJSON_Error_On_File = readJSON('./src/promises/jsons/NOT_EXIST.json')
    .then(function(result) {
        console.log('2: version:', result.version);
    })
    .catch(function(err) {
        throw err;
    })
    .catch(function(err) {
        logError('2: readFiles:', err);
        throw err;
    }
);

var readJSON_Error_On_JSON = readJSON('./src/promises/jsons/package-invalid.json')
    .then(function(result) {
        console.log('3: version:', result.version);
    })
    .catch(function(err) {
        throw err;
    })
    .catch(function(err) {
        logError('3: readJSON:', err);
        throw err;
    }
);

module.exports = function() {  debugger;

    Q.all([
        readJSON_OK,            // 1    : version: 1.0.0
        readJSON_Error_On_File, // error: ENOENT, open './NOT_EXIST.json'
        readJSON_Error_On_JSON, // error: Unexpected token n
    ]).then(function() {
        console.log('4: No errors');
    })
    .catch(function(err) {
        logError('4: Q.ALL:', err);
        throw err;
    });

};