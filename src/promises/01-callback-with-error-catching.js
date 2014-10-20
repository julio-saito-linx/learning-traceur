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

module.exports = function() { debugger;

    readJSON('./package.json', function(err, result) {
        // handle errors for readJSON()
        if(err){
            throw err;
        }

        console.log(result.version);
        return result.version;
    });

}