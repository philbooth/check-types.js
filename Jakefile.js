/*jshint nomen:false */
/*globals require, console, complete, __dirname, process */

(function () {
    'use strict';

    var exec = require('child_process').exec,

    commands = {
        minify: './node_modules/.bin/uglifyjs --no-copyright --lift-vars --output ./src/check-types.min.js ./src/check-types.js',
        test: './node_modules/.bin/mocha --ui tdd --reporter spec --colors --slow 50 ./test/check-types.js',
        lint: './node_modules/.bin/jshint ./src/check-types.js --config config/jshint.json',
        prepare: 'npm install'
    };

    desc('Minify the source code for deployment.');
    task('minify', [ 'prepare', 'lint', 'test' ], function () {
        runTask(minify, 'Minifying...');
    }, {
        async: true
    });

    desc('Run the unit tests.');
    task('test', [ 'prepare' ], function () {
        runTask(test, 'Testing...');
    }, {
        async: true
    });

    desc('Lint the source code.');
    task('lint', [ 'prepare' ], function () {
        runTask(lint, 'Linting...');
    }, {
        async: true
    });

    desc('Install dependencies.');
    task('prepare', function () {
        runTask(prepare, 'Preparing the build environment...');
    }, {
        async: true
    });

    function runTask (operation, message) {
        console.log(message);
        operation();
    }

    function minify () {
        runCommand(commands.minify);
    }

    function test () {
        runCommand(commands.test);
    }

    function lint () {
        runCommand(commands.lint);
    }

    function prepare () {
        runCommand(commands.prepare);
    }

    function runCommand (command) {
        exec(command, { cwd: __dirname }, function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if (typeof error === 'object' && error !== null) {
                console.log(error.message);
                process.exit(1);
            }
            complete();
        });
    }
}());

