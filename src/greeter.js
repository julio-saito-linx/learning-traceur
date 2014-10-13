class Greeter {
  sayHi(name = 'Anonymous') {
    console.log(`Hi ${name}!`);
  }
}

debugger;

var greeter = new Greeter();
greeter.sayHi();