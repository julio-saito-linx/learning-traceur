var Q = require('q');

function* demo() {
	yield 1;
	yield 2;
	yield 3;
}


module.exports = function() { debugger;

	var allResults = [];
	var d = demo();

			console.log('d.next()...');

	var res = d.next();

			console.log(res);
			console.log('');
			console.log('d.next()...');

	var res = d.next();

			console.log(res);
			console.log('');
			console.log('d.next()...');

	var res = d.next();

			console.log(res);
			console.log('');
			console.log('d.next()...');

	var res = d.next();

			console.log(res);
			console.log('');

};