'use strict';

{exec} = require 'child_process'

desc 'Run the unit tests against the compiled output.'
task 'jstest', [ 'compile' ], ->
  process.env.NODE_PATH = './build'
  runTask test, 'Testing javascript...'
, async: true

desc 'Compile the source coffeescript into javascript.'
task 'compile', [ 'cstest' ], ->
  runTask compile, 'Compiling coffeescript...'
, async: true

desc 'Run the unit tests against the source code.'
task 'cstest', [ 'lint' ], ->
  process.env.NODE_PATH = './src'
  runTask test, 'Testing coffeescript...'
, async: true

desc 'Lint the source code.'
task 'lint', [ 'prepare' ], ->
  runTask lint, 'Linting coffeescript...'
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

lint = ->
  runCommand commands.lint

compile = ->
  runCommand commands.compile

prepare = ->
  runCommand commands.prepare

runCommand = (command) ->
  exec command, { cwd: __dirname }, (error, stdout, stderr) ->
    console.log stdout
    if typeof error is 'object' && error isnt null
      console.log error.message
      process.exit 1
    after()

after = () ->
  process.env.NODE_PATH = originalNodePath
  complete()

commands =
  test: './node_modules/.bin/mocha --compilers coffee:coffee-script --ui tdd --reporter spec --colors --slow 50 ./test/check-types.coffee'
  lint: './node_modules/.bin/coffeelint -f config/coffeelint.json ./src/check-types.coffee'
  compile: './node_modules/.bin/coffee -c -o ./build ./src/check-types.coffee'
  prepare: 'npm install'

originalNodePath = process.env.NODE_PATH

