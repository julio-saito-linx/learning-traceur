var Q = require('q');

function* demo() {
    var res = yield 10;
    if(res === 'forced_yield'){
        return 'This yield was forced';
    }
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

    	allResults.push('d.next(\'forced_yield\')...');
    	res = d.next('forced_yield');
    	allResults.push(res);
    	allResults.push('');

    	allResults.push('d.next()...');
    	var res = d.next();
    	allResults.push(res);
    	allResults.push('');

        resolve(allResults.join('\n'))
    });
};