var Q = require('q');
var fs = require('fs');

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

function readFile(filename, enc){
  return async(this, function* () {
    yield Helpers.requireAgent();

    var manifest = new Manifest(this.cwd, true);
    var systems  = manifest.getSystemsByName(opts.system);

    yield Cmd.status(this, manifest, systems);
  });
}

var readJSON = async(function *(filename){
  return JSON.parse(yield readFile(filename, 'utf8'));
});

module.exports = function() {
    debugger;
    return new Q.Promise(function (resolve, reject, notify){

        readJSON('./package.json').then(function(result) {
            resolve(result.version);
        });

    });
};