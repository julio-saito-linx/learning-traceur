var Q = require('q');

class Greeter {
  sayHi(name = 'Anonymous') {
    return `Hi ${name}!`;
  }
}

module.exports = function() {
    debugger;
    return new Q.Promise(function (resolve, reject, notify){

        var greeter = new Greeter()
        resolve(greeter.sayHi());

    });
};