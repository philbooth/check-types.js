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

        test('like with two empty objects does not throw', function () {
            assert.doesNotThrow(function () {
                check.like({}, {});
            });
        });

        test('like with null, empty object throws', function () {
            assert.throws(function () {
                check.like(null, {});
            });
        });

        test('like with empty function, empty object throws', function () {
            assert.throws(function () {
                check.like(function () {}, {});
            });
        });

        test('like with empty object, null throws', function () {
            assert.throws(function () {
                check.like({}, null);
            });
        });

        test('like with two empty object arguments returns true', function () {
            assert.isTrue(check.like({}, {}));
        });

        test('like with different named properties returns false', function () {
            assert.isFalse(check.like({ foo: {} }, { bar: {} }));
        });

        test('like with same named properties returns true', function () {
            assert.isTrue(check.like({ foo: {} }, { foo: {} }));
        });

        test('like with different named second properties returns false', function () {
            assert.isFalse(check.like({ foo: {}, bar: {} }, { foo: {}, baz: {} }));
        });

        test('like with same named second properties returns true', function () {
            assert.isTrue(check.like({ foo: function () {}, bar: {} }, { foo: function () {}, bar: {} }));
        });

        test('like with differently typed second properties returns false', function () {
            assert.isFalse(check.like({ foo: function () {}, bar: {} }, { foo: function () {}, bar: function () {} }));
        });

        test('like with different nested objects returns false', function() {
            assert.isFalse(check.like({ foo: { bar: { qux: 'string' }, baz: 23 }},
                                      { foo: { bar: { qux: 123      }, baz: 66 }}));
        });

        test('like with similar nested objects returns true', function() {
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

        test('instance with swapped arguments returns false', function () {
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

        test('null function is defined', function () {
            assert.isFunction(check.null);
        });

        test('null with null returns true', function () {
            assert.isTrue(check.null(null));
        });

        test('null with empty object returns false', function () {
            assert.isFalse(check.null({}));
        });

        test('null with undefined returns false', function () {
            assert.isFalse(check.null(undefined));
        });

        test('undefined function is defined', function () {
            assert.isFunction(check.undefined);
        });

        test('undefined with undefined returns true', function () {
            assert.isTrue(check.undefined(undefined));
        });

        test('undefined with null returns false', function () {
            assert.isFalse(check.undefined(null));
        });

        test('undefined with empty object returns false', function () {
            assert.isFalse(check.undefined({}));
        });

        test('undefined with false returns false', function () {
            assert.isFalse(check.undefined(false));
        });

        test('assigned function is defined', function () {
            assert.isFunction(check.assigned);
        });

        test('assigned with null returns false', function () {
            assert.isFalse(check.assigned(null));
        });

        test('assigned with undefined returns false', function () {
            assert.isFalse(check.assigned(undefined));
        });

        test('assigned with empty object returns true', function () {
            assert.isTrue(check.assigned({}));
        });

        test('assigned with empty string returns true', function () {
            assert.isTrue(check.assigned(''));
        });

        test('assigned with false returns true', function () {
            assert.isTrue(check.assigned(false));
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

        test('object with array returns false', function () {
            assert.isFalse(check.object([]));
        });

        test('object with string returns false', function () {
            assert.isFalse(check.object(''));
        });

        test('object with date returns false', function () {
            assert.isFalse(check.object(new Date()));
        });

        test('length function is defined', function () {
            assert.isFunction(check.length);
        });

        test('length without length argument throws', function () {
            assert.throws(function () {
                check.length({});
            });
        });

        test('length with length argument does not throw', function () {
            assert.doesNotThrow(function () {
                check.length({}, 5);
            });
        });

        test('length with zero on empty array returns true', function () {
            assert.isTrue(check.length([], 0));
        });

        test('length with zero on empty string returns true', function () {
            assert.isTrue(check.length('', 0));
        });

        test('length with zero on empty object returns false', function () {
            assert.isFalse(check.length({}, 0));
        });

        test('length with matching length on array returns true', function () {
            assert.isTrue(check.length([ 'foo', 'bar' ], 2));
        });

        test('length with contrasting length on array returns false', function () {
            assert.isFalse(check.length([ 'foo', 'bar', 'baz' ], 2));
        });

        test('length with matching length on string returns true', function () {
            assert.isTrue(check.length('foo', 3));
        });

        test('length with contrasting length on string returns false', function () {
            assert.isFalse(check.length('foobar', 3));
        });

        test('length with matching length on object returns true', function () {
            assert.isTrue(check.length({ length: 1 }, 1));
        });

        test('length with contrasting length on object returns false', function () {
            assert.isFalse(check.length({ length: 2 }, 1));
        });

        test('array function is defined', function () {
            assert.isFunction(check.array);
        });

        test('array with array returns true', function () {
            assert.isTrue(check.array([]));
        });

        test('array with string returns false', function () {
            assert.isFalse(check.array(''));
        });

        test('array with object returns false', function () {
            assert.isFalse(check.array({}));
        });

        test('array with arguments object returns false', function () {
            assert.isFalse(check.array(arguments));
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

        test('function function is defined', function () {
            assert.isFunction(check.function);
        });

        test('function with function returns true', function () {
            assert.isTrue(check.function(function () {}));
        });

        test('function with object returns false', function () {
            assert.isFalse(check.function({}));
        });

        test('webUrl function is defined', function () {
            assert.isFunction(check.webUrl);
        });

        test('webUrl with http scheme returns true', function () {
            assert.isTrue(check.webUrl('http://127.0.0.1:8080/'));
        });

        test('webUrl with ftp scheme returns false', function () {
            assert.isFalse(check.webUrl('ftp://example.com/'));
        });

        test('webUrl with https scheme returns true', function () {
            assert.isTrue(check.webUrl('https://example.com/'));
        });

        test('webUrl with httpss scheme returns false', function () {
            assert.isFalse(check.webUrl('httpss://'));
        });

        test('webUrl with object returns false', function () {
            assert.isFalse(
                check.webUrl({
                    toString: function () {
                        return 'https://example.com/';
                    }
                })
            );
        });

        test('webUrl with no scheme returns true', function () {
            assert.isTrue(check.webUrl('//example.com/'));
        });

        test('webUrl without domain returns false', function () {
            assert.isFalse(check.webUrl('http:///'));
        });

        test('webUrl with single-word domain returns true', function () {
            assert.isTrue(check.webUrl('http://ws/'));
        });

        test('webUrl without path returns true', function () {
            assert.isTrue(check.webUrl('http://example.com'));
        });

        test('webUrl with bad character returns false', function () {
            assert.isFalse(check.webUrl('http://example.com/`'));
        });

        test('webUrl with percent-encoding returns true', function () {
            assert.isTrue(check.webUrl('http://example.com/%20'));
        });

        test('unemptyString function is defined', function () {
            assert.isFunction(check.unemptyString);
        });

        test('unemptyString with unempty string returns true', function () {
            assert.isTrue(check.unemptyString('foo'));
        });

        test('unemptyString with empty string returns false', function () {
            assert.isFalse(check.unemptyString(''));
        });

        test('unemptyString with alternative unempty string returns true', function () {
            assert.isTrue(check.unemptyString('bar'));
        });

        test('unemptyString with object returns false', function () {
            assert.isFalse(
                check.unemptyString({
                    toString: function () {
                        return 'foo';
                    }
                })
            );
        });

        test('string function is defined', function () {
            assert.isFunction(check.string);
        });

        test('string with empty string returns true', function () {
            assert.isTrue(check.string(''));
        });

        test('string with object returns false', function () {
            assert.isFalse(
                check.string({
                    toString: function () {
                        return '';
                    }
                })
            );
        });

        test('odd function is defined', function () {
            assert.isFunction(check.odd);
        });

        test('odd with odd number returns true', function () {
            assert.isTrue(check.odd(1));
        });

        test('odd with even number returns false', function () {
            assert.isFalse(check.odd(2));
        });

        test('odd with negative odd number returns true', function () {
            assert.isTrue(check.odd(-3));
        });

        test('odd with negative even number returns false', function () {
            assert.isFalse(check.odd(-4));
        });

        test('odd with floating point number returns false', function () {
            assert.isFalse(check.odd(5.5));
        });

        test('odd with string returns false', function () {
            assert.isFalse(check.odd('1'));
        });

        test('even function is defined', function () {
            assert.isFunction(check.even);
        });

        test('even with even number returns true', function () {
            assert.isTrue(check.even(2));
        });

        test('even with odd number returns false', function () {
            assert.isFalse(check.even(3));
        });

        test('even with negative even number returns true', function () {
            assert.isTrue(check.even(-4));
        });

        test('even with negative odd number returns false', function () {
            assert.isFalse(check.even(-5));
        });

        test('even with floating point number returns false', function () {
            assert.isFalse(check.even(2.4));
        });

        test('even with string returns false', function () {
            assert.isFalse(check.even('2'));
        });

        test('positive function is defined', function () {
            assert.isFunction(check.positive);
        });

        test('positive with positive integer returns true', function () {
            assert.isTrue(check.positive(1));
        });

        test('positive with negative integer returns false', function () {
            assert.isFalse(check.positive(-1));
        });

        test('positive with positive fraction returns true', function () {
            assert.isTrue(check.positive(1/2));
        });

        test('positive with negative fraction returns false', function () {
            assert.isFalse(check.positive(-1/2));
        });

        test('positive with positive infinity returns false', function () {
            assert.isFalse(check.positive(Number.POSITIVE_INFINITY));
        });

        test('positive with NaN returns false', function () {
            assert.isFalse(check.positive(NaN));
        });

        test('positive with string returns false', function () {
            assert.isFalse(check.positive('1'));
        });

        test('negative function is defined', function () {
            assert.isFunction(check.negative);
        });

        test('negative with positive integer returns false', function () {
            assert.isFalse(check.negative(1));
        });

        test('negative with negative integer returns true', function () {
            assert.isTrue(check.negative(-1));
        });

        test('negative with positive fraction returns false', function () {
            assert.isFalse(check.negative(1/2));
        });

        test('negative with negative fraction returns true', function () {
            assert.isTrue(check.negative(-1/2));
        });

        test('negative with negative infinity returns false', function () {
            assert.isFalse(check.negative(Number.NEGATIVE_INFINITY));
        });

        test('negative with NaN returns false', function () {
            assert.isFalse(check.negative(NaN));
        });

        test('negative with string returns false', function () {
            assert.isFalse(check.negative('-1'));
        });

        test('integer function is defined', function () {
            assert.isFunction(check.integer);
        });

        test('integer with positive integer returns true', function () {
            assert.isTrue(check.integer(1));
        });

        test('integer with positive floating point number returns false', function () {
            assert.isFalse(check.integer(0.1));
        });

        test('integer with negative integer returns true', function () {
            assert.isTrue(check.integer(-2));
        });

        test('integer with negative floating point number returns false', function () {
            assert.isFalse(check.integer(-0.2));
        });

        test('integer with infinity returns false', function () {
            assert.isFalse(check.integer(Infinity));
        });

        test('integer with NaN returns false', function () {
            assert.isFalse(check.integer(NaN));
        });

        test('integer with string returns false', function () {
            assert.isFalse(check.integer('1'));
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

        test('number with string returns false', function () {
            assert.isFalse(check.number('1'));
        });

        test('boolean function is defined', function () {
            assert.isFunction(check.boolean);
        });

        test('boolean with true returns true', function () {
            assert.isTrue(check.boolean(true));
        });

        test('boolean with false returns true', function () {
            assert.isTrue(check.boolean(false));
        });

        test('boolean with one returns false', function () {
            assert.isFalse(check.boolean(1));
        });

        test('boolean with unempty string returns false', function () {
            assert.isFalse(check.boolean('1'));
        });

        test('apply function is defined', function () {
            assert.isFunction(check.apply);
        });

        test('apply with non-array data throws', function() {
            assert.throws(function () {
                check.apply({}, []);
            });
        });

        test('apply with non-array predicates throws', function() {
            assert.throws(function() {
                check.apply([], {});
            });
        });

        test('apply with array data and predicates does not throw', function() {
            assert.doesNotThrow(function() {
                check.apply([], []);
            });
        });

        test('apply with one predicate does not throw', function() {
            assert.doesNotThrow(function() {
                check.apply([ '', '', ''], check.string);
            });
        });

        test('apply with insufficient data throws', function() {
            assert.throws(function() {
                check.apply([ '' ], [ check.string, check.string ]);
            });
        });

        test('apply with insufficient predicates throws', function() {
            assert.throws(function() {
                check.apply([ '', '', '' ], [ check.string, check.string ]);
            });
        });

        test('apply returns the correct results', function() {
            var result =
                check.apply(
                    [ '', 0, '', 0 ],
                    [ check.string, check.string, check.number, check.number ]
                );
            assert.lengthOf(result, 4);
            assert.isTrue(result[0]);
            assert.isFalse(result[1]);
            assert.isFalse(result[2]);
            assert.isTrue(result[3]);
        });

        test('apply with assertion does not throw with valid data', function() {
            assert.doesNotThrow(function() {
                check.apply([ 'foo' ], check.assert.string);
            });
        });

        test('apply with assertion throws with invalid data', function() {
            assert.throws(function() {
                check.apply([ 'foo', 0 ], check.assert.string);
            });
        });

        test('map function is defined', function () {
            assert.isFunction(check.map);
        });

        test('map with non-object data throws', function() {
            assert.throws(function () {
                check.map([], {});
            });
        });

        test('map with non-object predicates throws', function() {
            assert.throws(function() {
                check.map({}, function () {});
            });
        });

        test('map with object data and predicates does not throw', function() {
            assert.doesNotThrow(function() {
                check.map({}, {});
            });
        });

        test('map with insufficient data throws', function() {
            assert.throws(function() {
                check.map({ foo: '' }, { foo: check.string, bar: check.string });
            });
        });

        test('map with insufficient predicates throws', function() {
            assert.throws(function() {
                check.map({ foo: '' }, {});
            });
        });

        test('map returns the correct results', function() {
            var result =
                check.map(
                    { foo: '', bar: 0, baz: { qux: 0 } },
                    { foo: check.string, bar: check.string, baz: { qux: check.number } }
                );
            assert.lengthOf(Object.keys(result), 3);
            assert.isTrue(result.foo);
            assert.isFalse(result.bar);
            assert.isObject(result.baz);
            assert.lengthOf(Object.keys(result.baz), 1);
            assert.isTrue(result.baz.qux);
        });

        test('map with assertion does not throw with valid data', function() {
            assert.doesNotThrow(function() {
                check.map({ foo: 'bar' }, { foo: check.assert.string });
            });
        });

        test('map with assertion throws with invalid data', function() {
            assert.throws(function() {
                check.map({ foo: 'foo', bar: 0 }, check.assert.string);
            });
        });

        test('all function is defined', function () {
            assert.isFunction(check.all);
        });

        test('all with invalid data throws', function() {
            assert.throws(function() {
                check.all('foo');
            });
        });

        test('all with object data does not throw', function() {
            assert.doesNotThrow(function() {
                check.all({ foo: true });
            });
        });

        test('all with array data does not throw', function() {
            assert.doesNotThrow(function() {
                check.all([ true ]);
            });
        });

        test('all returns true when data is all true', function() {
            assert.isTrue(check.all({ foo: true, bar: true, baz: true, qux: true }));
            assert.isTrue(check.all([ true, true, true, true ]));
            assert.isTrue(check.all({ foo: { bar: { baz: { qux: true }}}}));
        });

        test('all returns false when some data is not true', function() {
            assert.isFalse(check.all({ foo: true, bar: true, baz: true, qux: false }));
            assert.isFalse(check.all([ true, true, false, true ]));
            assert.isFalse(check.all({ foo: { bar: { baz: false }, qux: true } }));
        });

        test('any function is defined', function () {
            assert.isFunction(check.any);
        });

        test('any with invalid data throws', function() {
            assert.throws(function() {
                check.any('foo');
            });
        });

        test('any with object data does not throw', function() {
            assert.doesNotThrow(function() {
                check.any({ foo: true });
            });
        });

        test('any with array data does not throw', function() {
            assert.doesNotThrow(function() {
                check.any([ true ]);
            });
        });

        test('any returns true when some data is true', function() {
            assert.isTrue(check.any({ foo: false, bar: true }));
            assert.isTrue(check.any([ false, true ]));
            assert.isTrue(check.any({ foo: { bar: true }}));
        });

        test('any returns false when all data is not true', function() {
            assert.isFalse(check.any({ foo: false, bar: false }));
            assert.isFalse(check.any([ false, false ]));
            assert.isFalse(check.any({ foo: { bar: false }}));
        });

        test('assert modifier is defined', function() {
            assert.isObject(check.assert);
        });

        test('assert modifier is applied to predicates', function () {
            assert.isFunction(check.assert.like);
            assert.isFunction(check.assert.instance);
            assert.isFunction(check.assert.emptyObject);
            assert.isFunction(check.assert.object);
            assert.isFunction(check.assert.null);
            assert.isFunction(check.assert.undefined);
            assert.isFunction(check.assert.assigned);
            assert.isFunction(check.assert.length);
            assert.isFunction(check.assert.array);
            assert.isFunction(check.assert.date);
            assert.isFunction(check.assert.function);
            assert.isFunction(check.assert.webUrl);
            assert.isFunction(check.assert.unemptyString);
            assert.isFunction(check.assert.string);
            assert.isFunction(check.assert.odd);
            assert.isFunction(check.assert.even);
            assert.isFunction(check.assert.positive);
            assert.isFunction(check.assert.negative);
            assert.isFunction(check.assert.integer);
            assert.isFunction(check.assert.number);
            assert.isFunction(check.assert.boolean);
        });

        test('assert modifier is not applied to batch operations', function () {
            assert.isUndefined(check.assert.map);
            assert.isUndefined(check.assert.apply);
            assert.isUndefined(check.assert.all);
            assert.isUndefined(check.assert.any);
        });

        test('assert modifier is not applied to itself', function () {
            assert.isUndefined(check.assert.assert);
        });

        test('assert modifier is applied to not', function () {
            assert.isObject(check.assert.not);
            assert.lengthOf(Object.keys(check.assert.not), 21);
        });

        test('assert modifier is applied to maybe', function () {
            assert.isObject(check.assert.maybe);
            assert.lengthOf(Object.keys(check.assert.maybe), 21);
        });

        test('assert modifier is applied to either', function () {
            assert.isObject(check.assert.either);
            assert.lengthOf(Object.keys(check.assert.either), 21);
        });

        test('assert modifier has correct number of keys', function () {
            assert.lengthOf(Object.keys(check.assert), 24);
        });

        test('assert modifier throws when value is wrong', function () {
            assert.throws(function () {
                check.assert.unemptyString('');
            });
        });

        test('assert modifier does not throw when value is correct', function () {
            assert.doesNotThrow(function () {
                check.assert.unemptyString(' ');
            });
        });

        test('assert modifier throws Error instance', function () {
            try {
                check.assert.unemptyString('');
            } catch (error) {
                assert.instanceOf(error, Error);
            }
        });

        test('assert modifier sets default message on Error instance', function () {
            try {
                check.assert.unemptyString('');
            } catch (error) {
                assert.strictEqual(error.message, 'Invalid string');
            }
        });

        test('assert modifer sets message on Error instance', function () {
            try {
                check.assert.unemptyString('', 'foo bar');
            } catch (error) {
                assert.strictEqual(error.message, 'foo bar');
            }
        });

        test('assert modifier prohibits empty error messages', function () {
            try {
                check.assert.unemptyString('', '');
            } catch (error) {
                assert.strictEqual(error.message, 'Invalid string');
            }
        });

        test('not modifier is defined', function () {
            assert.isObject(check.not);
        });

        test('not modifier is not applied to itself', function () {
            assert.isUndefined(check.not.not);
        });

        test('not modifier is not applied to maybe', function () {
            assert.isUndefined(check.not.maybe);
        });

        test('not modifier is not applied to either', function () {
            assert.isUndefined(check.not.either);
        });

        test('not modifier is not applied to assert', function () {
            assert.isUndefined(check.not.assert);
        });

        test('not modifier has correct number of keys', function () {
            assert.lengthOf(Object.keys(check.not), 21);
        });

        test('not modifier returns true when predicate returns false', function() {
            assert.isTrue(check.not.object(undefined));
        });

        test('not modifier returns false when predicate returns true', function() {
            assert.isFalse(check.not.unemptyString('1'));
        });

        test('maybe modifier is defined', function () {
            assert.isObject(check.maybe);
        });

        test('maybe modifier is not applied to itself', function () {
            assert.isUndefined(check.maybe.maybe);
        });

        test('maybe modifier is not applied to not', function () {
            assert.isUndefined(check.maybe.not);
        });

        test('maybe modifier is not applied to either', function () {
            assert.isUndefined(check.maybe.either);
        });

        test('maybe modifier is not applied to assert', function () {
            assert.isUndefined(check.maybe.assert);
        });

        test('maybe modifier has correct number of keys', function () {
            assert.lengthOf(Object.keys(check.maybe), 21);
        });

        test('maybe modifier returns when true value is undefined', function() {
            assert.isTrue(check.maybe.object(undefined));
        });

        test('maybe modifier returns true when value is null', function() {
            assert.isTrue(check.maybe.object(null));
        });

        test('maybe modifier returns predicate result on value', function() {
            assert.isFalse(check.maybe.odd(2));
            assert.isTrue(check.maybe.odd(1));
        });

        test('maybe modifier with falsey values evaluates predicate', function() {
            assert.isFalse(check.maybe.positive(0));
        });

        test('either modifier is defined', function () {
            assert.isObject(check.either);
        });

        test('either modifier is not applied to itself', function () {
            assert.isUndefined(check.either.either);
        });

        test('either modifier is not applied to not', function () {
            assert.isUndefined(check.either.not);
        });

        test('either modifier is not applied to maybe', function () {
            assert.isUndefined(check.either.maybe);
        });

        test('either modifier is not applied to assert', function () {
            assert.isUndefined(check.either.assert);
        });

        test('either modifier has correct number of keys', function () {
            assert.lengthOf(Object.keys(check.either), 21);
        });

        test('either modifier returns or object', function () {
            assert.isObject(check.either.string(''));
            assert.isObject(check.either.string('').or);
            assert.lengthOf(Object.keys(check.either.string('').or), 21);
        });

        test('either returns true when first predicate is true', function () {
            assert.isTrue(check.either.odd(1).or.even(2));
            assert.isTrue(check.either.odd(1).or.even(3));
        });

        test('either returns second predicate result when first predicate is false', function () {
            assert.isTrue(check.either.odd(2).or.even(4));
            assert.isFalse(check.either.odd(2).or.even(5));
        });

        test('assert modifier with not throws when value is correct', function() {
            assert.throws(function() {
                check.assert.not.negative(-1);
            });
        });

        test('assert modifier with not does not throw when value is wrong', function() {
            assert.doesNotThrow(function() {
                check.assert.not.negative(1);
            });
        });

        test('assert modifier with maybe does not throw when value is correct', function() {
            assert.doesNotThrow(function() {
                check.assert.maybe.positive(1);
            });
        });

        test('assert modifier with maybe throws when value is wrong', function() {
            assert.throws(function() {
                check.assert.maybe.positive(-1);
            });
        });

        test('assert modifier with either does not throw when second value is correct', function() {
            assert.doesNotThrow(function() {
                check.assert.either.negative(1).or.positive(3);
            });
        });

        test('assert modifier with either does not throw when first value is correct', function() {
            assert.doesNotThrow(function() {
                check.assert.either.odd(7).or.even(5);
            });
        });

        test('assert modifier with either does not throw when both values are correct', function() {
            assert.doesNotThrow(function() {
                check.assert.either.string('').or.number(0);
            });
        });

        test('assert modifier with either throws when both values are wrong', function() {
            assert.throws(function() {
                check.assert.either.number('').or.string(0);
            });
        });
    });
}(typeof require === 'function' ? require : undefined));

