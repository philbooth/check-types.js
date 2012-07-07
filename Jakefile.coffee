'use strict';

{exec} = require 'child_process'

desc 'Minify the source code for deployment.'
task 'minify', [ 'jslint', 'jstest' ], ->
  runTask minify, 'Minifying javascript...'
, async: true

desc 'Run the unit tests against the compiled output.'
task 'jstest', [ 'prepare', 'compile' ], ->
  process.env.NODE_PATH = './build'
  runTask test, 'Testing javascript...'
, async: true

desc 'Run the unit tests against the source code.'
task 'cstest', [ 'prepare' ], ->
  process.env.NODE_PATH = './src'
  runTask test, 'Testing coffeescript...'
, async: true

desc 'Lint the compiled output.'
task 'jslint', [ 'prepare', 'compile' ], ->
  runTask jslint, 'Linting javascript...'
, async: true

desc 'Lint the source code.'
task 'cslint', [ 'prepare' ], ->
  runTask cslint, 'Linting coffeescript...'
, async: true

desc 'Compile the source coffeescript into javascript.'
task 'compile', [ 'prepare', 'cslint', 'cstest' ], ->
  runTask compile, 'Compiling coffeescript...'
, async: true

desc 'Install dependencies.'
task 'prepare', ->
  runTask prepare, 'Preparing the build environment...'
, async: true

runTask = (operation, message) ->
  console.log message
  operation()

minify = ->
  runCommand commands.minify

test = ->
  runCommand commands.test

jslint = ->
  runCommand commands.jslint

cslint = ->
  runCommand commands.cslint

compile = ->
  runCommand commands.compile

prepare = ->
  runCommand commands.prepare

runCommand = (command) ->
  exec command, { cwd: __dirname }, (error, stdout, stderr) ->
    console.log stdout
    console.log stderr
    if typeof error is 'object' && error isnt null
      console.log error.message
      process.exit 1
    after()

after = () ->
  process.env.NODE_PATH = originalNodePath
  complete()

commands =
  minify: './node_modules/.bin/uglifyjs --lift-vars --output ./build/types.min.js ./build/types.js'
  test: './node_modules/.bin/mocha --compilers coffee:coffee-script --ui tdd --reporter spec --colors --slow 50 ./test/types.coffee'
  jslint: './node_modules/.bin/jshint ./build/types.js --config config/jshint.json'
  cslint: './node_modules/.bin/coffeelint -f config/coffeelint.json ./src/types.coffee'
  compile: './node_modules/.bin/coffee -c -o ./build ./src/types.coffee'
  prepare: 'npm install'

originalNodePath = process.env.NODE_PATH

