# check-types.js

[![Build status][ci-image]][ci-status]

A tiny JavaScript library for checking types and throwing exceptions.

## Installation

### Via NPM

```
npm install check-types
```

### Via Jam

```
jam install check-types
```

### Via Git

```
git clone git@github.com:philbooth/check-types.js.git
```

## Usage

### Loading the library

Both
CommonJS
(e.g.
if you're running on [Node.js][node]
or in the browser with [Browserify])
and AMD
(e.g. if you're using [Require.js][require])
loading styles are supported.
If neither system is detected,
the library defaults to
exporting its interface globally
as `check`.

### Calling the exported functions

A number of different functions are exported:

#### check.quacksLike (thing, duck)

Tests whether an object 'quacks like a duck'.
Returns `true`
if the first argument has all of the properties
of the second, archetypal argument (the 'duck').
Returns `false` otherwise.
If either argument is not an object,
an exception is thrown.

#### check.verifyQuack (thing, duck, message)

Throws an exception
if an object does not 'quack like a duck'.

#### check.isInstance (thing, prototype)

Returns `true` if an object is an instance of a prototype,
`false` otherwise.

#### check.verifyInstance (thing, prototype, message)

Throws an exception if an object is not an instance of a prototype.

#### check.isEmptyObject (thing)

Returns `true` if something is an empty, non-null, non-array object,
`false` otherwise.

#### check.verifyEmptyObject (thing, message)

Throws an exception unless something is an empty, non-null, non-array object.

#### check.isObject (thing)

Returns `true` if something is a non-null, non-array object,
`false` otherwise.

#### check.verifyObject (thing, message)

Throws an exception unless something is a non-null, non-array object.

#### check.isLength (thing, length)

Returns `true` if something has a length property
that matches the specified length,
`false` otherwise.

#### check.verifyLength (thing, length, message)

Throws an exception unless something has a length property
matching the specified length.

#### check.isArray (thing)

Returns `true` something is an array,
`false` otherwise.

#### check.verifyArray (thing, message)

Throws an exception unless something is an array.

#### check.isFunction (thing)

Returns `true` if something is function,
`false` otherwise.

#### check.verifyFunction (thing, message)

Throws an exception unless something is function.

#### check.isUnemptyString (thing)

Returns `true` if something is a non-empty string,
`false` otherwise.

#### check.verifyUnemptyString (thing, message)

Throws an exception unless something is a non-empty string.

#### check.isString (thing)

Returns `true` if something is a string,
`false` otherwise.

#### check.verifyString (thing, message)

Throws an exception unless something is a string.

#### check.isPositiveNumber (thing)

Returns `true` if something is a number
greater than zero,
`false` otherwise.

#### check.verifyPositiveNumber (thing, message)

Throws an exception unless something is a number
greater than zero.

#### check.isNegativeNumber (thing)

Returns `true` if something is a number
less than zero,
`false` otherwise.

#### check.verifyNegativeNumber (thing, message)

Throws an exception unless something is a number
less than zero.

#### check.isEvenNumber (thing)

Returns `true` if something is an even number,
`false` otherwise.

#### check.verifyEvenNumber (thing, message)

Throws an exception unless something is an even number.

#### check.isOddNumber (thing)

Returns `true` if something is an even number,
`false` otherwise.

#### check.verifyOddNumber (thing, message)

Throws an exception unless something is an even number.

#### check.isNumber (thing)

Returns `true` if something is a number,
`false` otherwise.
In this case, `NaN` is not considered a number.

#### check.verifyNumber (thing, message)

Throws an exception unless something is a number.
In this case, `NaN` is not considered a number.

## Development

### Dependencies

The build environment relies on
Node.js,
[NPM],
[Jake],
[JSHint],
[Mocha],
[Chai] and
[UglifyJS].
Assuming that you already have Node.js and NPM set up,
you just need to run `npm install` to
install all of the dependencies as listed in `package.json`.

### Unit tests

The unit tests are in `test/check-types.js`.
You can run them with the command `npm test` or `jake test`.
To run the tests in a web browser,
open `test/check-types.html`.

[ci-image]: https://secure.travis-ci.org/philbooth/check-types.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/check-types.js
[node]: http://nodejs.org/
[browserify]: http://browserify.org/
[require]: http://requirejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

