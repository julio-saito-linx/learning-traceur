var Q = require('q');

function* demo() {
	yield 1;
	yield 2;
	yield 3;
}


module.exports = function() {
    debugger;
    return new Q.Promise(function (resolve, reject, notify){

		var allResults = [];
		var d = demo();

		allResults.push('d.next()...');
		var res = d.next();
		allResults.push(res);
		allResults.push('');

		allResults.push('d.next()...');
		var res = d.next();
		allResults.push(res);
		allResults.push('');

		allResults.push('d.next()...');
		var res = d.next();
		allResults.push(res);
		allResults.push('');

		allResults.push('d.next()...');
		var res = d.next();
		allResults.push(res);
		allResults.push('');

		resolve(allResults.join('\n'))
    });
};