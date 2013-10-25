# check-types.js

[![Build status][ci-image]][ci-status]

A tiny JavaScript library
for checking types
and throwing exceptions.

* [Why would I want that?](#why-would-i-want-that)
* [How tiny is it?](#how-tiny-is-it)
* [How do I install it?](#how-do-i-install-it)
* [How do I use it?](#how-do-i-use-it)
    * [Loading the library](#loading-the-library)
    * [Calling the exported functions](#calling-the-exported-functions)
        * [String functions](#string-functions)
        * [Number functions](#number-functions)
        * [Function functions](#function-functions)
        * [Array functions](#array-functions)
        * [Date functions](#date-functions)
        * [Object functions](#object-functions)
        * [Modifiers](#modifiers)
        * [Batch operations](#batch-operations)
        * [Some examples](#some-examples)
* [How do I set up the build environment?](#how-do-i-set-up-the-build-environment)
* [What license is it released under?](#what-license-is-it-released-under)

## Why would I want that?

Writing explicit conditions
in your functions
for checking arguments
and throwing exceptions
is a task that
swiftly becomes tiresome
and adds complexity
to your codebase.

The purpose of check-types.js
is to remove this burden
from JavaScript application developers
in an efficient and robust manner.

## How tiny is it?

17.7 kb unminified with comments, 2.9 kb minified, 1 kb minified + gzipped.

## How do I install it?

Any of the following will do:

```
npm install check-types

jam install check-types

bower install check-types

component install philbooth/check-types.js

git clone git@github.com:philbooth/check-types.js.git
```

## How do I use it?

### Loading the library

If you are running in
[Node.js][node],
[Browserify]
or another CommonJS-style
environment,
you can `require`
check-types.js like so:

```javascript
var check = require('check-types');
```

It also the supports
the AMD-style format
preferred by [Require.js][require]:

```javascript
require.config({
    paths: {
        check: 'check-types.js/src/check-types'
    }
});

require([ 'check' ], function (check) {
});
```

If you are
including check-types.js
with an HTML `<script>` tag,
or neither of the above environments
are detected,
check-types.js will just export its interface globally
as `check`.

### Calling the exported functions

Once you have loaded the library
in your application,
a whole bunch of functions are available
to call.

For the most part,
the exported functions
are broadly split into two types.

* `check.isXxxx(thing)`:
  These functions are predicates,
  returning true or false
  depending on the type and value of `thing`.

* `check.verifyXxxx(thing, message)`:
  These functions call
  their equivalent `isXxxx` predicate
  and throw an `Error`
  if the result is `false`.

Additionally, every exported function
is available with a `maybe` modifier
that simply returns `true` if the value is `null` or `undefined`,
otherwise it delegates to the original, unmodified function.
Calls to these functions look like
`check.maybe.isXxxx(thing)` and
`check.maybe.verifyXxxx(thing)`.

Finally, there are also some batch operations
that allow you to test maps
of many predicates at once.
These are implemented by
`check.map`,
`check.any` and
`check.every`.

#### String functions

* `check.isString(thing)`:
  Returns `true`
  if `thing` is a string,
  `false` otherwise.

* `check.verifyString(thing, message)`:
  Throws an exception
  unless `thing` is a string.

* `check.isUnemptyString(thing)`:
  Returns `true`
  if `thing` is a non-empty string,
  `false` otherwise.

* `check.verifyUnemptyString(thing, message)`:
  Throws an exception
  unless `thing` is a non-empty string.

* `check.isWebUrl(thing)`:
  Returns `true`
  if `thing` is an HTTP or HTTPS URL,
  `false` otherwise.

* `check.verifyWebUrl(thing, message)`:
  Throws an exception
  unless `thing` is an HTTP or HTTPS URL.

* `check.isLength(thing, length)`:
  Returns `true`
  if `thing` has a length property
  that matches the specified length,
  `false` otherwise.

* `check.verifyLength(thing, length, message)`:
  Throws an exception
  unless `thing` has a length property
  that matches the specified length.

#### Number functions

* `check.isNumber(thing)`:
  Returns `true`
  if `thing` is a number,
  `false` otherwise.
  In this case,
  `NaN` is not considered to be a number.

* `check.verifyNumber(thing, message)`:
  Throws an exception
  unless `thing` is a number.
  In this case,
  `NaN` is not considered to be a number.

* `check.isPositiveNumber(thing)`:
  Returns `true` if `thing` is a number
  greater than zero,
  `false` otherwise.

* `check.verifyPositiveNumber(thing, message)`:
  Throws an exception
  unless `thing` is a number
  greater than zero.

* `check.isNegativeNumber(thing)`:
  Returns `true`
  if `thing` is a number
  less than zero,
  `false` otherwise.

* `check.verifyNegativeNumber(thing, message)`:
  Throws an exception
  unless `thing` is a number
  less than zero.

* `check.isEvenNumber(thing)`:
  Returns `true`
  if `thing` is an even number,
  `false` otherwise.

* `check.verifyEvenNumber(thing, message)`:
  Throws an exception
  unless `thing` is an even number.

* `check.isOddNumber(thing)`:
  Returns `true`
  if `thing` is an odd number,
  `false` otherwise.

* `check.verifyOddNumber(thing, message)`:
  Throws an exception
  unless `thing` is an odd number.

#### Function functions

* `check.isFunction(thing)`:
  Returns `true`
  if `thing` is function,
  `false` otherwise.

* `check.verifyFunction(thing, message)`:
  Throws an exception
  unless `thing` is function.

#### Array functions

* `check.isArray(thing)`:
  Returns `true`
  if `thing` is an array,
  `false` otherwise.

* `check.verifyArray(thing, message)`:
  Throws an exception
  unless `thing` is an array.

* `check.isLength(thing, length)`:
  Returns `true`
  if `thing` has a length property
  that matches the specified length,
  `false` otherwise.

* `check.verifyLength(thing, length, message)`:
  Throws an exception
  unless `thing` has a length property
  that matches the specified length.

#### Date functions

* `check.isDate(thing)`:
  Returns `true`
  if `thing` is a date,
  `false` otherwise.

* `check.verifyDate(thing, message)`:
  Throws an exception
  unless `thing` is a date.

#### Object functions

* `check.isObject(thing)`:
  Returns `true`
  if `thing` is a non-null, non-array, non-date object,
  `false` otherwise.

* `check.verifyObject(thing, message)`:
  Throws an exception
  unless `thing` is a non-null, non-array, non-date object.

* `check.isEmptyObject(thing)`:
  Returns `true`
  if `thing` is an empty object,
  `false` otherwise.

* `check.verifyEmptyObject(thing, message)`:
  Throws an exception
  unless `thing` is an empty object.

* `check.isInstance(thing, prototype)`:
  Returns `true`
  if `thing` is an instance of `prototype`,
  `false` otherwise.

* `check.verifyInstance(thing, prototype, message)`:
  Throws an exception
  unless `thing` is an instance of `prototype`.

* `check.quacksLike(thing, duck)`:
  Tests whether an object 'quacks like a duck'.
  Returns `true`
  if `thing` has all of the properties of `duck`,
  `false` otherwise.
  If either argument is not an object,
  an exception is thrown.

* `check.verifyQuack(thing, duck, message)`:
  Throws an exception
  unless `thing` has all of the properties of `duck`.

#### Modifiers

* `check.maybe.isXxxx(...)` / `check.maybe.verifyXxxx(...)`:
  Returns `true`
  if `thing` is `null` or `undefined`,
  otherwise it delegates to
  the original, unmodified function.

#### Batch operations

* `check.map(things, functions)`:
  Maps each predicate from the `functions` object
  to the corresponding value from `things`,
  returning the hash of results.
  Similar to `quacksLike`
  but using functions instead of values.
  Supports nested objects.

* `check.every(predicateResults)`:
  Returns `true`
  if all properties of the `predicateResults` object are `true`,
  `false` otherwise.

* `check.any(predicateResults)`:
  Returns `true`
  is any property of the `predicateResults` object is `true`,
  `false` otherwise.

#### Some examples

```javascript
check.isObject(null);
// Returns false
```

```javascript
check.maybe.isObject(null);
// Returns true
```

```javascript
check.verifyQuack({}, { foo: 'bar' }, 'Invalid object');
// Throws new Error('Invalid object')
```

```javascript
check.maybe.verifyQuack(undefined, { foo: 'bar' }, 'Invalid object');
// Doesn't throw
```

```javascript
check.map({
    foo: 2,
    bar: {
        baz: 'qux'
    }
}, {
    foo: check.isOddNumber,
    bar: {
        baz: check.isUnemptyString
    }
});
// Returns { foo: false, bar: { baz: true } }
```

```javascript
check.every(
    check.map({
        foo: 0,
        bar: ''
    }, {
        foo: check.isNumber,
        bar: check.isUnemptyString
    })
);
// Returns false
```

```javascript
check.any(
    check.map({
        foo: 0,
        bar: ''
    }, {
        foo: check.isNumber,
        bar: check.isUnemptyString
    })
);
// Returns true
```

## How do I set up the build environment?

The build environment relies on
Node.js,
[NPM],
[JSHint],
[Mocha],
[Chai] and
[UglifyJS].
Assuming that you already have Node.js and NPM set up,
you just need to run `npm install` to
install all of the dependencies as listed in `package.json`.

The unit tests are in `test/check-types.js`.
You can run them with the command `npm test`.
To run the tests in a web browser,
open `test/check-types.html`.

## What license is it released under?

[MIT][license]

[ci-image]: https://secure.travis-ci.org/philbooth/check-types.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/check-types.js
[node]: http://nodejs.org/
[browserify]: http://browserify.org/
[require]: http://requirejs.org/
[npm]: https://npmjs.org/
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS
[license]: https://github.com/philbooth/check-types.js/blob/master/COPYING

