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

        test('quacksLike function is defined', function () {
            assert.isFunction(check.quacksLike);
        });

        test('quacksLike without arguments throws', function () {
            assert.throws(function () {
                check.quacksLike();
            });
        });

        test('quacksLike with two object arguments does not throw', function () {
            assert.doesNotThrow(function () {
                check.quacksLike({}, {});
            });
        });

        test('quacksLike with function first argument throws', function () {
            assert.throws(function () {
                check.quacksLike(function () {}, {});
            });
        });

        test('quacksLike with null first argument throws', function () {
            assert.throws(function () {
                check.quacksLike(null, {});
            });
        });

        test('quacksLike with function second argument throws', function () {
            assert.throws(function () {
                check.quacksLike({}, function () {});
            });
        });

        test('quacksLike with null second argument throws', function () {
            assert.throws(function () {
                check.quacksLike({}, null);
            });
        });

        test('quacksLike with two empty object arguments returns true', function () {
            assert.isTrue(check.quacksLike({}, {}));
        });

        test('quacksLike with foo bar properties returns false', function () {
            assert.isFalse(check.quacksLike({ foo: {} }, { bar: {} }));
        });

        test('quacksLike with foo foo properties returns true', function () {
            assert.isTrue(check.quacksLike({ foo: {} }, { foo: {} }));
        });

        test('quacksLike with bar baz second properties returns false', function () {
            assert.isFalse(check.quacksLike({ foo: {}, bar: {} }, { foo: {}, baz: {} }));
        });

        test('quacksLike with bar bar second properties returns true', function () {
            assert.isTrue(check.quacksLike({ foo: (function () {}), bar: {} }, { foo: (function () {}), bar: {} }));
        });

        test('quacksLike with differently typed bar bar second properties returns false', function () {
            assert.isFalse(check.quacksLike({ foo: (function () {}), bar: {} }, { foo: (function () {}), bar: (function () {}) }));
        });

        test('quacksLike with different nested objects returns false', function() {
            assert.isFalse(check.quacksLike({ foo: { bar: { qux: 'string' }, baz: 23 }},
                                            { foo: { bar: { qux: 123      }, baz: 66 }}));
        });

        test('quacksLike with alike nested objects returns true', function() {
            assert.isTrue(check.quacksLike({ foo: { bar: { qux: 'string' }, baz: 23 }},
                                           { foo: { bar: { qux: 'other'  }, baz: 66 }}));
        });

        test('verifyQuack function is defined', function () {
            assert.isFunction(check.verifyQuack);
        });

        test('verifyQuack with foo bar properties throws', function () {
            assert.throws(function () {
                check.verifyQuack({ foo: {} }, { bar: {} });
            });
            assert.throws(function() {
                check.verify.quacksLike({ foo: {} }, { bar: {} });
            });
        });

        test('verifyQuack with foo foo properties does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyQuack({ foo: {} }, { foo: {} });
                check.verify.quacksLike({ foo: {} }, { foo: {} });
            });
        });

        test('isInstance function is defined', function () {
            assert.isFunction(check.isInstance);
        });

        test('isInstance with new Error and Error returns true', function () {
            assert.isTrue(check.isInstance(new Error(), Error));
        });

        test('isInstance with object and Error returns false', function () {
            assert.isFalse(check.isInstance({}, Error));
        });

        test('isInstance with null and null returns false', function () {
            assert.isFalse(check.isInstance(null, null));
        });

        test('isInstance with object and Object returns true', function () {
            assert.isTrue(check.isInstance({}, Object));
        });

        test('isInstance with null and Object returns false', function () {
            assert.isFalse(check.isInstance(null, Object));
        });

        test('isInstance with array and Array returns true', function () {
            assert.isTrue(check.isInstance([], Array));
        });

        test('isInstance with Object and object returns false', function () {
            assert.isFalse(check.isInstance(Object, {}));
        });

        test('verifyInstance with new Error and Error does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyInstance(new Error(), Error);
                check.verify.isInstance(new Error(), Error);
            });
        });

        test('verifyInstance with object and Error throws', function () {
            assert.throws(function () {
                check.verifyInstance({}, Error);
            });
            assert.throws(function() {
                check.verify.isInstance({}, Error);
            });
        });

        test('isEmptyObject function is defined', function () {
            assert.isFunction(check.isEmptyObject);
        });

        test('isEmptyObject with empty object returns true', function () {
            assert.isTrue(check.isEmptyObject({}));
        });

        test('isEmptyObject with empty array returns false', function () {
            assert.isFalse(check.isEmptyObject([]));
        });

        test('isEmptyObject with null returns false', function () {
            assert.isFalse(check.isEmptyObject(null));
        });

        test('isEmptyObject with non-empty object returns false', function () {
            assert.isFalse(check.isEmptyObject({ foo: 'bar' }));
        });

        test('verifyEmptyObject function is defined', function () {
            assert.isFunction(check.verifyEmptyObject);
        });

        test('verifyEmptyObject with empty object does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyEmptyObject({});
                check.verify.isEmptyObject({});
            });
        });

        test('verifyEmptyObject with non-empty object throws', function () {
            assert.throws(function () {
                check.verifyEmptyObject({ foo: 'bar' });
            });
            assert.throws(function() {
                check.verify.isEmptyObject({ foo: 'bar' });
            });
        });

        test('isObject function is defined', function () {
            assert.isFunction(check.isObject);
        });

        test('isObject with object returns true', function () {
            assert.isTrue(check.isObject({}));
        });

        test('isObject with null returns false', function () {
            assert.isFalse(check.isObject(null));
        });

        test('isObject with string returns false', function () {
            assert.isFalse(check.isObject('{}'));
        });

        test('isObject with array returns false', function () {
            assert.isFalse(check.isObject([]));
        });

        test('isObject with date returns false', function () {
            assert.isFalse(check.isObject(new Date()));
        });

        test('verifyObject function is defined', function () {
            assert.isFunction(check.verifyObject);
        });

        test('verifyObject with object does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyObject({});
                check.verify.isObject({});
            });
        });

        test('verifyObject with null throws', function () {
            assert.throws(function () {
                check.verifyObject(null);
            });
            assert.throws(function() {
                check.verify.isObject(null);
            });
        });

        test('isLength function is defined', function () {
            assert.isFunction(check.isLength);
        });

        test('isLength with matching undefined length returns true', function () {
            assert.isTrue(check.isLength({}));
        });

        test('isLength with contrasting undefined length returns false', function () {
            assert.isFalse(check.isLength({}, 7));
        });

        test('isLength with matching length on array returns true', function () {
            assert.isTrue(check.isLength([ 'foo', 'bar' ], 2));
        });

        test('isLength with contrasting length on array returns false', function () {
            assert.isFalse(check.isLength([ 'foo', 'bar', 'baz' ], 2));
        });

        test('isLength with matching length on object returns true', function () {
            assert.isTrue(check.isLength({ length: 1 }, 1));
        });

        test('isLength with contrasting length on object returns false', function () {
            assert.isFalse(check.isLength({ length: 1 }, 2));
        });

        test('verifyLength function is defined', function () {
            assert.isFunction(check.verifyLength);
        });

        test('verifyLength with matching length on array does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyLength([ 1, 2, 3], 3);
                check.verify.isLength([1, 2, 3], 3);
            });
        });

        test('verifyLength with contrasting length on array throws', function () {
            assert.throws(function () {
                check.verifyLength([ 2, 3], 3);
            });
            assert.throws(function() {
                check.verify.length([2, 3], 3);
            });
        });

        test('isArray function is defined', function () {
            assert.isFunction(check.isArray);
        });

        test('isArray with array returns true', function () {
            assert.isTrue(check.isArray([]));
        });

        test('isArray with null returns false', function () {
            assert.isFalse(check.isArray(null));
        });

        test('isArray with string returns false', function () {
            assert.isFalse(check.isArray('[]'));
        });

        test('isArray with object returns false', function () {
            assert.isFalse(check.isArray({}));
        });

        test('verifyArray function is defined', function () {
            assert.isFunction(check.verifyArray);
        });

        test('verifyArray with array does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyArray([]);
                check.verify.isArray([]);
            });
        });

        test('verifyArray with object throws', function () {
            assert.throws(function () {
                check.verifyArray({});
            });
            assert.throws(function () {
                check.verify.isArray({});
            });
        });

        test('isDate function is defined', function () {
            assert.isFunction(check.isDate);
        });

        test('isDate with date returns true', function () {
            assert.isTrue(check.isDate(new Date()));
        });

        test('isDate with object returns false', function () {
            assert.isFalse(check.isDate({}));
        });

        test('isDate with null returns false', function () {
            assert.isFalse(check.isDate(null));
        });

        test('isDate with string returns false', function () {
            assert.isFalse(check.isDate('new Date()'));
        });

        test('verifyDate function is defined', function () {
            assert.isFunction(check.verifyDate);
        });

        test('verifyDate with date does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyDate(new Date());
                check.verify.isDate(new Date());
            });
        });

        test('verifyDate with object throws', function () {
            assert.throws(function () {
                check.verifyDate({});
            });
            assert.throws(function () {
                check.verify.isDate({});
            });
        });

        test('isFunction function is defined', function () {
            assert.isFunction(check.isFunction);
        });

        test('isFunction with function returns true', function () {
            assert.isTrue(check.isFunction(function () {}));
        });

        test('isFunction with null returns false', function () {
            assert.isFalse(check.isFunction(null));
        });

        test('isFunction with string returns false', function () {
            assert.isFalse(check.isFunction('function () {}'));
        });

        test('isFunction with object returns false', function () {
            assert.isFalse(check.isFunction({}));
        });

        test('verifyFunction function is defined', function () {
            assert.isFunction(check.verifyFunction);
        });

        test('verifyFunction with function does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyFunction(function () {});
                check.verify.isFunction(function() {});
            });
        });

        test('verifyFunction with object throws', function () {
            assert.throws(function () {
                check.verifyFunction({});
            });
            assert.throws(function() {
                check.verify.isFunction({});
            });
        });

        test('isWebUrl function is defined', function () {
            assert.isFunction(check.isWebUrl);
        });

        test('isWebUrl with https: URL returns true', function () {
            assert.isTrue(check.isWebUrl('https://example.com/'));
        });

        test('isWebUrl with ftp: URL returns false', function () {
            assert.isFalse(check.isWebUrl('ftp://example.com/'));
        });

        test('isWebUrl with http: URL returns true', function () {
            assert.isTrue(check.isWebUrl('http://127.0.0.1:8080/'));
        });

        test('isWebUrl with protocol-relative URL returns false', function () {
            assert.isFalse(check.isWebUrl('//example.com/'));
        });

        test('isWebUrl with httpss scheme returns false', function () {
            assert.isFalse(check.isWebUrl('httpss://'));
        });

        test('isWebUrl without domain returns false', function () {
            assert.isFalse(check.isWebUrl('http://'));
        });

        test('isWebUrl with object returns false', function () {
            assert.isFalse(check.isWebUrl({ toString: function () { return 'https://example.com/'; } }));
        });

        test('isWebUrl with number returns false', function () {
            assert.isFalse(check.isWebUrl(42));
        });

        test('verifyWebUrl function is defined', function () {
            assert.isFunction(check.verifyWebUrl);
        });

        test('verifyWebUrl with ftp: URL throws', function () {
            assert.throws(function () {
                check.verifyWebUrl('ftp://example.com/');
            });
            assert.throws(function() {
                check.verify.isWebUrl('ftp://example.com/');
            });
        });

        test('verifyWebUrl with http: URL does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyWebUrl('http://localhost');
                check.verify.isWebUrl('http://localhost');
            });
        });

        test('isUnemptyString function is defined', function () {
            assert.isFunction(check.isUnemptyString);
        });

        test('isUnemptyString with string foo returns true', function () {
            assert.isTrue(check.isUnemptyString('foo'));
        });

        test('isUnemptyString with null returns false', function () {
            assert.isFalse(check.isUnemptyString(null));
        });

        test('isUnemptyString with empty string returns false', function () {
            assert.isFalse(check.isUnemptyString(''));
        });

        test('isUnemptyString with object returns false', function () {
            assert.isFalse(check.isUnemptyString({}));
        });

        test('isUnemptyString with string bar returns true', function () {
            assert.isTrue(check.isUnemptyString('bar'));
        });

        test('verifyUnemptyString function is defined', function () {
            assert.isFunction(check.verifyUnemptyString);
        });

        test('verifyUnemptyString with string baz does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyUnemptyString('baz');
                check.verify.isUnemptyString('baz');
            });
        });

        test('verifyUnemptyString with empty string throws', function () {
            assert.throws(function () {
                check.verifyUnemptyString('');
            });
            assert.throws(function() {
                check.verify.isUnemptyString('');
            });
        });

        test('isString function is defined', function () {
            assert.isFunction(check.isString);
        });

        test('isString with string foo returns true', function () {
            assert.isTrue(check.isString('foo'));
        });

        test('isString with empty string returns true', function () {
            assert.isTrue(check.isString(''));
        });

        test('isString with object returns false', function () {
            assert.isFalse(check.isString({}));
        });

        test('verifyString function is defined', function () {
            assert.isFunction(check.verifyString);
        });

        test('verifyString with string baz does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyString('baz');
                check.verify.isString('baz');
            });
        });

        test('verifyString with object throws', function () {
            assert.throws(function () {
                check.verifyString({});
            });
            assert.throws(function () {
                check.verify.isString({});
            });
        });

        test('isPositiveNumber function is defined', function () {
            assert.isFunction(check.isPositiveNumber);
        });

        test('isPositiveNumber with positive integer returns true', function () {
            assert.isTrue(check.isPositiveNumber(1));
        });

        test('isPositiveNumber with negative integer returns false', function () {
            assert.isFalse(check.isPositiveNumber(-1));
        });

        test('isPositiveNumber with positive fraction returns true', function () {
            assert.isTrue(check.isPositiveNumber(1/2));
        });

        test('isPositiveNumber with negative fraction returns false', function () {
            assert.isFalse(check.isPositiveNumber(-1/2));
        });

        test('isPositiveNumber with positive infinity returns true', function () {
            assert.isTrue(check.isPositiveNumber(Infinity));
        });

        test('isPositiveNumber with negative infinity returns false', function () {
            assert.isFalse(check.isPositiveNumber(-Infinity));
        });

        test('isPositiveNumber with NaN returns false', function () {
            assert.isFalse(check.isPositiveNumber(NaN));
        });

        test('isPositiveNumber with object returns false', function () {
            assert.isFalse(check.isPositiveNumber({}));
        });

        test('isPositiveNumber with string returns false', function () {
            assert.isFalse(check.isPositiveNumber('1'));
        });

        test('verifyPositiveNumber function is defined', function () {
            assert.isFunction(check.verifyPositiveNumber);
        });

        test('verifyPositiveNumber with positive integer does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyPositiveNumber(1);
                check.verify.isPositiveNumber(1);
            });
        });

        test('verifyPositiveNumber with negative integer throws', function () {
            assert.throws(function () {
                check.verifyPositiveNumber(-1);
            });
            assert.throws(function () {
                check.verify.isPositiveNumber(-1);
            });
        });

        test('isNegativeNumber function is defined', function () {
            assert.isFunction(check.isNegativeNumber);
        });

        test('isNegativeNumber with positive integer returns false', function () {
            assert.isFalse(check.isNegativeNumber(1));
        });

        test('isNegativeNumber with negative integer returns true', function () {
            assert.isTrue(check.isNegativeNumber(-1));
        });

        test('isNegativeNumber with positive fraction returns false', function () {
            assert.isFalse(check.isNegativeNumber(1/2));
        });

        test('isNegativeNumber with negative fraction returns true', function () {
            assert.isTrue(check.isNegativeNumber(-1/2));
        });

        test('isNegativeNumber with positive infinity returns false', function () {
            assert.isFalse(check.isNegativeNumber(Infinity));
        });

        test('isNegativeNumber with negative infinity returns true', function () {
            assert.isTrue(check.isNegativeNumber(-Infinity));
        });

        test('isNegativeNumber with NaN returns false', function () {
            assert.isFalse(check.isNegativeNumber(NaN));
        });

        test('isNegativeNumber with object returns false', function () {
            assert.isFalse(check.isNegativeNumber({}));
        });

        test('isNegativeNumber with string returns false', function () {
            assert.isFalse(check.isNegativeNumber('-1'));
        });

        test('verifyNegativeNumber function is defined', function () {
            assert.isFunction(check.verifyNegativeNumber);
        });

        test('verifyNegativeNumber with negative integer does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyNegativeNumber(-1);
                check.verify.isNegativeNumber(-1);
            });
        });

        test('verifyNegativeNumber with positive integer throws', function () {
            assert.throws(function () {
                check.verifyNegativeNumber(1);
            });
            assert.throws(function () {
                check.verify.isNegativeNumber(1);
            });
        });

        test('isNumber function is defined', function () {
            assert.isFunction(check.isNumber);
        });

        test('isNumber with positive integer returns true', function () {
            assert.isTrue(check.isNumber(1));
        });

        test('isNumber with negative integer returns true', function () {
            assert.isTrue(check.isNumber(-1));
        });

        test('isNumber with fraction returns true', function () {
            assert.isTrue(check.isNumber(1/2));
        });

        test('isNumber with Infinity returns true', function () {
            assert.isTrue(check.isNumber(Infinity));
        });

        test('isNumber with NaN returns false', function () {
            assert.isFalse(check.isNumber(NaN));
        });

        test('isNumber with object returns false', function () {
            assert.isFalse(check.isNumber({}));
        });

        test('isNumber with string returns false', function () {
            assert.isFalse(check.isNumber('1'));
        });

        test('verifyNumber function is defined', function () {
            assert.isFunction(check.verifyNumber);
        });

        test('verifyNumber with positive integer does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyNumber(1);
                check.verify.isNumber(1);
            });
        });

        test('verifyNumber with NaN throws', function () {
            assert.throws(function () {
                check.verifyNumber(NaN);
            });
            assert.throws(function () {
                check.verify.isNumber(NaN);
            });
        });

        test('isOddNumber function is defined', function () {
            assert.isFunction(check.isOddNumber);
        });

        test('isOddNumber with odd number returns true', function () {
            assert.isTrue(check.isOddNumber(1));
        });

        test('isOddNumber with even number returns false', function () {
            assert.isFalse(check.isOddNumber(2));
        });

        test('isOddNumber with negative odd number returns true', function () {
            assert.isTrue(check.isOddNumber(-3));
        });

        test('isOddNumber with negative even number returns false', function () {
            assert.isFalse(check.isOddNumber(-4));
        });

        test('isOddNumber with floating point number returns false', function () {
            assert.isFalse(check.isEvenNumber(5.5));
        });

        test('isOddNumber with string returns false', function () {
            assert.isFalse(check.isOddNumber('1'));
        });

        test('verifyOddNumber with even number throws', function () {
            assert.throws(function () {
                check.verifyOddNumber(6);
            });
        });

        test('verifyOddNumber with odd number does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyOddNumber(-7);
            });
        });

        test('isOddNumber function is defined', function () {
            assert.isFunction(check.isOddNumber);
        });

        test('isEvenNumber with even number returns true', function () {
            assert.isTrue(check.isEvenNumber(2));
        });

        test('isEvenNumber with odd number returns false', function () {
            assert.isFalse(check.isEvenNumber(3));
        });

        test('isEvenNumber with negative even number returns true', function () {
            assert.isTrue(check.isEvenNumber(-4));
        });

        test('isEvenNumber with negative odd number returns false', function () {
            assert.isFalse(check.isEvenNumber(-5));
        });

        test('isEvenNumber with floating point number returns false', function () {
            assert.isFalse(check.isEvenNumber(2.4));
        });

        test('isEvenNumber with string returns false', function () {
            assert.isFalse(check.isEvenNumber('2'));
        });

        test('verifyEvenNumber with odd number throws', function () {
            assert.throws(function () {
                check.verifyEvenNumber(1);
            });
            assert.throws(function () {
                check.verify.isEvenNumber(1);
            });
        });

        test('verifyEvenNumber with even number does not throw', function () {
            assert.doesNotThrow(function () {
                check.verifyEvenNumber(-2);
                check.verify.isEvenNumber(-2);
            });
        });

        test('map function is defined', function () {
            assert.isFunction(check.map);
        });

        test('map with invalid object throws', function() {
            assert.throws(function () {
                check.map(null, { foo: check.isString });
            });
        });

        test('map with invalid predicates throws', function() {
            assert.throws(function() {
                check.map({ foo: 'test' }, null);
            });
        });

        test('map with valid object and predicates does not throw', function() {
            assert.doesNotThrow(function() {
                check.map({ foo: 'test' }, { foo: check.isString });
            });
        });

        test('map with valid object and predicates returns the predicates results', function() {
            var result = check.map({ foo: 'test', bar: 33 },
                                   { foo: check.isString,
                                     bar: check.isEvenNumber });
            assert.deepEqual(result, { foo: true, bar: false });
        });

        test('map with unmatched predicates returns undefined for property', function() {
            var result = check.map({ bar: 33 }, { foo: check.isString });
            assert.deepEqual(result, { foo: undefined });
        });

        test('map with nested objects and predicates returns the predicates results', function() {
            var result = check.map({ foo: { bar: 20 } },
                                   { foo: { bar: check.isEvenNumber } });
            assert.deepEqual(result, { foo: { bar: true } });
        });

        test('map with verifier functions does not throw when valid', function() {
            assert.doesNotThrow(function() {
                check.map({ foo: 'bar', baz: 123 },
                          { foo: check.verify.isString,
                            baz: check.verify.isNumber });
            });
        });

        test('map with verifier functions throws when invalid', function() {
            assert.throws(function() {
                check.map({ foo: 'bar', baz: 123 },
                          { foo: check.verify.isNumber });
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

        test('maybe modifier is defined', function () {
            assert.isObject(check.maybe);
        });

        test('maybe modifier is applied on correct number of methods', function() {
            assert.equal(Object.keys(check).length - 1, Object.keys(check.maybe).length);
        });

        test('maybe modifier is not applied to itself', function () {
            assert.isUndefined(check.maybe.maybe);
        });

        test('maybe with predicate returns true on undefined', function() {
            assert.isTrue(check.maybe.isString(undefined));
        });

        test('maybe with predicate returns predicate result on value', function() {
            assert.isFalse(check.maybe.isOddNumber(34));
            assert.isTrue(check.maybe.isOddNumber(33));
        });

        test('maybe with thrower does not throw on undefined', function() {
            assert.doesNotThrow(function() {
                check.maybe.verifyPositiveNumber(undefined);
                check.maybe.verify.isPositiveNumber(undefined);
            });
        });

        test('maybe with thrower acts like thrower on value', function() {
            assert.throws(function() {
                check.maybe.verifyPositiveNumber(-1);
            });
            assert.throws(function() {
                check.maybe.verify.isPositiveNumber(-1);
            });
        });

        test('maybe predicate with falsey values evaluates predicate', function() {
            assert.isFalse(check.maybe.isPositiveNumber(0));
        });

        test('verify modifier is defined', function() {
            assert.isObject(check.verify);
        });

    });
}(typeof require === 'function' ? require : undefined));
