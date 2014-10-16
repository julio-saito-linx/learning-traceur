var Q = require('q');

function* demo() {
    try{
   		yield 10;
    }catch(e){
    	console.log(e);
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

    	allResults.push('d.throw(...');
    	res = d.throw(new Error('error injected on via \'throw\''));
    	allResults.push('');

        resolve(allResults.join('\n'))
    });
};