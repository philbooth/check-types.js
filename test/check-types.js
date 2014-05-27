/*globals require, chai */

(function (require) {
    'use strict';

    var assert, modulePath;

    if (typeof require === 'undefined') {
        assert = chai.assert;
        require = function () { return check; };
    } else {
        assert = require('chai').assert;
        modulePath = '../src/check-types';
    }

    suite('no setup:', function () {
        test('require does not throw', function () {
            assert.doesNotThrow(function () {
                require(modulePath);
            });
        });

        test('require returns object', function () {
            assert.isObject(require(modulePath));
        });
    });

    suite('require:', function () {
        var check;

        setup(function () {
            check = require(modulePath);
        });

        teardown(function () {
            check = undefined;
        });

        test('like function is defined', function () {
            assert.isFunction(check.like);
        });

        test('like without arguments throws', function () {
            assert.throws(function () {
                check.like();
            });
        });

        test('like with two object arguments does not throw', function () {
            assert.doesNotThrow(function () {
                check.like({}, {});
            });
        });

        test('like with function first argument throws', function () {
            assert.throws(function () {
                check.like(function () {}, {});
            });
        });

        test('like with null first argument throws', function () {
            assert.throws(function () {
                check.like(null, {});
            });
        });

        test('like with function second argument throws', function () {
            assert.throws(function () {
                check.like({}, function () {});
            });
        });

        test('like with null second argument throws', function () {
            assert.throws(function () {
                check.like({}, null);
            });
        });

        test('like with two empty object arguments returns true', function () {
            assert.isTrue(check.like({}, {}));
        });

        test('like with foo bar properties returns false', function () {
            assert.isFalse(check.like({ foo: {} }, { bar: {} }));
        });

        test('like with foo foo properties returns true', function () {
            assert.isTrue(check.like({ foo: {} }, { foo: {} }));
        });

        test('like with bar baz second properties returns false', function () {
            assert.isFalse(check.like({ foo: {}, bar: {} }, { foo: {}, baz: {} }));
        });

        test('like with bar bar second properties returns true', function () {
            assert.isTrue(check.like({ foo: (function () {}), bar: {} }, { foo: (function () {}), bar: {} }));
        });

        test('like with differently typed bar bar second properties returns false', function () {
            assert.isFalse(check.like({ foo: (function () {}), bar: {} }, { foo: (function () {}), bar: (function () {}) }));
        });

        test('like with different nested objects returns false', function() {
            assert.isFalse(check.like({ foo: { bar: { qux: 'string' }, baz: 23 }},
                                            { foo: { bar: { qux: 123      }, baz: 66 }}));
        });

        test('like with alike nested objects returns true', function() {
            assert.isTrue(check.like({ foo: { bar: { qux: 'string' }, baz: 23 }},
                                     { foo: { bar: { qux: 'other'  }, baz: 66 }}));
        });

        test('instance function is defined', function () {
            assert.isFunction(check.instance);
        });

        test('instance with new Error and Error returns true', function () {
            assert.isTrue(check.instance(new Error(), Error));
        });

        test('instance with object and Error returns false', function () {
            assert.isFalse(check.instance({}, Error));
        });

        test('instance with null and null returns false', function () {
            assert.isFalse(check.instance(null, null));
        });

        test('instance with object and Object returns true', function () {
            assert.isTrue(check.instance({}, Object));
        });

        test('instance with null and Object returns false', function () {
            assert.isFalse(check.instance(null, Object));
        });

        test('instance with array and Array returns true', function () {
            assert.isTrue(check.instance([], Array));
        });

        test('instance with Object and object returns false', function () {
            assert.isFalse(check.instance(Object, {}));
        });

        test('emptyObject function is defined', function () {
            assert.isFunction(check.emptyObject);
        });

        test('emptyObject with empty object returns true', function () {
            assert.isTrue(check.emptyObject({}));
        });

        test('emptyObject with empty array returns false', function () {
            assert.isFalse(check.emptyObject([]));
        });

        test('emptyObject with null returns false', function () {
            assert.isFalse(check.emptyObject(null));
        });

        test('emptyObject with non-empty object returns false', function () {
            assert.isFalse(check.emptyObject({ foo: 'bar' }));
        });

        test('nulled function is defined', function () {
            assert.isFunction(check.nulled);
        });

        test('nulled with null returns true', function () {
            assert.isTrue(check.nulled(null));
        });

        test('nulled with string returns false', function () {
            assert.isFalse(check.nulled('null'));
        });

        test('nulled with empty string returns false', function () {
            assert.isFalse(check.nulled(''));
        });

        test('nulled with undefined returns false', function () {
            assert.isFalse(check.nulled(undefined));
        });

        test('nulled with object returns false', function () {
            assert.isFalse(check.nulled({}));
        });

        test('defined function is defined', function () {
            assert.isFunction(check.defined);
        });

        test('defined with undefined returns false', function () {
            assert.isFalse(check.defined(undefined));
        });

        test('defined with string returns true', function () {
            assert.isTrue(check.defined('undefined'));
        });

        test('defined with object returns true', function () {
            assert.isTrue(check.defined({}));
        });

        test('defined with null returns true', function () {
            assert.isTrue(check.defined(null));
        });

        test('object function is defined', function () {
            assert.isFunction(check.object);
        });

        test('object with object returns true', function () {
            assert.isTrue(check.object({}));
        });

        test('object with null returns false', function () {
            assert.isFalse(check.object(null));
        });

        test('object with string returns false', function () {
            assert.isFalse(check.object('{}'));
        });

        test('object with array returns false', function () {
            assert.isFalse(check.object([]));
        });

        test('object with date returns false', function () {
            assert.isFalse(check.object(new Date()));
        });

        test('length function is defined', function () {
            assert.isFunction(check.length);
        });

        test('length with matching undefined length returns true', function () {
            assert.isTrue(check.length({}));
        });

        test('length with contrasting undefined length returns false', function () {
            assert.isFalse(check.length({}, 7));
        });

        test('length with matching length on array returns true', function () {
            assert.isTrue(check.length([ 'foo', 'bar' ], 2));
        });

        test('length with contrasting length on array returns false', function () {
            assert.isFalse(check.length([ 'foo', 'bar', 'baz' ], 2));
        });

        test('length with matching length on object returns true', function () {
            assert.isTrue(check.length({ length: 1 }, 1));
        });

        test('length with contrasting length on object returns false', function () {
            assert.isFalse(check.length({ length: 1 }, 2));
        });

        test('array function is defined', function () {
            assert.isFunction(check.array);
        });

        test('array with array returns true', function () {
            assert.isTrue(check.array([]));
        });

        test('array with null returns false', function () {
            assert.isFalse(check.array(null));
        });

        test('array with string returns false', function () {
            assert.isFalse(check.array('[]'));
        });

        test('array with object returns false', function () {
            assert.isFalse(check.array({}));
        });

        test('date function is defined', function () {
            assert.isFunction(check.date);
        });

        test('date with date returns true', function () {
            assert.isTrue(check.date(new Date()));
        });

        test('date with object returns false', function () {
            assert.isFalse(check.date({}));
        });

        test('date with null returns false', function () {
            assert.isFalse(check.date(null));
        });

        test('date with string returns false', function () {
            assert.isFalse(check.date('new Date()'));
        });

        test('fn function is defined', function () {
            assert.isFunction(check.fn);
        });

        test('fn with function returns true', function () {
            assert.isTrue(check.fn(function () {}));
        });

        test('fn with null returns false', function () {
            assert.isFalse(check.fn(null));
        });

        test('fn with string returns false', function () {
            assert.isFalse(check.fn('function () {}'));
        });

        test('fn with object returns false', function () {
            assert.isFalse(check.fn({}));
        });

        test('webUrl function is defined', function () {
            assert.isFunction(check.webUrl);
        });

        test('webUrl with https: URL returns true', function () {
            assert.isTrue(check.webUrl('https://example.com/'));
        });

        test('webUrl with ftp: URL returns false', function () {
            assert.isFalse(check.webUrl('ftp://example.com/'));
        });

        test('webUrl with http: URL returns true', function () {
            assert.isTrue(check.webUrl('http://127.0.0.1:8080/'));
        });

        test('webUrl with protocol-relative URL returns false', function () {
            assert.isFalse(check.webUrl('//example.com/'));
        });

        test('webUrl with httpss scheme returns false', function () {
            assert.isFalse(check.webUrl('httpss://'));
        });

        test('webUrl without domain returns false', function () {
            assert.isFalse(check.webUrl('http://'));
        });

        test('webUrl with object returns false', function () {
            assert.isFalse(check.webUrl({ toString: function () { return 'https://example.com/'; } }));
        });

        test('webUrl with number returns false', function () {
            assert.isFalse(check.webUrl(42));
        });

        test('gitUrl function is defined', function () {
            assert.isFunction(check.gitUrl);
        });

        test('gitUrl with git+ssh: URL returns true', function () {
            assert.isTrue(check.gitUrl('git+ssh://example.com/'));
        });

        test('gitUrl with git+http: URL returns true', function () {
            assert.isTrue(check.gitUrl('git+http://example.com/'));
        });

        test('gitUrl with git+https: URL returns true', function () {
            assert.isTrue(check.gitUrl('git+https://example.com/'));
        });

        test('gitUrl with http: URL returns false', function () {
            assert.isFalse(check.gitUrl('http://example.com/'));
        });

        test('gitUrl with protocol-relative URL returns false', function () {
            assert.isFalse(check.gitUrl('//example.com/'));
        });

        test('gitUrl with httpss scheme returns false', function () {
            assert.isFalse(check.gitUrl('git+httpss://'));
        });

        test('gitUrl without domain returns false', function () {
            assert.isFalse(check.gitUrl('git+ssh://'));
        });

        test('gitUrl with object returns false', function () {
            assert.isFalse(check.gitUrl({ toString: function () { return 'git+ssh://example.com/'; } }));
        });

        test('gitUrl with number returns false', function () {
            assert.isFalse(check.gitUrl(42));
        });

        test('email function is defined', function () {
            assert.isFunction(check.email);
        });

        test('email with user@host.tld returns true', function () {
            assert.isTrue(check.email('user@host.tld'));
        });

        test('email with user.other@host.tld returns true', function () {
            assert.isTrue(check.email('user.other@host.tld'));
        });

        test('email with user.other@sub.host.tld returns true', function () {
            assert.isTrue(check.email('user.other@sub.host.tld'));
        });

        test('email with @ returns false', function () {
            assert.isFalse(check.email('@'));
        });

        test('email with object returns false', function () {
            assert.isFalse(check.email({ toString: function () { return 'user@host.tld'; } }));
        });

        test('email with number returns false', function () {
            assert.isFalse(check.email(42));
        });

        test('unemptyString function is defined', function () {
            assert.isFunction(check.unemptyString);
        });

        test('unemptyString with string foo returns true', function () {
            assert.isTrue(check.unemptyString('foo'));
        });

        test('unemptyString with null returns false', function () {
            assert.isFalse(check.unemptyString(null));
        });

        test('unemptyString with empty string returns false', function () {
            assert.isFalse(check.unemptyString(''));
        });

        test('unemptyString with object returns false', function () {
            assert.isFalse(check.unemptyString({}));
        });

        test('unemptyString with string bar returns true', function () {
            assert.isTrue(check.unemptyString('bar'));
        });

        test('string function is defined', function () {
            assert.isFunction(check.string);
        });

        test('string with string foo returns true', function () {
            assert.isTrue(check.string('foo'));
        });

        test('string with empty string returns true', function () {
            assert.isTrue(check.string(''));
        });

        test('string with object returns false', function () {
            assert.isFalse(check.string({}));
        });

        test('oddNumber function is defined', function () {
            assert.isFunction(check.oddNumber);
        });

        test('oddNumber with odd number returns true', function () {
            assert.isTrue(check.oddNumber(1));
        });

        test('oddNumber with even number returns false', function () {
            assert.isFalse(check.oddNumber(2));
        });

        test('oddNumber with negative odd number returns true', function () {
            assert.isTrue(check.oddNumber(-3));
        });

        test('oddNumber with negative even number returns false', function () {
            assert.isFalse(check.oddNumber(-4));
        });

        test('oddNumber with floating point number returns false', function () {
            assert.isFalse(check.evenNumber(5.5));
        });

        test('oddNumber with string returns false', function () {
            assert.isFalse(check.oddNumber('1'));
        });

        test('evenNumber function is defined', function () {
            assert.isFunction(check.evenNumber);
        });

        test('evenNumber with even number returns true', function () {
            assert.isTrue(check.evenNumber(2));
        });

        test('evenNumber with odd number returns false', function () {
            assert.isFalse(check.evenNumber(3));
        });

        test('evenNumber with negative even number returns true', function () {
            assert.isTrue(check.evenNumber(-4));
        });

        test('evenNumber with negative odd number returns false', function () {
            assert.isFalse(check.evenNumber(-5));
        });

        test('evenNumber with floating point number returns false', function () {
            assert.isFalse(check.evenNumber(2.4));
        });

        test('evenNumber with string returns false', function () {
            assert.isFalse(check.evenNumber('2'));
        });

        test('positiveNumber function is defined', function () {
            assert.isFunction(check.positiveNumber);
        });

        test('positiveNumber with positive integer returns true', function () {
            assert.isTrue(check.positiveNumber(1));
        });

        test('positiveNumber with negative integer returns false', function () {
            assert.isFalse(check.positiveNumber(-1));
        });

        test('positiveNumber with positive fraction returns true', function () {
            assert.isTrue(check.positiveNumber(1/2));
        });

        test('positiveNumber with negative fraction returns false', function () {
            assert.isFalse(check.positiveNumber(-1/2));
        });

        test('positiveNumber with positive infinity returns false', function () {
            assert.isFalse(check.positiveNumber(Number.POSITIVE_INFINITY));
        });

        test('positiveNumber with negative infinity returns false', function () {
            assert.isFalse(check.positiveNumber(Number.NEGATIVE_INFINITY));
        });

        test('positiveNumber with NaN returns false', function () {
            assert.isFalse(check.positiveNumber(NaN));
        });

        test('positiveNumber with string returns false', function () {
            assert.isFalse(check.positiveNumber('1'));
        });

        test('negativeNumber function is defined', function () {
            assert.isFunction(check.negativeNumber);
        });

        test('negativeNumber with positive integer returns false', function () {
            assert.isFalse(check.negativeNumber(1));
        });

        test('negativeNumber with negative integer returns true', function () {
            assert.isTrue(check.negativeNumber(-1));
        });

        test('negativeNumber with positive fraction returns false', function () {
            assert.isFalse(check.negativeNumber(1/2));
        });

        test('negativeNumber with negative fraction returns true', function () {
            assert.isTrue(check.negativeNumber(-1/2));
        });

        test('negativeNumber with positive infinity returns false', function () {
            assert.isFalse(check.negativeNumber(Number.POSITIVE_INFINITY));
        });

        test('negativeNumber with negative infinity returns false', function () {
            assert.isFalse(check.negativeNumber(Number.NEGATIVE_INFINITY));
        });

        test('negativeNumber with NaN returns false', function () {
            assert.isFalse(check.negativeNumber(NaN));
        });

        test('negativeNumber with string returns false', function () {
            assert.isFalse(check.negativeNumber('-1'));
        });

        test('intNumber function is defined', function () {
            assert.isFunction(check.intNumber);
        });

        test('intNumber with integer returns true', function () {
            assert.isTrue(check.intNumber(1));
        });

        test('intNumber with floating point number returns false', function () {
            assert.isFalse(check.intNumber(0.5));
        });

        test('intNumber with infinity returns false', function () {
            assert.isFalse(check.intNumber(Infinity));
        });

        test('intNumber with NaN returns false', function () {
            assert.isFalse(check.intNumber(NaN));
        });

        test('intNumber with string returns false', function () {
            assert.isFalse(check.intNumber('1'));
        });

        test('floatNumber function is defined', function () {
            assert.isFunction(check.floatNumber);
        });

        test('floatNumber with integer returns false', function () {
            assert.isFalse(check.floatNumber(2));
        });

        test('floatNumber with float returns true', function () {
            assert.isTrue(check.floatNumber(1.1));
        });

        test('floatNumber with infinity returns false', function () {
            assert.isFalse(check.floatNumber(Infinity));
        });

        test('floatNumber with NaN returns false', function () {
            assert.isFalse(check.floatNumber(NaN));
        });

        test('floatNumber with string returns false', function () {
            assert.isFalse(check.floatNumber('1.1'));
        });

        test('number function is defined', function () {
            assert.isFunction(check.number);
        });

        test('number with positive integer returns true', function () {
            assert.isTrue(check.number(1));
        });

        test('number with negative integer returns true', function () {
            assert.isTrue(check.number(-1));
        });

        test('number with fraction returns true', function () {
            assert.isTrue(check.number(1/2));
        });

        test('number with positive infinity returns false', function () {
            assert.isFalse(check.number(Number.POSITIVE_INFINITY));
        });

        test('number with negative infinity returns false', function () {
            assert.isFalse(check.number(Number.NEGATIVE_INFINITY));
        });

        test('number with infinity returns false', function () {
            assert.isFalse(check.number(Number.Infinity));
        });

        test('number with NaN returns false', function () {
            assert.isFalse(check.number(NaN));
        });

        test('number with object returns false', function () {
            assert.isFalse(check.number({}));
        });

        test('number with string returns false', function () {
            assert.isFalse(check.number('1'));
        });

        test('map function is defined', function () {
            assert.isFunction(check.map);
        });

        test('map with invalid object throws', function() {
            assert.throws(function () {
                check.map(null, { foo: check.string });
            });
        });

        test('map with invalid predicates throws', function() {
            assert.throws(function() {
                check.map({ foo: 'test' }, null);
            });
        });

        test('map with valid object and predicates does not throw', function() {
            assert.doesNotThrow(function() {
                check.map({ foo: 'test' }, { foo: check.string });
            });
        });

        test('map with valid object and predicates returns the predicates results', function() {
            var result = check.map({ foo: 'test', bar: 33 },
                                   { foo: check.string,
                                     bar: check.evenNumber });
            assert.deepEqual(result, { foo: true, bar: false });
        });

        test('map with undefined properties in thing still calls corresponding predicate', function() {
            assert.throws(function() {
                check.map({ bar: 33 }, { foo: check.verify.string });
            });
        });

        test('map with nested objects and predicates returns the predicates results', function() {
            var result = check.map({ foo: { bar: 20 } },
                                   { foo: { bar: check.evenNumber } });
            assert.deepEqual(result, { foo: { bar: true } });
        });

        test('map with verifier functions does not throw when valid', function() {
            assert.doesNotThrow(function() {
                check.map({ foo: 'bar', baz: 123 },
                          { foo: check.verify.string,
                            baz: check.verify.number });
            });
        });

        test('map with verifier functions throws when invalid', function() {
            assert.throws(function() {
                check.map({ foo: 'bar', baz: 123 },
                          { foo: check.verify.number });
            });
        });

        test('every function is defined', function () {
            assert.isFunction(check.every);
        });

        test('every with invalid object throws', function() {
            assert.throws(function() {
                check.every(null);
            });
        });


        test('every with valid object does not throw', function() {
            assert.doesNotThrow(function() {
                check.every({ foo: true });
            });
        });

        test('every with valid object evaluates the conjunction of all values', function() {
            assert.isTrue(check.every({ foo: true, bar: true, baz: true }));
            assert.isFalse(check.every({ foo: true, bar: true, baz: false }));
        });

        test('every with nested objects evaluates the conjunction of all values', function() {
            assert.isTrue(check.every({ foo: true, bar: { baz: true } }));
            assert.isFalse(check.every({ foo: { bar : { baz : false }, bat: true } }));
        });

        test('any function is defined', function () {
            assert.isFunction(check.any);
        });

        test('any with invalid object throws', function() {
            assert.throws(function() {
                check.any(null);
            });
        });

        test('any with valid object does not throw', function() {
            assert.doesNotThrow(function() {
                check.any({ foo: true });
            });
        });

        test('any with valid object evaluates the disjunction of all values', function() {
            assert.isTrue(check.any({ foo: false, bar: true, baz: false }));
            assert.isFalse(check.any({ foo: false, bar: false }));
        });

        test('any with nested objects evaluates the disjunction of all values', function() {
            assert.isTrue(check.any({ foo: { bar: false, baz: true }, bat: false }));
            assert.isFalse(check.any({ foo: { bar: false, baz: false }, bat: false }));
        });

        test('verify modifier is defined', function() {
            assert.isObject(check.verify);
        });

        test('verify modifier is applied to predicates', function () {
            assert.isFunction(check.verify.like);
            assert.isFunction(check.verify.instance);
            assert.isFunction(check.verify.emptyObject);
            assert.isFunction(check.verify.object);
            assert.isFunction(check.verify.length);
            assert.isFunction(check.verify.array);
            assert.isFunction(check.verify.date);
            assert.isFunction(check.verify.fn);
            assert.isFunction(check.verify.webUrl);
            assert.isFunction(check.verify.unemptyString);
            assert.isFunction(check.verify.string);
            assert.isFunction(check.verify.evenNumber);
            assert.isFunction(check.verify.oddNumber);
            assert.isFunction(check.verify.positiveNumber);
            assert.isFunction(check.verify.negativeNumber);
            assert.isFunction(check.verify.number);
            assert.isFunction(check.verify.gitUrl);
            assert.isFunction(check.verify.nulled);
            assert.isFunction(check.verify.defined);
        });

        test('verify modifier is not applied to batch operations', function () {
            assert.isUndefined(check.verify.map);
            assert.isUndefined(check.verify.every);
            assert.isUndefined(check.verify.any);
        });

        test('verify modifier is not applied to itself', function () {
            assert.isUndefined(check.verify.verify);
        });

        test('verify modifier is applied to maybe', function () {
            assert.isObject(check.verify.maybe);
            assert.strictEqual(Object.keys(check.verify.maybe).length, 22);
        });

        test('verify modifier has correct number of keys', function () {
            assert.strictEqual(Object.keys(check.verify).length, 24);
        });

        test('verify modifier throws when value is wrong', function () {
            assert.throws(function () {
                check.verify.unemptyString('');
            });
        });

        test('verify modifier does not throw when value is correct', function () {
            assert.doesNotThrow(function () {
                check.verify.unemptyString(' ');
            });
        });

        test('verify modifier throws Error instance', function () {
            try {
                check.verify.unemptyString('');
            } catch (error) {
                assert.instanceOf(error, Error);
            }
        });

        test('verify modifier sets default message on Error instance', function () {
            try {
                check.verify.unemptyString('');
            } catch (error) {
                assert.strictEqual(error.message, 'Invalid string');
            }
        });

        test('verify modifer sets message on Error instance', function () {
            try {
                check.verify.unemptyString('', 'foo bar');
            } catch (error) {
                assert.strictEqual(error.message, 'foo bar');
            }
        });

        test('verify modifiers prohibits empty error messages', function () {
            try {
                check.verify.unemptyString('', '');
            } catch (error) {
                assert.strictEqual(error.message, 'Invalid string');
            }
        });

        test('maybe modifier is defined', function () {
            assert.isObject(check.maybe);
        });

        test('maybe modifier is not applied to itself', function () {
            assert.isUndefined(check.maybe.maybe);
        });

        test('maybe modifier is not applied to verify', function () {
            assert.isUndefined(check.maybe.verify);
        });

        test('maybe modifier has correct number of keys', function () {
            assert.strictEqual(Object.keys(check.maybe).length, 22);
        });

        test('maybe modifier returns when true value is undefined', function() {
            assert.isTrue(check.maybe.object(undefined));
        });

        test('maybe modifier returns true when value is null', function() {
            assert.isTrue(check.maybe.object(null));
        });

        test('maybe modifier returns predicate result on value', function() {
            assert.isFalse(check.maybe.oddNumber(2));
            assert.isTrue(check.maybe.oddNumber(1));
        });

        test('not modifier is defined', function () {
            assert.isObject(check.not);
        });

        test('not modifier is not applied to itself', function () {
            assert.isUndefined(check.not.not);
        });

        test('not modifier is not applied to verify', function () {
            assert.isUndefined(check.not.verify);
        });

        test('not modifier has correct number of keys', function () {
            assert.strictEqual(Object.keys(check.not).length, 22);
        });

        test('not modifier returns true when predicate returns false', function() {
            assert.isTrue(check.not.object(undefined));
        });

        test('not modifier returns false when predicate returns true', function() {
            assert.isFalse(check.not.unemptyString('1'));
        });

        test('verify modifier with maybe does not throw when value is correct', function() {
            assert.doesNotThrow(function() {
                check.verify.maybe.positiveNumber(1);
            });
        });

        test('verify modifier with maybe throws when value is wrong', function() {
            assert.throws(function() {
                check.verify.maybe.positiveNumber(-1);
            });
        });

        test('verify modifier with not throws when value is correct', function() {
            assert.throws(function() {
                check.verify.not.negativeNumber(-1);
            });
        });

        test('verify modifier with not doesNotThrow when value is wrong', function() {
            assert.doesNotThrow(function() {
                check.verify.not.negativeNumber(1);
            });
        });

        test('maybe modifier with falsey values evaluates predicate', function() {
            assert.isFalse(check.maybe.positiveNumber(0));
        });
    });
}(typeof require === 'function' ? require : undefined));
