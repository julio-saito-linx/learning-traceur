function* count() {
    var i = 0;
    while (true) {
        yield i++;
    }
}

module.exports = function() { debugger;

	var counter = count();
	for (var i = 0; i < 10; i++) {
		var value = counter.next().value;
		console.log(value);
	}

};