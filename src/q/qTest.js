var Q  = require('q');
var _  = require('lodash');

var defer = function(func) {
    return Q.Promise((resolve, reject, notify) => {
      process.nextTick(() => {
        try {
          resolve = _.extend(resolve, { resolve, reject, notify });
          var result = func(resolve, reject, notify);
        } catch (e) {
          return reject(e);
        }

        if (Q.isPromise(result)) {
          result.progress(notify).then(resolve, reject);
        } else if (typeof(result) != "undefined") {
          resolve(result);
        }
      });
    });
};

var async = function(obj, func, ...args) {
	return defer((_resolve, _reject, notify) => {
	  if (typeof obj == "function")
	    [func, obj] = [obj, null];

	  if (typeof obj == "object") {
	    func = func.bind(obj);
	  }

	  return Q.async(func)(...args, notify);
	});
};

module.exports = {
	promisse: Q.Promise,
	async: async,
	defer: defer
};
