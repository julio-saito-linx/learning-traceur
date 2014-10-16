var async = require('./q/qTest').async;

var asyncFunc = async(function* () {
	return 'from asyncFunc';
});

debugger;
asyncFunc.then(function(result) {
	console.log('then:', result);
});

