var Q = require('q');
var fs = require('fs');

function readJSON(filename, callback){
  fs.readFile(filename, 'utf8', function (err, res){

    // handle errors for fs.readFile()
    if (err){
    	return callback(err);
    }

    try {
      	res = JSON.parse(res)
    } catch (ex) {
    	// handle errors for JSON.parse()
      	return callback(ex)
    }

   	// success
    callback(null, res)
  })
}

module.exports = function() {
    debugger;
    return new Q.Promise(function (resolve, reject, notify){

        var result = readJSON('./package.json', function(err, result) {
            // handle errors for readJSON()
            if(err){
                reject(err);
            }

            resolve(result.version);
        });

    });
};