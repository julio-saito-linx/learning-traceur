var Q = require('q');
var fs = require('fs');

function readJSONSync(filename){
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

module.exports = function() {
    debugger;
    return new Q.Promise(function (resolve, reject, notify){

    	var result = readJSONSync('./package.json');
    	resolve(result.version);

    });
};