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

        test('verifyNumber function is defined', function () {
            assert.isFunction(types.verifyNumber);
        });

        test('verifyNumber with whole number does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNumber(1);
            });
        });

        test('verifyNumber with decimal number does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNumber(1.2);
            });
        });

        test('verifyNumber with Infinity does not throw', function () {
            assert.doesNotThrow(function () {
                types.verifyNumber(Infinity);
            });
        });

        test('verifyNumber with NaN throws', function () {
            assert.throws(function () {
                types.verifyNumber(NaN);
            });
        });

        test('verifyNumber with null throws', function () {
            assert.throws(function () {
                types.verifyNumber(null);
            });
        });

        test('verifyNumber with object throws', function () {
            assert.throws(function () {
                types.verifyNumber({});
            });
        });

        test('verifyNumber with string zero throws', function () {
            assert.throws(function () {
                types.verifyNumber('0');
            });
        });

        test('verifyNumber with empty string throws', function () {
            assert.throws(function () {
                types.verifyNumber(' x');
            });
        });

        test('isNumber function is defined', function () {
            assert.isFunction(types.isNumber);
        });

        test('isNumber with whole number returns true', function () {
            assert.isTrue(types.isNumber(1));
        });

        test('isNumber with decimal number returns true', function () {
            assert.isTrue(types.isNumber(1.2));
        });

        test('isNumber with Infinity returns true', function () {
            assert.isTrue(types.isNumber(Infinity));
        });

        test('isNumber with NaN returns false', function () {
            assert.isFalse(types.isNumber(NaN));
        });

        test('isNumber with null returns false', function () {
            assert.isFalse(types.isNumber(null));
        });

        test('isNumber with object returns false', function () {
            assert.isFalse(types.isNumber({}));
        });

        test('isNumber with string zero returns false', function () {
            assert.isFalse(types.isNumber('0'));
        });

        test('isNumber with empty string returns false', function () {
            assert.isFalse(types.isNumber(''));
        });
    });
}());

