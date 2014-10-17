var Q = require('q');
var fs = require('fs');

function readFile(filename, enc){
  return Q.fcall(fs.readFile, filename, enc);
}

function readJSON(text){
  return Q.fcall(JSON.parse, text);
}

module.exports = function() {
    debugger;
    return new Q.Promise(function (resolve, reject, notify){

        readFile('./package.json', 'utf8')
        .then(readJSON)
        .then(function(result) {
          resolve(result.version);
        })
        .catch(function(err) {
          reject(err);
        });

    });
};