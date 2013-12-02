# check-types.js

[![Build status][ci-image]][ci-status]

A tiny JavaScript library
for checking arguments
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
* [What changed from 0.x to 1.x?](#what-changed-from-0x-to-1x)
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
in an efficient and robust manner,
abstracted by a simple API.

## How tiny is it?

11.9 kb unminified with comments, 2.7 kb minified, 1 kb minified + gzipped.

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
are broadly split into three types.

* `check.xxx(thing)`:
  These functions are predicates,
  returning true or false
  depending on the type and value of `thing`.

* `check.maybe.xxx(thing)`:
  The maybe modifier
  returns `true` if `thing` is `null` or `undefined`,
  otherwise it returns the result
  of the equivalent predicate.

* `check.verify.xxx(thing, message)`:
  The verify modifier
  calls the equivalent predicate
  and throws an `Error`
  if the result is `false`.
  It can also be applied
  to maybe modifiers
  using the form
  `check.verify.maybe.xxx(thing, message)`.

Additionally, there are some batch operations
that allow you to test maps
of many predicates at once.
These are implemented by
`check.map`,
`check.any` and
`check.every`.

#### String functions

* `check.string(thing)`:
  Returns `true`
  if `thing` is a string,
  `false` otherwise.

* `check.unemptyString(thing)`:
  Returns `true`
  if `thing` is a non-empty string,
  `false` otherwise.

* `check.webUrl(thing)`:
  Returns `true`
  if `thing` is an HTTP or HTTPS URL,
  `false` otherwise.

* `check.length(thing, value)`:
  Returns `true`
  if `thing` has a length property
  that equals `value`,
  `false` otherwise.

#### Number functions

* `check.number(thing)`:
  Returns `true`
  if `thing` is a number,
  `false` otherwise.
  In this case,
  `NaN` is not considered a number.

* `check.positiveNumber(thing)`:
  Returns `true` if `thing` is a number
  greater than zero,
  `false` otherwise.

* `check.negativeNumber(thing)`:
  Returns `true`
  if `thing` is a number
  less than zero,
  `false` otherwise.

* `check.oddNumber(thing)`:
  Returns `true`
  if `thing` is an odd number,
  `false` otherwise.

* `check.evenNumber(thing)`:
  Returns `true`
  if `thing` is an even number,
  `false` otherwise.

#### Function functions

* `check.fn(thing)`:
  Returns `true`
  if `thing` is a function,
  `false` otherwise.

#### Array functions

* `check.array(thing)`:
  Returns `true`
  if `thing` is an array,
  `false` otherwise.

* `check.length(thing, value)`:
  Returns `true`
  if `thing` has a length property
  that equals `value`,
  `false` otherwise.

#### Date functions

* `check.date(thing)`:
  Returns `true`
  if `thing` is a date,
  `false` otherwise.

#### Object functions

* `check.object(thing)`:
  Returns `true`
  if `thing` is a non-null, non-array, non-date object,
  `false` otherwise.

* `check.emptyObject(thing)`:
  Returns `true`
  if `thing` is an empty object,
  `false` otherwise.

* `check.instance(thing, prototype)`:
  Returns `true`
  if `thing` is an instance of `prototype`,
  `false` otherwise.

* `check.like(thing, duck)`:
  Duck-typing checker.
  Returns `true`
  if `thing` has all of the properties of `duck`,
  `false` otherwise.
  If either argument is not an object,
  an exception is thrown.

#### Modifiers

* `check.maybe.xxx(...)`:
  Returns `true`
  if `thing` is `null` or `undefined`,
  otherwise it propagates
  the return value
  from its predicate.

* `check.verify.xxx(...)` / `check.verify.maybe.xxx(...)`:
  Throws an `Error`
  if the predicate returns false.
  The last argument
  is an optional message
  to be set on the `Error` instance.

#### Batch operations

* `check.map(things, functions)`:
  Maps each predicate from the `functions` object
  to the corresponding value from `things`,
  returning the hash of results.
  Similar to `like`
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
check.object(null);
// Returns false
```

```javascript
check.maybe.object(null);
// Returns true
```

```javascript
check.verify.like({}, { foo: 'bar' }, 'Invalid object');
// Throws new Error('Invalid object')
```

```javascript
check.verify.maybe.like(undefined, { foo: 'bar' }, 'Invalid object');
// Doesn't throw
```

```javascript
check.map({
    foo: 2,
    bar: {
        baz: 'qux'
    }
}, {
    foo: check.oddNumber,
    bar: {
        baz: check.unemptyString
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
        foo: check.number,
        bar: check.unemptyString
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
        foo: check.number,
        bar: check.unemptyString
    })
);
// Returns true
```

## What changed from 0.x to 1.x?

Breaking changes
were made to the API
in version 1.0.0.

Specifically,
all of the predicates
were renamed
from `check.isXxxx`
to `check.xxx` and
all of the verifiers
were renamed
from `check.verifyXxxx`
to `check.verify.xxx`.

See the [history]
for more details.

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
[history]: https://github.com/philbooth/check-types.js/blob/master/HISTORY.md
[npm]: https://npmjs.org/
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS
[license]: https://github.com/philbooth/check-types.js/blob/master/COPYING

