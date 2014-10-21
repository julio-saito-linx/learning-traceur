var Q = require('q');

class Greeter {
  sayHi(name = 'Anonymous') {
    return `Hi ${name}!`;
  }
}

module.exports = function() { debugger;

    var greeter = new Greeter()
    var result = greeter.sayHi();
    console.log(result);

};