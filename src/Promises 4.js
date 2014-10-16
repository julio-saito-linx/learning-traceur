var Q = require('q');
var fs = require('fs');

function async(makeGenerator){
  return function (){
    var generator = makeGenerator.apply(this, arguments);

    function handle(result){ // { done: [Boolean], value: [Object] }
      if (result.done) return result.value;

      return result.value.then(function (res){
        return handle(generator.next(res));
      }, function (err){
        return handle(generator.throw(err));
      });
    }

    return handle(generator.next());
  };
}

function readFile(filename, enc){
  return new Q.Promise(function (resolve, reject, notify){
    fs.readFile(filename, enc, function (err, res){
      if (err){
        reject(err);
      }
      resolve(res);
    });
  });
}

var readJSON = async(function *(filename){
  return JSON.parse(yield readFile(filename, 'utf8'));
});

module.exports = function() {
    debugger;
    return new Q.Promise(function (resolve, reject, notify){

        readJSON('./package.json').then(function(result) {
            resolve(result.toString().length + '');
        });

    });
};