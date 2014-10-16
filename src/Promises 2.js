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
  return new Q.Promise(function (resolve, reject, notify){
    readFile(filename, 'utf8').done(function (res){
      try {
        resolve(JSON.parse(res));
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  })
}

module.exports = function() {
    debugger;
    return new Q.Promise(function (resolve, reject, notify){

        readJSON('./package.json').then(function(result) {
            resolve(result.toString().length + '');
        })

    });
};