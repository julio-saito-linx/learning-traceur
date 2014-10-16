require('source-map-support').install();
require('traceur');
var _  = require('lodash');
var glob = require("glob")
var Q = require('q');
var fs = require('fs');

var inquirer = require('inquirer');

function highlightFileSync(filename){
  return new Q.Promise(function (resolve, reject, notify){
    try{
        var cardinal = require('cardinal');
        resolve(cardinal.highlightFileSync(filename));
    }catch(err){
        reject(err);
    }
  });
}

function readFile(filename, enc){
  return new Q.Promise(function (resolve, reject, notify){
    fs.readFile(filename, enc, function (err, res){
      if (err){
        reject(err);
      }
      resolve(res);
    });
  });
}

function printSource(text){
  return new Q.Promise(function (resolve, reject, notify){
    console.log('\nSOURCE:');
    console.log('>>>>\n');
    console.log(text.toString());
    console.log('\n<<<<');
    console.log('\n');
    resolve(true);
  });
}

var createMenu = function (files) {
    files = _.map(files, function(file) {
        var onlyName = file.replace(/dist\/node\//g, '');
        onlyName = onlyName.replace(/\.js/g, '');

        var source = file.replace(/dist\/node/g, 'src');

        return {
            name: onlyName,
            value: {
                name  : onlyName,
                dist  : './' + file,
                source: './' + source
            }
        };
    });

    inquirer.prompt([
        {
            type: "list",
            name: "example",
            message: "Example?",
            choices: files
        }
    ],
    function( answers ) {
        console.log('\n');
        console.log('---------------------');
        console.log('  ' + answers.example.name);
        console.log('---------------------');
        console.log('');

        // Hightlight
        highlightFileSync(answers.example.source)
        .catch( function(err) {
            // ReadFile Only
            return readFile(answers.example.source)
        })
        .then( function(result) {
            return printSource(result);
        })
        .then( require(answers.example.dist) )
        .then( function(result) {

            console.log('\nRESULT:');
            console.log('>>>>\n');
            console.log(result);
            console.log('\n<<<<');
            console.log('\n\n');

            loadAllFiles();
        })
        .catch( function(err) {
            throw err;
        })

    });
};

var loadAllFiles = function() {
    glob("dist/node/*.js", function (er, files) {
        createMenu(files);
    });
};

loadAllFiles();
