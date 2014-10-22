var Q = require('q');
var fs = require('fs');

function readJSONSync(filename){
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

module.exports = function() { debugger;

	var result = readJSONSync('./package.json');
	console.log(result.version);

};