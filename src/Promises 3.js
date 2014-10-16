var Q = require('q');
var fs = require('fs');

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
  return readFile(filename, 'utf8').then(JSON.parse)
}

module.exports = function() {
    debugger;
    return new Q.Promise(function (resolve, reject, notify){

        readJSON('./package.json').then(function(result) {
            resolve(result.toString().length + '');
        })

    });
};