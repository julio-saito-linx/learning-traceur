require('source-map-support').install();
require('traceur');
var _  = require('lodash');
var glob = require("glob");
var Q = require('q');
var fs = require('fs');
var inquirer = require('inquirer');

var callExample = function(path, name) {
    console.log('');
    if(name){
        console.log('---------------------');
        console.log('  ' + name);
        console.log('---------------------');
        console.log('');
    }

    require(path)();

    console.log('');
    console.log('');
};

var createMenu = function (files) {
    files = _.map(files, function(file) {

        var onlyName = file.replace(/dist\//g, '')
                           .replace(/\.js/g, '');

        var source = file.replace(/dist/g, 'src');

        return {
            name: onlyName,
            value: {
                name  : onlyName,
                dist  : './' + file,
                source: './' + source
            }
        };
    });

    files.unshift({ name  : 'All', value: { name  : 'All' } })

    inquirer.prompt([
        {
            type: "list",
            name: "example",
            message: "Example?",
            choices: files
        }
    ],
    function( answers ) {
        if(answers.example.name === 'All'){
            files.forEach(function(file) {
                if(file.value.dist){
                    // call all files
                    callExample(file.value.dist, file.value.name);
                }
            });
        }
        else{
            // call only selected file
            callExample(answers.example.dist, answers.example.name);
        }
    });
};

var loadAllFiles = function() {
    glob("dist/**/*.js", function (er, files) {
        createMenu(files);
    });
};


if(process.argv.length >= 3){
    var param = process.argv[2];
    var source = './' + param;
    var dist = source.replace(/src/g, 'dist');
    callExample(dist);
}
else{
    loadAllFiles();
}
