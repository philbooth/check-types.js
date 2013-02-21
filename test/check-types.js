/*globals require */

(function () {
    'use strict';

    var assert = require('chai').assert,
        module = '../src/check-types';

    suite('no setup:', function () {
        test('require does not throw', function () {
            assert.doesNotThrow(function () {
                require(module);
            });
        });

        test('require returns object', function () {
            assert.isObject(require(module));
        });
    });

    suite('require:', function () {
        var types;

        setup(function () {
            types = require(module);
        });

        teardown(function () {
            types = undefined;
        });

        test('verifyQuack function is defined', function () {
            assert.isFunction(types.verifyQuack);
        });

        test('verifyQuack with two empty object arguments does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyQuack({}, {});
            });
        });

        test('verifyQuack with foo bar properties throws', function () {
            assert.throws(function () {
                types.verifyQuack({ foo: {} }, { bar: {} });
            });
        });

        test('verifyQuack with foo foo properties does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyQuack({ foo: {} }, { foo: {} });
            });
        });

        test('verifyQuack with bar baz second properties throws', function () {
            assert.throws(function () {
                types.verifyQuack({ foo: {}, bar: {} }, { foo: {}, baz: {} });
            });
        });

        test('verifyQuack with bar bar second properties does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyQuack({ foo: (function () {}), bar: {} }, { foo: (function () {}), bar: {} });
            });
        });

        test('verifyQuack with differently typed bar bar second properties throws', function () {
            assert.throws(function () {
                types.verifyQuack({ foo: (function () {}), bar: {} }, { foo: (function () {}), bar: (function () {}) });
            });
        });

        test('quacksLike function is defined', function () {
            assert.isFunction(types.quacksLike);
        });

        test('quacksLike without arguments throws', function () {
            assert.throws(function () {
                types.quacksLike();
            });
        });

        test('quacksLike with two object arguments does not throw', function () {
            assert.doesNotThrow(function () {
                types.quacksLike({}, {});
            });
        });

        test('quacksLike with function first argument throws', function () {
            assert.throws(function () {
                types.quacksLike(function () {}, {});
            });
        });

        test('quacksLike with null first argument throws', function () {
            assert.throws(function () {
                types.quacksLike(null, {});
            });
        });

        test('quacksLike with function second argument throws', function () {
            assert.throws(function () {
                types.quacksLike({}, function () {});
            });
        });

        test('quacksLike with null second argument throws', function () {
            assert.throws(function () {
                types.quacksLike({}, null);
            });
        });

        test('quacksLike with two empty object arguments returns true', function () {
            assert.isTrue(types.quacksLike({}, {}));
        });

        test('quacksLike with foo bar properties returns false', function () {
            assert.isFalse(types.quacksLike({ foo: {} }, { bar: {} }));
        });

        test('quacksLike with foo foo properties returns true', function () {
            assert.isTrue(types.quacksLike({ foo: {} }, { foo: {} }));
        });

        test('quacksLike with bar baz second properties returns false', function () {
            assert.isFalse(types.quacksLike({ foo: {}, bar: {} }, { foo: {}, baz: {} }));
        });

        test('quacksLike with bar bar second properties returns true', function () {
            assert.isTrue(types.quacksLike({ foo: (function () {}), bar: {} }, { foo: (function () {}), bar: {} }));
        });

        test('quacksLike with differently typed bar bar second properties returns false', function () {
            assert.isFalse(types.quacksLike({ foo: (function () {}), bar: {} }, { foo: (function () {}), bar: (function () {}) }));
        });

        test('verifyInstance with new Error and Error does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyInstance(new Error(), Error);
            });
        });

        test('verifyInstance with object and Error throws', function () {
            assert.throws(function () {
                types.verifyInstance({}, Error);
            });
        });

        test('verifyInstance with null and null throws', function () {
            assert.throws(function () {
                types.verifyInstance(null, null);
            });
        });

        test('verifyInstance with object and Object does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyInstance({}, Object);
            });
        });

        test('verifyInstance with null and Object throws', function () {
            assert.throws(function () {
                types.verifyInstance(null, Object);
            });
        });

        test('verifyInstance with array and Array does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyInstance([], Array);
            });
        });

        test('verifyInstance with Object and object throws', function () {
            assert.throws(function () {
                types.verifyInstance(Object, {});
            });
        });

        test('isInstance function is defined', function () {
            assert.isFunction(types.isInstance);
        });

        test('isInstance with new Error and Error returns true', function () {
            assert.isTrue(types.isInstance(new Error(), Error));
        });

        test('isInstance with object and Error returns false', function () {
            assert.isFalse(types.isInstance({}, Error));
        });

        test('isInstance with null and null returns false', function () {
            assert.isFalse(types.isInstance(null, null));
        });

        test('isInstance with object and Object returns true', function () {
            assert.isTrue(types.isInstance({}, Object));
        });

        test('isInstance with null and Object returns false', function () {
            assert.isFalse(types.isInstance(null, Object));
        });

        test('isInstance with array and Array returns true', function () {
            assert.isTrue(types.isInstance([], Array));
        });

        test('isInstance with Object and object returns false', function () {
            assert.isFalse(types.isInstance(Object, {}));
        });

        test('verifyObject function is defined', function () {
            assert.isFunction(types.verifyObject);
        });

        test('verifyObject with object does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyObject({});
            });
        });

        test('verifyObject with null throws', function () {
            assert.throws(function () {
                types.verifyObject(null);
            });
        });

        test('verifyObject with string throws', function () {
            assert.throws(function () {
                types.verifyObject('[]');
            });
        });

        test('verifyObject with array throws', function () {
            assert.throws(function () {
                types.verifyObject([]);
            });
        });

        test('isObject function is defined', function () {
            assert.isFunction(types.isObject);
        });

        test('isObject with object returns true', function () {
            assert.isTrue(types.isObject({}));
        });

        test('isObject with null returns false', function () {
            assert.isFalse(types.isObject(null));
        });

        test('isObject with string returns false', function () {
            assert.isFalse(types.isObject('{}'));
        });

        test('isObject with array returns false', function () {
            assert.isFalse(types.isObject([]));
        });

        test('isEmptyObject function is defined', function () {
            assert.isFunction(types.isEmptyObject);
        });

        test('isEmptyObject with {} returns true', function () {
            assert.isTrue(types.isEmptyObject({}));
        });

        test('isEmptyObject with [] returns false', function () {
            assert.isFalse(types.isEmptyObject([]));
        });

        test('isEmptyObject with null returns false', function () {
            assert.isFalse(types.isEmptyObject(null));
        });

        test('isEmptyObject with undefined returns false', function () {
            assert.isFalse(types.isEmptyObject(undefined));
        });

        test('verifyLength function is defined', function () {
            assert.isFunction(types.verifyLength);
        });

        test('verifyLength with matching undefined length does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyLength({});
            });
        });

        test('verifyLength with contrasting undefined length throws', function () {
            assert.throws(function () {
                types.verifyLength({}, 42);
            });
        });

        test('verifyLength with matching length on array does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyLength([ 1, 2, 3], 3);
            });
        });

        test('verifyLength with contrasting length on array throws', function () {
            assert.throws(function () {
                types.verifyLength([ 2, 3], 3);
            });
        });

        test('verifyLength with matching length on object does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyLength({ length: 4 }, 4);
            });
        });

        test('verifyLength with contrasting length on object throws', function () {
            assert.throws(function () {
                types.verifyLength({ length: 5 }, 4);
            });
        });

        test('isLength function is defined', function () {
            assert.isFunction(types.isLength);
        });

        test('isLength with matching undefined length returns true', function () {
            assert.isTrue(types.isLength({}));
        });

        test('isLength with contrasting undefined length returns false', function () {
            assert.isFalse(types.isLength({}, 7));
        });

        test('isLength with matching length on array returns true', function () {
            assert.isTrue(types.isLength([ 'foo', 'bar' ], 2));
        });

        test('isLength with contrasting length on array returns false', function () {
            assert.isFalse(types.isLength([ 'foo', 'bar', 'baz' ], 2));
        });

        test('isLength with matching length on object returns true', function () {
            assert.isTrue(types.isLength({ length: 1 }, 1));
        });

        test('isLength with contrasting length on object returns false', function () {
            assert.isFalse(types.isLength({ length: 1 }, 2));
        });

        test('verifyArray function is defined', function () {
            assert.isFunction(types.verifyArray);
        });

        test('verifyArray with array does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyArray([]);
            });
        });

        test('verifyArray with null throws', function () {
            assert.throws(function () {
                types.verifyArray(null);
            });
        });

        test('verifyArray with string throws', function () {
            assert.throws(function () {
                types.verifyArray('[]');
            });
        });

        test('verifyArray with object throws', function () {
            assert.throws(function () {
                types.verifyArray({});
            });
        });

        test('isArray function is defined', function () {
            assert.isFunction(types.isArray);
        });

        test('isArray with array returns true', function () {
            assert.isTrue(types.isArray([]));
        });

        test('isArray with null returns false', function () {
            assert.isFalse(types.isArray(null));
        });

        test('isArray with string returns false', function () {
            assert.isFalse(types.isArray('[]'));
        });

        test('isArray with object returns false', function () {
            assert.isFalse(types.isArray({}));
        });

        test('verifyFunction function is defined', function () {
            assert.isFunction(types.verifyFunction);
        });

        test('verifyFunction with function does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyFunction(function () {});
            });
        });

        test('verifyFunction with null throws', function () {
            assert.throws(function () {
                types.verifyFunction(null);
            });
        });

        test('verifyFunction with string throws', function () {
            assert.throws(function () {
                types.verifyFunction('[]');
            });
        });

        test('verifyFunction with object throws', function () {
            assert.throws(function () {
                types.verifyFunction({});
            });
        });

        test('verifyFunction with array throws', function () {
            assert.throws(function () {
                types.verifyFunction([]);
            });
        });

        test('isFunction function is defined', function () {
            assert.isFunction(types.isFunction);
        });

        test('isFunction with function returns true', function () {
            assert.isTrue(types.isFunction(function () {}));
        });

        test('isFunction with null returns false', function () {
            assert.isFalse(types.isFunction(null));
        });

        test('isFunction with string returns false', function () {
            assert.isFalse(types.isFunction('function () {}'));
        });

        test('isFunction with object returns false', function () {
            assert.isFalse(types.isFunction({}));
        });

        test('isFunction with array returns false', function () {
            assert.isFalse(types.isFunction([]));
        });

        test('verifyUnemptyString function is defined', function () {
            assert.isFunction(types.verifyUnemptyString);
        });

        test('verifyUnemptyString with string baz does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyUnemptyString('baz');
            });
        });

        test('verifyUnemptyString with null throws', function () {
            assert.throws(function () {
                types.verifyUnemptyString(null);
            });
        });

        test('verifyUnemptyString with empty string throws', function () {
            assert.throws(function () {
                types.verifyUnemptyString('');
            });
        });

        test('verifyUnemptyString with object throws', function () {
            assert.throws(function () {
                types.verifyUnemptyString({});
            });
        });

        test('verifyUnemptyString with string qux does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyUnemptyString('qux');
            });
        });

        test('isUnemptyString function is defined', function () {
            assert.isFunction(types.isUnemptyString);
        });

        test('isUnemptyString with string foo returns true', function () {
            assert.isTrue(types.isUnemptyString('foo'));
        });

        test('isUnemptyString with null returns false', function () {
            assert.isFalse(types.isUnemptyString(null));
        });

        test('isUnemptyString with empty string returns false', function () {
            assert.isFalse(types.isUnemptyString(''));
        });

        test('isUnemptyString with object returns false', function () {
            assert.isFalse(types.isUnemptyString({}));
        });

        test('isUnemptyString with string bar returns true', function () {
            assert.isTrue(types.isUnemptyString('bar'));
        });

        test('verifyString function is defined', function () {
            assert.isFunction(types.verifyString);
        });

        test('verifyString with string baz does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyString('baz');
            });
        });

        test('verifyString with null throws', function () {
            assert.throws(function () {
                types.verifyString(null);
            });
        });

        test('verifyString with empty string does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyString('');
            });
        });

        test('verifyString with object throws', function () {
            assert.throws(function () {
                types.verifyString({});
            });
        });

        test('isString function is defined', function () {
            assert.isFunction(types.isString);
        });

        test('isString with string foo returns true', function () {
            assert.isTrue(types.isString('foo'));
        });

        test('isString with null returns false', function () {
            assert.isFalse(types.isString(null));
        });

        test('isString with empty string returns true', function () {
            assert.isTrue(types.isString(''));
        });

        test('isString with object returns false', function () {
            assert.isFalse(types.isString({}));
        });

        test('verifyPositiveNumber function is defined', function () {
            assert.isFunction(types.verifyPositiveNumber);
        });

        test('verifyPositiveNumber with positive integer does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyPositiveNumber(1);
            });
        });

        test('verifyPositiveNumber with negative integer throws', function () {
            assert.throws(function () {
                types.verifyPositiveNumber(-1);
            });
        });

        test('verifyPositiveNumber with positive fraction does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyPositiveNumber(1/2);
            });
        });

        test('verifyPositiveNumber with negative fraction throws', function () {
            assert.throws(function () {
                types.verifyPositiveNumber(-1/2);
            });
        });

        test('verifyPositiveNumber with positive infinity does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyPositiveNumber(Infinity);
            });
        });

        test('verifyPositiveNumber with negative infinity throws', function () {
            assert.throws(function () {
                types.verifyPositiveNumber(-Infinity);
            });
        });

        test('verifyPositiveNumber with NaN throws', function () {
            assert.throws(function () {
                types.verifyPositiveNumber(NaN);
            });
        });

        test('verifyPositiveNumber with object throws', function () {
            assert.throws(function () {
                types.verifyPositiveNumber({});
            });
        });

        test('verifyPositiveNumber with string throws', function () {
            assert.throws(function () {
                types.verifyPositiveNumber('1');
            });
        });

        test('isPositiveNumber function is defined', function () {
            assert.isFunction(types.isPositiveNumber);
        });

        test('isPositiveNumber with positive integer returns true', function () {
            assert.isTrue(types.isPositiveNumber(1));
        });

        test('isPositiveNumber with negative integer returns false', function () {
            assert.isFalse(types.isPositiveNumber(-1));
        });

        test('isPositiveNumber with positive fraction returns true', function () {
            assert.isTrue(types.isPositiveNumber(1/2));
        });

        test('isPositiveNumber with negative fraction returns false', function () {
            assert.isFalse(types.isPositiveNumber(-1/2));
        });

        test('isPositiveNumber with positive infinity returns true', function () {
            assert.isTrue(types.isPositiveNumber(Infinity));
        });

        test('isPositiveNumber with negative infinity returns false', function () {
            assert.isFalse(types.isPositiveNumber(-Infinity));
        });

        test('isPositiveNumber with NaN returns false', function () {
            assert.isFalse(types.isPositiveNumber(NaN));
        });

        test('isPositiveNumber with object returns false', function () {
            assert.isFalse(types.isPositiveNumber({}));
        });

        test('isPositiveNumber with string returns false', function () {
            assert.isFalse(types.isPositiveNumber('1'));
        });

        test('verifyNegativeNumber function is defined', function () {
            assert.isFunction(types.verifyNegativeNumber);
        });

        test('verifyNegativeNumber with positive integer throws', function () {
            assert.throws(function () {
                types.verifyNegativeNumber(1);
            });
        });

        test('verifyNegativeNumber with negative integer does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNegativeNumber(-1);
            });
        });

        test('verifyNegativeNumber with positive fraction throws', function () {
            assert.throws(function () {
                types.verifyNegativeNumber(1/2);
            });
        });

        test('verifyNegativeNumber with negative fraction does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNegativeNumber(-1/2);
            });
        });

        test('verifyNegativeNumber with positive infinity throws', function () {
            assert.throws(function () {
                types.verifyNegativeNumber(Infinity);
            });
        });

        test('verifyNegativeNumber with negative infinity does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNegativeNumber(-Infinity);
            });
        });

        test('verifyNegativeNumber with NaN throws', function () {
            assert.throws(function () {
                types.verifyNegativeNumber(NaN);
            });
        });

        test('verifyNegativeNumber with object throws', function () {
            assert.throws(function () {
                types.verifyNegativeNumber({});
            });
        });

        test('verifyNegativeNumber with string throws', function () {
            assert.throws(function () {
                types.verifyNegativeNumber('-1');
            });
        });

        test('isNegativeNumber function is defined', function () {
            assert.isFunction(types.isNegativeNumber);
        });

        test('isNegativeNumber with positive integer returns false', function () {
            assert.isFalse(types.isNegativeNumber(1));
        });

        test('isNegativeNumber with negative integer returns true', function () {
            assert.isTrue(types.isNegativeNumber(-1));
        });

        test('isNegativeNumber with positive fraction returns false', function () {
            assert.isFalse(types.isNegativeNumber(1/2));
        });

        test('isNegativeNumber with negative fraction returns true', function () {
            assert.isTrue(types.isNegativeNumber(-1/2));
        });

        test('isNegativeNumber with positive infinity returns false', function () {
            assert.isFalse(types.isNegativeNumber(Infinity));
        });

        test('isNegativeNumber with negative infinity returns true', function () {
            assert.isTrue(types.isNegativeNumber(-Infinity));
        });

        test('isNegativeNumber with NaN returns false', function () {
            assert.isFalse(types.isNegativeNumber(NaN));
        });

        test('isNegativeNumber with object returns false', function () {
            assert.isFalse(types.isNegativeNumber({}));
        });

        test('isNegativeNumber with string returns false', function () {
            assert.isFalse(types.isNegativeNumber('1'));
        });

        test('verifyNumber function is defined', function () {
            assert.isFunction(types.verifyNumber);
        });

        test('verifyNumber with positive integer does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNumber(1);
            });
        });

        test('verifyNumber with negative integer does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNumber(-1);
            });
        });

        test('verifyNumber with fraction does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNumber(1/2);
            });
        });

        test('verifyNumber with positive infinity does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNumber(Infinity);
            });
        });

        test('verifyNumber with negative infinity does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNumber(-Infinity);
            });
        });

        test('verifyNumber with NaN throws', function () {
            assert.throws(function () {
                types.verifyNumber(NaN);
            });
        });

        test('verifyNumber with object throws', function () {
            assert.throws(function () {
                types.verifyNumber({});
            });
        });

        test('verifyNumber with string throws', function () {
            assert.throws(function () {
                types.verifyNumber('1');
            });
        });

        test('isNumber function is defined', function () {
            assert.isFunction(types.isNumber);
        });

        test('isNumber with positive integer returns true', function () {
            assert.isTrue(types.isNumber(1));
        });

        test('isNumber with negative integer returns true', function () {
            assert.isTrue(types.isNumber(-1));
        });

        test('isNumber with fraction returns true', function () {
            assert.isTrue(types.isNumber(1/2));
        });

        test('isNumber with Infinity returns true', function () {
            assert.isTrue(types.isNumber(Infinity));
        });

        test('isNumber with NaN returns false', function () {
            assert.isFalse(types.isNumber(NaN));
        });

        test('isNumber with object returns false', function () {
            assert.isFalse(types.isNumber({}));
        });

        test('isNumber with string returns false', function () {
            assert.isFalse(types.isNumber('1'));
        });
    });
}());

