
require('source-map-support').install();

require('traceur');

class Greeter {
  sayHi(name = 'Anonymous') {
    console.log(`Hi ${name}!`);
    throw new Error('an error here!');
  }
}

var greeter = new Greeter();

greeter.sayHi();