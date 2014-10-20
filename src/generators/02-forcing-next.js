var Q = require('q');

function* demo() {
    var res = yield 10;
    if(res === 'forced_yield'){
        return 'This yield was forced';
    }
}

module.exports = function() { debugger;

    var allResults = [];
	var d = demo();

            console.log('d.next()...');

	var res = d.next();

            console.log(res);
            console.log('');
            console.log('d.next(\'forced_yield\')...');

	res = d.next('forced_yield');

            console.log(res);
            console.log('');
            console.log('d.next()...');

	var res = d.next();

            console.log(res);
            console.log('');

};