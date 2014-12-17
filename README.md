# check-types.js

[![Build status][ci-image]][ci-status]

A tiny JavaScript library
for asserting types
and values.

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
        * [Boolean functions](#boolean-functions)
        * [Modifiers](#modifiers)
        * [Batch operations](#batch-operations)
        * [Some examples](#some-examples)
* [Where can I use it?](#where-can-i-use-it)
* [What changed from 1.x to 2.x?](#what-changed-from-1x-to-2x)
* [What changed from 0.x to 1.x?](#what-changed-from-0x-to-1x)
* [How do I set up the build environment?](#how-do-i-set-up-the-build-environment)
* [What license is it released under?](#what-license-is-it-released-under)

## Why would I want that?

Writing explicit conditions
in your functions
to check arguments
and throw exceptions
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

14 kb unminified with comments, 3.7 kb minified, 1.4 kb minified + gzipped.

## How do I install it?

If you're using npm:

```
npm install check-types --save
```

Or if you just want the git repo:

```
git clone git@github.com:philbooth/check-types.js.git
```

If you're into
other package managers,
it is also available
from Bower, Component and Jam.

## How do I use it?

### Loading the library

If you are running in
Node.js,
Browserify
or another CommonJS-style
environment,
you can `require`
check-types.js like so:

```javascript
var check = require('check-types');
```

It also the supports
the AMD-style format
preferred by Require.js.

If you are
including check-types.js
with an HTML `<script>` tag,
or neither of the above environments
are detected,
it will export the interface globally as `check`.

### Calling the exported functions

Once you have loaded the library
in your application,
a whole bunch of functions are available
to call.

For the most part,
the exported functions
are broadly split into four types.

* `check.xxx(thing)`:
  These functions are predicates,
  returning true or false
  depending on the type and value of `thing`.

* `check.not.xxx(thing)`:
  The `not` modifier
  negates a predicate,
  returning `true` if the predicate returns `false`
  and `false` if the predicate returns `true`.

* `check.maybe.xxx(thing)`:
  The `maybe` modifier
  returns `true` if `thing` is `null` or `undefined`,
  otherwise it returns the result
  of the predicate.

* `check.either.xxx(thing).or.yyy(thang)`:
  The `either` modifier
  returns `true` if either predicate is true,
  it will only return `false`
  when both predicates are false.

* `check.assert.xxx(thing, message)`:
  The assert modifier
  calls the equivalent predicate
  and throws an `Error`
  if the result is `false`.
  It can also be applied
  to the `not`, `maybe` and `either` modifiers
  using the forms
  `check.assert.not.xxx(thing, message)`,
  `check.assert.maybe.xxx(thing, message)`
  and
  `check.assert.either.xxx(thing, message).or.yyy(thang)`.

Additionally, there are some batch operations
that allow you to apply predicates
across multiple values
inside arrays or objects.
These are implemented by
`check.apply`,
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
  if `thing` seems like an HTTP or HTTPS URL,
  `false` otherwise.

* `check.length(thing, value)`:
  Returns `true`
  if `thing` has a length property
  that equals `value`,
  `false` otherwise.
  If `value` is undefined,
  an exception is thrown.

#### Number functions

* `check.number(thing)`:
  Returns `true`
  if `thing` is a number,
  `false` otherwise.
  Note that
  `NaN`,
  `Number.POSITIVE_INFINITY` and
  `Number.NEGATIVE_INFINITY`
  are not considered numbers here.

* `check.positive(thing)`:
  Returns `true` if `thing` is a number
  greater than zero,
  `false` otherwise.

* `check.negative(thing)`:
  Returns `true`
  if `thing` is a number
  less than zero,
  `false` otherwise.

* `check.odd(thing)`:
  Returns `true`
  if `thing` is an odd number,
  `false` otherwise.

* `check.even(thing)`:
  Returns `true`
  if `thing` is an even number,
  `false` otherwise.

* `check.integer(thing)`:
  Returns `true`
  if `thing` is an integer,
  `false` otherwise.

#### Function functions

* `check.function(thing)`:
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
  If `value` is undefined,
  an exception is thrown.

#### Date functions

* `check.date(thing)`:
  Returns `true`
  if `thing` is a date,
  `false` otherwise.

#### Object functions

* `check.object(thing)`:
  Returns `true`
  if `thing` is a plain-old JavaScript object,
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

* `check.null(thing)`:
  Returns `true`
  if `thing` is `null`,
  `false` otherwise.

* `check.undefined(thing)`:
  Returns `true`
  if `thing` is `undefined`,
  `false` otherwise.

* `check.assigned(thing)`:
  Returns `true`
  if `thing` is not
  `null` or `undefined`,
  `false` otherwise.

#### Boolean functions

* `check.boolean(thing)`:
  Returns `true`
  if `thing` is a boolean,
  `false` otherwise.

#### Modifiers

* `check.not.xxx(...)`:
  Returns the negation
  of the predicate.

* `check.maybe.xxx(...)`:
  Returns `true`
  if `thing` is `null` or `undefined`,
  otherwise it propagates
  the return value
  from its predicate.

* `check.either.xxx(...).or.yyy(...)`:
  Returns `true`
  if either predicate is true.
  Returns `false`
  if both predicates are false.

* `check.assert.xxx(...)`:
  Throws an `Error`
  if the predicate returns false.
  The last argument
  is an optional message
  to be set on the `Error` instance.
  Also works with the `not`, `maybe` and `either` modifiers.

#### Batch operations

* `check.apply(things, predicates)`:
  Applies each value from the array of things
  to the corresponding predicate
  and returns the array of results.
  Passing a single predicate
  instead of an array of them
  applies all of the values
  to that predicate.

* `check.map(things, predicates)`:
  Maps each value from the data
  to the corresponding predicate
  and returns a results object.
  Supports nested objects.

* `check.all(results)`:
  Returns `true`
  if all the result values are true
  in an array (returned from `apply`)
  or object (returned from `map`).

* `check.any(predicateResults)`:
  Returns `true`
  if any result value is true
  in an array (returned from `apply`)
  or object (returned from `map`).

#### Some examples

```javascript
check.even(3);
// Returns false
```

```javascript
check.not.even(3);
// Returns true
```

```javascript
check.maybe.even(null);
// Returns true
```

```javascript
check.either.even(3).or.odd(3);
// Returns true
```

```javascript
check.assert.like({ foo: 'bar' }, { baz: 'qux' }, 'Invalid object');
// Throws new Error('Invalid object')
```

```javascript
check.assert.not.like({ foo: 'bar' }, { baz: 'qux' }, 'Invalid object');
// Doesn't throw
```

```javascript
check.assert.maybe.like(undefined, { foo: 'bar' }, 'Invalid object');
// Doesn't throw
```

```javascript
check.assert.either.unemptyString(error, 'Invalid error').or.instance(error, Error);
// Throws if `error` is not an error string or Error instance
```

```javascript
check.apply([ 'foo', 'bar', '' ], check.unemptyString);
// Returns false
```

```javascript
check.map({
    foo: 2,
    bar: { baz: 'qux' }
}, {
    foo: check.odd,
    bar: { baz: check.unemptyString }
});
// Returns { foo: false, bar: { baz: true } }
```

```javascript
check.all(
    check.map(
        { foo: 0, bar: '' },
        { foo: check.number, bar: check.string }
    );
);
// Returns true
```

```javascript
check.any(
    check.apply(
        [ 1, 2, 3, '' ],
        check.string
    )
);
// Returns true
```

## Where can I use it?

As of version 2.0,
this library no longer supports ES3.
That means you can't use it
in IE 7 or 8.

Everywhere else should be fine.

If those versions of IE
are important to you,
there is hope!
The 1.x versions
all support old IE
and any future 1.x versions
will adhere to that.

See the [releases]
for more information.

## What changed from 1.x to 2.x?

Breaking changes
were made to the API
in version 2.0.0.

Specifically:

* Support for ES3 was dropped
* The predicates `gitUrl`, `email` and `floatNumber` were removed.
* `verify` was renamed to `assert`.
* `nulled` was renamed to `null`.
* `oddNumber` was renamed to `odd`.
* `evenNumber` was renamed to `even`.
* `positiveNumber` was renamed to `positive`.
* `negativeNumber` was renamed to `negative`.
* `intNumber` was renamed to `integer`.
* `bool` was renamed to `boolean`.
* `defined` was swapped to become `undefined`.
* `webUrl` was tightened to reject more cases.
* The `assigned` predicate and the `apply` batch operation were added.

See the [history][history2]
for more details.

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

See the [history][history1]
for more details.

## How do I set up the build environment?

The build environment relies on
[Node.js][node],
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
[releases]: https://github.com/philbooth/check-types.js/releases
[history2]: https://github.com/philbooth/check-types.js/blob/master/HISTORY.md#20
[history1]: https://github.com/philbooth/check-types.js/blob/master/HISTORY.md#10
[node]: http://nodejs.org/
[npm]: https://npmjs.org/
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS
[license]: https://github.com/philbooth/check-types.js/blob/master/COPYING

