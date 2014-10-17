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

var readFile = async(function *(filename){
  return fs.readFile(filename, 'utf8');
});

var readJSON = async(function *(text){
  return JSON.parse(text);
});

module.exports = function() {
    debugger;
    return readFile('./package.json').then(readJSON);
};