var Q = require('q');

function* demo() {
    try{
   		yield 10;
    }catch(e){
    	console.log(e);
    }
}

module.exports = function() { debugger;

    var allResults = [];
	var d = demo();

	       console.log('d.next()...');

	var res = d.next();

	       console.log(res);
	       console.log('');
	       console.log('d.throw(...');

	res = d.throw(new Error('error injected on via \'throw\''));

	       console.log('');

};