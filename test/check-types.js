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

    test('equal function is defined', function () {
      assert.isFunction(check.equal);
    });

    test('equal with different values returns false', function () {
      assert.isFalse(check.equal(1, 0));
    });

    test('equal with same values returns true', function () {
      assert.isTrue(check.equal(1, 1));
    });

    test('equal with coercible values returns false', function () {
      assert.isFalse(check.equal(1, '1'));
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

    test('null function is defined', function () {
      assert.isFunction(check.null);
    });

    test('null with null returns true', function () {
      assert.isTrue(check.null(null));
    });

    test('null with undefined returns false', function () {
      assert.isFalse(check.null(undefined));
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

    test('assigned with object returns true', function () {
      assert.isTrue(check.assigned({}));
    });

    test('assigned with false returns true', function () {
      assert.isTrue(check.assigned(false));
    });

    test('zero function is defined', function () {
      assert.isFunction(check.zero);
    });

    test('zero with zero returns true', function () {
      assert.isTrue(check.zero(0));
    });

    test('zero with non-zero returns false', function () {
      assert.isFalse(check.zero(0.00000001));
    });

    test('zero with string returns false', function () {
      assert.isFalse(check.zero('0'));
    });

    test('zero with false returns false', function () {
      assert.isFalse(check.zero(false));
    });

    test('infinity function is defined', function () {
      assert.isFunction(check.infinity);
    });

    test('infinity with positive infinity returns true', function () {
      assert.isTrue(check.infinity(Number.POSITIVE_INFINITY));
    });

    test('infinity with negative infinity returns true', function () {
      assert.isTrue(check.infinity(Number.NEGATIVE_INFINITY));
    });

    test('infinity with number returns false', function () {
      assert.isFalse(check.infinity(1));
    });

    test('number function is defined', function () {
      assert.isFunction(check.number);
    });

    test('number with number returns true', function () {
      assert.isTrue(check.number(1));
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

    test('integer function is defined', function () {
      assert.isFunction(check.integer);
    });

    test('integer with integer returns true', function () {
      assert.isTrue(check.integer(-1));
    });

    test('integer with floating point number returns false', function () {
      assert.isFalse(check.integer(0.1));
    });

    test('integer with infinity returns false', function () {
      assert.isFalse(check.integer(Infinity));
    });

    test('integer with string returns false', function () {
      assert.isFalse(check.integer('1'));
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

    test('even with floating point number returns false', function () {
      assert.isFalse(check.even(2.4));
    });

    test('even with string returns false', function () {
      assert.isFalse(check.even('2'));
    });

    test('odd function is defined', function () {
      assert.isFunction(check.odd);
    });

    test('odd with odd number returns true', function () {
      assert.isTrue(check.odd(-1));
    });

    test('odd with even number returns false', function () {
      assert.isFalse(check.odd(-2));
    });

    test('odd with floating point number returns false', function () {
      assert.isFalse(check.odd(5.5));
    });

    test('odd with string returns false', function () {
      assert.isFalse(check.odd('-1'));
    });

    test('greater function is defined', function () {
      assert.isFunction(check.greater);
    });

    test('greater with lesser number returns false', function () {
      assert.isFalse(check.greater(0, 1));
    });

    test('greater with greater number returns true', function () {
      assert.isTrue(check.greater(1/2, 1/4));
    });

    test('greater works with negative numbers', function () {
      assert.isFalse(check.greater(-2, -1));
    });

    test('greater with positive infinity returns false', function () {
      assert.isFalse(check.greater(Number.POSITIVE_INFINITY, 0));
    });

    test('greater with NaN returns false', function () {
      assert.isFalse(check.greater(NaN, -1));
    });

    test('greater with string returns false', function () {
      assert.isFalse(check.greater('1', 0));
    });

    test('less function is defined', function () {
      assert.isFunction(check.less);
    });

    test('less with lesser number returns true', function () {
      assert.isTrue(check.less(1/8, 1/4));
    });

    test('less with greater number returns false', function () {
      assert.isFalse(check.less(1, 0));
    });

    test('less works with negative numbers', function () {
      assert.isTrue(check.less(-2, -1));
    });

    test('less with negative infinity returns false', function () {
      assert.isFalse(check.less(Number.NEGATIVE_INFINITY, 0));
    });

    test('less with NaN returns false', function () {
      assert.isFalse(check.less(NaN, 1));
    });

    test('less with string returns false', function () {
      assert.isFalse(check.less('-1', 0));
    });

    test('between function is defined', function () {
      assert.isFunction(check.between);
    });

    test('between with boundary value returns false', function () {
      assert.isFalse(check.between(1, 0, 1));
    });

    test('between with in-between value returns true', function () {
      assert.isTrue(check.between(1, 0, 2));
    });

    test('between works with fractions', function () {
      assert.isTrue(check.between(1/2, 1/4, 1));
    });

    test('between works with negative numbers', function () {
      assert.isTrue(check.between(-2, -3, -1));
    });

    test('greaterOrEqual function is defined', function () {
      assert.isFunction(check.greaterOrEqual);
    });

    test('greaterOrEqual with lesser number returns false', function () {
      assert.isFalse(check.greaterOrEqual(0, 1));
    });

    test('greaterOrEqual with equal number returns true', function () {
      assert.isTrue(check.greaterOrEqual(1, 1));
    });

    test('greaterOrEqual works with negative numbers', function () {
      assert.isFalse(check.greaterOrEqual(-1, 0));
    });

    test('greaterOrEqual with positive infinity returns false', function () {
      assert.isFalse(check.greaterOrEqual(Number.POSITIVE_INFINITY, 0));
    });

    test('greaterOrEqual with NaN returns false', function () {
      assert.isFalse(check.greaterOrEqual(NaN, -1));
    });

    test('greaterOrEqual with string returns false', function () {
      assert.isFalse(check.greaterOrEqual('1', 1));
    });

    test('lessOrEqual function is defined', function () {
      assert.isFunction(check.lessOrEqual);
    });

    test('lessOrEqual with 1, 0 returns false', function () {
      assert.isFalse(check.lessOrEqual(1, 0));
    });

    test('lessOrEqual with 1, 1 returns true', function () {
      assert.isTrue(check.lessOrEqual(1, 1));
    });

    test('lessOrEqual works with negative numbers', function () {
      assert.isTrue(check.lessOrEqual(-2, -2));
    });

    test('lessOrEqual with negative infinity returns false', function () {
      assert.isFalse(check.lessOrEqual(Number.NEGATIVE_INFINITY, 0));
    });

    test('lessOrEqual with NaN returns false', function () {
      assert.isFalse(check.lessOrEqual(NaN, 1));
    });

    test('lessOrEqual with string returns false', function () {
      assert.isFalse(check.lessOrEqual('-1', -1));
    });

    test('inRange function is defined', function () {
      assert.isFunction(check.inRange);
    });

    test('inRange with out-of-range number returns false', function () {
      assert.isFalse(check.inRange(2, 0, 1));
    });

    test('inRange with upper-bound number returns true', function () {
      assert.isTrue(check.inRange(1, 0, 1));
    });

    test('inRange with lower-bound number returns true', function () {
      assert.isTrue(check.inRange(0, 0, 1));
    });

    test('inRange with unordered bounds returns true', function () {
      assert.isTrue(check.inRange(-1, 0, -1));
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

    test('string function is defined', function () {
      assert.isFunction(check.string);
    });

    test('string with empty string returns true', function () {
      assert.isTrue(check.string(''));
    });

    test('string with coercible object returns false', function () {
      assert.isFalse(
        check.string({
          toString: function () {
            return '';
          }
        })
      );
    });

    test('emptyString function is defined', function () {
      assert.isFunction(check.emptyString);
    });

    test('emptyString with empty string returns true', function () {
      assert.isTrue(check.emptyString(''));
    });

    test('emptyString with non-empty string returns false', function () {
      assert.isFalse(check.emptyString('wibble'));
    });

    test('emptyString with coercible object returns false', function () {
      assert.isFalse(
        check.emptyString({
          toString: function () {
            return '';
          }
        })
      );
    });

    test('nonEmptyString function is defined', function () {
      assert.isFunction(check.nonEmptyString);
    });

    test('nonEmptyString with non-empty string returns true', function () {
      assert.isTrue(check.nonEmptyString('foo'));
    });

    test('nonEmptyString with empty string returns false', function () {
      assert.isFalse(check.nonEmptyString(''));
    });

    test('nonEmptyString with coercible object returns false', function () {
      assert.isFalse(
        check.nonEmptyString({
          toString: function () {
            return 'foo';
          }
        })
      );
    });

    test('contains function is defined', function () {
      assert.isFunction(check.contains);
    });

    test('contains with match returns true', function () {
      assert.isTrue(check.contains('foo', 'oo'));
    });

    test('contains with no match returns false', function () {
      assert.isFalse(check.contains('foo', 'of'));
    });

    test('contains with coercible object returns false', function () {
      assert.isFalse(
        check.contains({
          toString: function () {
            return 'foo';
          }
        }, 'oo')
      );
    });

    test('match function is defined', function () {
      assert.isFunction(check.match);
    });

    test('match with match returns true', function () {
      assert.isTrue(check.match('foo', /^FOO$/i));
    });

    test('match with no match returns false', function () {
      assert.isFalse(check.match('foo', /^foO$/));
    });

    test('match with coercible object returns false', function () {
      assert.isFalse(
        check.match({
          toString: function () {
            return 'foo';
          }
        }, /^foo$/)
      );
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

    test('instance function is defined', function () {
      assert.isFunction(check.instance);
    });

    test('instance with valid instance returns true', function () {
      assert.isTrue(check.instance(new Error(), Error));
    });

    test('instance with invalid instance returns false', function () {
      assert.isFalse(check.instance(new Error(), Array));
    });

    test('instance with derived instance returns true', function () {
      assert.isTrue(check.instance(new Error(), Object));
    });

    test('instance with null object returns false', function () {
      assert.isFalse(check.instance(null, Object));
    });

    test('instance with null prototype returns false', function () {
      assert.isFalse(check.instance(null, null));
    });

    if (typeof document !== 'undefined' && typeof HTMLElement !== 'undefined') {
      test('instance with element and HTMLElement returns true', function () {
        assert.isTrue(check.instance(document.createElement('div'), HTMLElement));
      });
    }

    test('builtIn function is defined', function () {
      assert.isFunction(check.builtIn);
    });

    test('builtIn with valid instance returns true', function () {
      assert.isTrue(check.builtIn([], Array));
    });

    test('builtIn with invalid instance returns false', function () {
      assert.isFalse(check.builtIn({}, Array));
    });

    test('builtIn with derived instance returns true', function () {
      assert.isTrue(check.builtIn([], Object));
    });

    test('userDefined function is defined', function () {
      assert.isFunction(check.userDefined);
    });

    test('userDefined with valid instance returns true', function () {
      assert.isTrue(check.userDefined(/./, RegExp));
    });

    test('userDefined with invalid instance returns false', function () {
      assert.isFalse(check.userDefined('', RegExp));
    });

    test('userDefined with derived instance returns true', function () {
      assert.isTrue(check.userDefined(/./, Object));
    });

    suite('mock Object.prototype.toString:', function () {
      var toString;

      setup(function () {
        toString = Object.prototype.toString;
        Object.prototype.toString = function () {
          return '[object Array]';
        };
      });

      teardown(function () {
        Object.prototype.toString = toString;
      });

      test('instance with matching prototype returns false', function () {
        assert.isFalse(check.instance({}, Array));
      });

      test('builtIn with matching prototype returns true', function () {
        assert.isTrue(check.builtIn({}, Array));
      });

      test('builtIn with non-matching prototype returns false', function () {
        assert.isFalse(check.builtIn({}, Error));
      });

      test('userDefined with matching prototype returns false', function () {
        assert.isFalse(check.userDefined({}, Array));
      });
    });

    suite('mock constructor.name:', function () {
      var object;

      setup(function () {
        object = {
          constructor: {
            name: 'Array'
          }
        };
      });

      teardown(function () {
        Object.prototype.toString = toString;
      });

      test('instance with matching prototype returns false', function () {
        assert.isFalse(check.instance(object, Array));
      });

      test('builtIn with matching prototype returns false', function () {
        assert.isFalse(check.builtIn(object, Array));
      });

      test('userDefined with matching prototype returns true', function () {
        assert.isTrue(check.userDefined(object, Array));
      });

      test('userDefined with non-matching prototype returns false', function () {
        assert.isFalse(check.userDefined(object, Error));
      });
    });

    test('like function is defined', function () {
      assert.isFunction(check.like);
    });

    test('like with two empty object arguments returns true', function () {
      assert.isTrue(check.like({}, {}));
    });

    test('like with different named properties returns false', function () {
      assert.isFalse(
        check.like(
          { foo: {}, bar: {} },
          { foo: {}, baz: {} }
        )
      );
    });

    test('like with same named properties returns true', function () {
      assert.isTrue(
        check.like(
          { foo: function () {}, bar: {} },
          { foo: function () {}, bar: {} }
        )
      );
    });

    test('like with differently typed properties returns false', function () {
      assert.isFalse(
        check.like(
          { foo: function () {}, bar: {} },
          { foo: function () {}, bar: function () {} }
        )
      );
    });

    test('like with different nested objects returns false', function () {
      assert.isFalse(
        check.like(
          { foo: { bar: { qux: 'string' }, baz: 23 }},
          { foo: { bar: { qux: 42       }, baz: 66 }}
        )
      );
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

    test('emptyArray function is defined', function () {
      assert.isFunction(check.emptyArray);
    });

    test('emptyArray with empty array returns true', function () {
      assert.isTrue(check.emptyArray([]));
    });

    test('emptyArray with non-empty array returns false', function () {
      assert.isFalse(check.emptyArray([ 'foo' ]));
    });

    test('emptyArray with empty object returns false', function () {
      assert.isFalse(check.emptyArray({}));
    });

    test('arrayLike function is defined', function () {
      assert.isFunction(check.arrayLike);
    });

    test('arrayLike with array returns true', function () {
      assert.isTrue(check.arrayLike([]));
    });

    test('arrayLike with string returns true', function () {
      assert.isTrue(check.arrayLike(''));
    });

    test('arrayLike with object returns false', function () {
      assert.isFalse(check.arrayLike({}));
    });

    test('arrayLike with arguments object returns true', function () {
      assert.isTrue(check.arrayLike(arguments));
    });

    if (typeof Map !== 'undefined') {
      test('arrayLike with Map returns false', function () {
        assert.isFalse(check.arrayLike(new Map()));
      });
    }

    test('iterable function is defined', function () {
      assert.isFunction(check.iterable);
    });

    test('iterable with array returns true', function () {
      assert.isTrue(check.iterable([]));
    });

    test('iterable with string returns true', function () {
      assert.isTrue(check.iterable(''));
    });

    test('iterable with object returns false', function () {
      assert.isFalse(check.iterable({}));
    });

    if (typeof Set !== 'undefined') {
      test('iterable with Set returns true', function () {
        assert.isTrue(check.iterable(new Set()));
      });
    }

    test('includes function is defined', function () {
      assert.isFunction(check.includes);
    });

    test('includes with matching value in object returns true', function () {
      assert.isTrue(check.includes({ first: 'foo', second: 'bar' }, 'bar'));
    });

    test('includes with non-matching value in object returns false', function () {
      assert.isFalse(check.includes({ baz: 'foo', qux: 'bar' }, 'baz'));
    });

    test('includes with matching value in array returns true', function () {
      assert.isTrue(check.includes([ 'foo', 'bar' ], 'bar'));
    });

    test('includes with non-matching value in array returns false', function () {
      assert.isFalse(check.includes([ 'foo', 'bar' ], 'baz'));
    });

    if (typeof Set !== 'undefined') {
      test('includes with matching value in set returns true', function () {
        assert.isTrue(check.includes(new Set([ 'foo', 'bar' ]), 'bar'));
      });

      test('includes with non-matching value in set returns false', function () {
        assert.isFalse(check.includes(new Set([ 'foo', 'bar' ]), 'baz'));
      });
    }

    if (typeof Map !== 'undefined') {
      test('includes with matching value in map returns true', function () {
        assert.isTrue(check.includes(new Map([['first','foo'], ['second','bar']]), 'bar'));
      });

      test('includes with non-matching value in map returns false', function () {
        assert.isFalse(check.includes(new Map([['baz','foo'], ['qux','bar']]), 'baz'));
      });
    }

    test('includes with null returns false', function () {
      assert.isFalse(check.includes(null, 'foo'));
    });

    test('hasLength function is defined', function () {
      assert.isFunction(check.hasLength);
    });

    test('hasLength with zero on empty array returns true', function () {
      assert.isTrue(check.hasLength([], 0));
    });

    test('hasLength with zero on empty string returns true', function () {
      assert.isTrue(check.hasLength('', 0));
    });

    test('hasLength with zero on empty object returns false', function () {
      assert.isFalse(check.hasLength({}, 0));
    });

    test('hasLength with matching length on array returns true', function () {
      assert.isTrue(check.hasLength([ 'foo', 'bar' ], 2));
    });

    test('hasLength with contrasting length on array returns false', function () {
      assert.isFalse(check.hasLength([ 'foo', 'bar', 'baz' ], 2));
    });

    test('hasLength with matching length on string returns true', function () {
      assert.isTrue(check.hasLength('foo', 3));
    });

    test('hasLength with contrasting length on string returns false', function () {
      assert.isFalse(check.hasLength('foobar', 3));
    });

    test('hasLength with matching length on object returns true', function () {
      assert.isTrue(check.hasLength({ length: 1 }, 1));
    });

    test('hasLength with contrasting length on object returns false', function () {
      assert.isFalse(check.hasLength({ length: 2 }, 1));
    });

    test('date function is defined', function () {
      assert.isFunction(check.date);
    });

    test('date with date returns true', function () {
      assert.isTrue(check.date(new Date()));
    });

    test('date with invalid date returns false', function () {
      assert.isFalse(check.date(new Date('foo')));
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

    test('apply function is defined', function () {
      assert.isFunction(check.apply);
    });

    test('apply with non-array data throws', function () {
      assert.throws(function () {
        check.apply({}, []);
      });
    });

    test('apply with non-array predicates throws', function () {
      assert.throws(function () {
        check.apply([], {});
      });
    });

    test('apply with array data and predicates does not throw', function () {
      assert.doesNotThrow(function () {
        check.apply([], []);
      });
    });

    test('apply with one predicate does not throw', function () {
      assert.doesNotThrow(function () {
        check.apply([ '', '', ''], check.string);
      });
    });

    test('apply with insufficient data throws', function () {
      assert.throws(function () {
        check.apply([ '' ], [ check.string, check.string ]);
      });
    });

    test('apply with insufficient predicates throws', function () {
      assert.throws(function () {
        check.apply([ '', '', '' ], [ check.string, check.string ]);
      });
    });

    test('apply returns the correct results', function () {
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

    test('apply with assertion does not throw with valid data', function () {
      assert.doesNotThrow(function () {
        check.apply([ 'foo' ], check.assert.string);
      });
    });

    test('apply with assertion throws with invalid data', function () {
      assert.throws(function () {
        check.apply([ 'foo', 0 ], check.assert.string);
      });
    });

    test('map function is defined', function () {
      assert.isFunction(check.map);
    });

    test('map with non-object data throws', function () {
      assert.throws(function () {
        check.map([], {});
      });
    });

    test('map with object data does not throw', function () {
      assert.doesNotThrow(function () {
        check.map({}, {});
      });
    });

    test('map returns the correct results', function () {
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

    test('map with assertion does not throw with valid data', function () {
      assert.doesNotThrow(function () {
        check.map({ foo: 'bar' }, { foo: check.assert.string });
      });
    });

    test('map with assertion throws with invalid data', function () {
      assert.throws(function () {
        check.map({ foo: 'foo', bar: 0 }, check.assert.string);
      });
    });

    test('map returns the correct results with maybe modifier', function () {
      var result =
        check.map(
          { foo: null, baz: { qux: '' } },
          { foo: check.maybe.string, bar: check.maybe.string, baz: { qux: check.maybe.string } }
        );

      assert.lengthOf(Object.keys(result), 3);
      assert.isTrue(result.foo);
      assert.isTrue(result.bar);
      assert.isObject(result.baz);
      assert.lengthOf(Object.keys(result.baz), 1);
      assert.isTrue(result.baz.qux);
    });

    test('map works with a single predicate', function () {
      var result = check.map({ foo: {}, bar: { baz: 'qux' } }, check.object);

      assert.lengthOf(Object.keys(result), 2);
      assert.isTrue(result.foo);
      assert.isTrue(result.bar);
    });

    test('map works with undefined data and maybe', function () {
      var result = check.map({}, { foo: { bar: check.maybe.string } });

      assert.lengthOf(Object.keys(result), 1);
      assert.isObject(result.foo);
      assert.lengthOf(Object.keys(result.foo), 1);
      assert.isTrue(result.foo.bar);
    });

    test('map works with undefined data and undefined', function () {
      var result = check.map({}, { foo: { bar: check.undefined } });

      assert.lengthOf(Object.keys(result), 1);
      assert.isObject(result.foo);
      assert.lengthOf(Object.keys(result.foo), 1);
      assert.isFalse(result.foo.bar);
    });

    test('map works with undefined data and not.assigned', function () {
      var result = check.map({}, { foo: { bar: check.not.assigned } });

      assert.lengthOf(Object.keys(result), 1);
      assert.isObject(result.foo);
      assert.lengthOf(Object.keys(result.foo), 1);
      assert.isFalse(result.foo.bar);
    });

    test('all function is defined', function () {
      assert.isFunction(check.all);
    });

    test('all with invalid data throws', function () {
      assert.throws(function () {
        check.all('foo');
      });
    });

    test('all with object data does not throw', function () {
      assert.doesNotThrow(function () {
        check.all({ foo: true });
      });
    });

    test('all with array data does not throw', function () {
      assert.doesNotThrow(function () {
        check.all([ true ]);
      });
    });

    test('all returns true when data is all true', function () {
      assert.isTrue(check.all({ foo: true, bar: true, baz: true, qux: true }));
      assert.isTrue(check.all([ true, true, true, true ]));
      assert.isTrue(check.all({ foo: { bar: { baz: { qux: true }}}}));
    });

    test('all returns false when some data is not true', function () {
      assert.isFalse(check.all({ foo: true, bar: true, baz: true, qux: false }));
      assert.isFalse(check.all([ true, true, false, true ]));
      assert.isFalse(check.all({ foo: { bar: { baz: false }, qux: true } }));
    });

    test('any function is defined', function () {
      assert.isFunction(check.any);
    });

    test('any with invalid data throws', function () {
      assert.throws(function () {
        check.any('foo');
      });
    });

    test('any with object data does not throw', function () {
      assert.doesNotThrow(function () {
        check.any({ foo: true });
      });
    });

    test('any with array data does not throw', function () {
      assert.doesNotThrow(function () {
        check.any([ true ]);
      });
    });

    test('any returns true when some data is true', function () {
      assert.isTrue(check.any({ foo: false, bar: true }));
      assert.isTrue(check.any([ false, true ]));
      assert.isTrue(check.any({ foo: { bar: true }}));
    });

    test('any returns false when all data is not true', function () {
      assert.isFalse(check.any({ foo: false, bar: false }));
      assert.isFalse(check.any([ false, false ]));
      assert.isFalse(check.any({ foo: { bar: false }}));
    });

    test('assert modifier is defined', function () {
      assert.isFunction(check.assert);
    });

    test('assert modifier is applied to predicates', function () {
      assert.isFunction(check.assert.like);
      assert.isFunction(check.assert.instance);
      assert.isFunction(check.assert.emptyObject);
      assert.isFunction(check.assert.object);
      assert.isFunction(check.assert.null);
      assert.isFunction(check.assert.undefined);
      assert.isFunction(check.assert.assigned);
      assert.isFunction(check.assert.hasLength);
      assert.isFunction(check.assert.includes);
      assert.isFunction(check.assert.emptyArray);
      assert.isFunction(check.assert.array);
      assert.isFunction(check.assert.arrayLike);
      assert.isFunction(check.assert.iterable);
      assert.isFunction(check.assert.date);
      assert.isFunction(check.assert.function);
      assert.isFunction(check.assert.match);
      assert.isFunction(check.assert.contains);
      assert.isFunction(check.assert.nonEmptyString);
      assert.isFunction(check.assert.string);
      assert.isFunction(check.assert.odd);
      assert.isFunction(check.assert.even);
      assert.isFunction(check.assert.between);
      assert.isFunction(check.assert.greater);
      assert.isFunction(check.assert.less);
      assert.isFunction(check.assert.positive);
      assert.isFunction(check.assert.negative);
      assert.isFunction(check.assert.zero);
      assert.isFunction(check.assert.integer);
      assert.isFunction(check.assert.number);
      assert.isFunction(check.assert.boolean);
      assert.isFunction(check.assert.equal);
    });

    test('assert modifier is not applied to batch operations', function () {
      assert.isUndefined(check.assert.map);
      assert.strictEqual(check.assert.apply, Function.apply);
      assert.isUndefined(check.assert.all);
      assert.isUndefined(check.assert.any);
    });

    test('assert modifier is not applied to itself', function () {
      assert.isUndefined(check.assert.assert);
    });

    test('assert modifier is applied to not', function () {
      assert.isObject(check.assert.not);
      assert.lengthOf(Object.keys(check.assert.not), 38);
    });

    test('assert modifier is applied to maybe', function () {
      assert.isObject(check.assert.maybe);
      assert.lengthOf(Object.keys(check.assert.maybe), 38);
    });

    test('assert modifier has correct number of keys', function () {
      assert.lengthOf(Object.keys(check.assert), 40);
    });

    test('assert modifier throws when value is wrong', function () {
      assert.throws(function () {
        check.assert.nonEmptyString('');
      });
    });

    test('assert modifier does not throw when value is correct', function () {
      assert.doesNotThrow(function () {
        check.assert.nonEmptyString(' ');
      });
    });

    test('assert modifier throws Error instance', function () {
      try {
        check.assert.nonEmptyString('');
      } catch (error) {
        assert.instanceOf(error, Error);
      }
    });

    test('assert modifier sets default message on Error instance', function () {
      try {
        check.assert.nonEmptyString('');
      } catch (error) {
        assert.strictEqual(error.message, 'Invalid string');
      }
    });

    test('assert modifer sets message on Error instance', function () {
      try {
        check.assert.nonEmptyString('', 'foo bar');
      } catch (error) {
        assert.strictEqual(error.message, 'foo bar');
      }
    });

    test('assert modifier prohibits empty error messages', function () {
      try {
        check.assert.nonEmptyString('', '');
      } catch (error) {
        assert.strictEqual(error.message, 'Invalid string');
      }
    });

    test('assert throws errors with the correct messages', function () {
      assert.throws(function () { check.assert.equal(0, 1) }, 'Invalid value');
      assert.throws(function () { check.assert.undefined(5) }, 'Invalid value');
      assert.throws(function () { check.assert.null() }, 'Invalid value');
      assert.throws(function () { check.assert.assigned() }, 'Invalid value');
      assert.throws(function () { check.assert.zero() }, 'Invalid number');
      assert.throws(function () { check.assert.infinity() }, 'Invalid number');
      assert.throws(function () { check.assert.number() }, 'Invalid number');
      assert.throws(function () { check.assert.integer() }, 'Invalid number');
      assert.throws(function () { check.assert.even() }, 'Invalid number');
      assert.throws(function () { check.assert.odd() }, 'Invalid number');
      assert.throws(function () { check.assert.greater() }, 'Invalid number');
      assert.throws(function () { check.assert.less() }, 'Invalid number');
      assert.throws(function () { check.assert.between() }, 'Invalid number');
      assert.throws(function () { check.assert.greaterOrEqual() }, 'Invalid number');
      assert.throws(function () { check.assert.lessOrEqual() }, 'Invalid number');
      assert.throws(function () { check.assert.inRange() }, 'Invalid number');
      assert.throws(function () { check.assert.positive() }, 'Invalid number');
      assert.throws(function () { check.assert.negative() }, 'Invalid number');
      assert.throws(function () { check.assert.string() }, 'Invalid string');
      assert.throws(function () { check.assert.emptyString() }, 'Invalid string');
      assert.throws(function () { check.assert.nonEmptyString() }, 'Invalid string');
      assert.throws(function () { check.assert.contains() }, 'Invalid string');
      assert.throws(function () { check.assert.match() }, 'Invalid string');
      assert.throws(function () { check.assert.boolean() }, 'Invalid boolean');
      assert.throws(function () { check.assert.object() }, 'Invalid object');
      assert.throws(function () { check.assert.emptyObject() }, 'Invalid object');
      assert.throws(function () { check.assert.instance() }, 'Invalid type');
      assert.throws(function () { check.assert.builtIn() }, 'Invalid type');
      assert.throws(function () { check.assert.userDefined() }, 'Invalid type');
      assert.throws(function () { check.assert.like({a: 5}, {b: 2}) }, 'Invalid type');
      assert.throws(function () { check.assert.array() }, 'Invalid array');
      assert.throws(function () { check.assert.emptyArray() }, 'Invalid array');
      assert.throws(function () { check.assert.arrayLike() }, 'Invalid array-like');
      assert.throws(function () { check.assert.iterable() }, 'Invalid iterable');
      assert.throws(function () { check.assert.includes() }, 'Invalid value');
      assert.throws(function () { check.assert.hasLength() }, 'Invalid length');
      assert.throws(function () { check.assert.date() }, 'Invalid date');
      assert.throws(function () { check.assert.function() }, 'Invalid function');
    });


    test('assert modifier runs standalone', function () {
      assert.doesNotThrow(function () {
        check.assert(true);
      });

      assert.throws(function () {
        check.assert(false);
      });
    });

    test('assert modifier throws for multi-argument predicates', function () {
      assert.throws(function () {
        check.assert.between(1, 2, 1);
      });
    });

    test('assert modifier does not throw for multi-argument predicates', function () {
      assert.doesNotThrow(function () {
        check.assert.between(1, 2, 0);
      });
    });

    test('not modifier is defined', function () {
      assert.isFunction(check.not);
    });

    test('not modifier is not applied to itself', function () {
      assert.isUndefined(check.not.not);
    });

    test('not modifier is not applied to maybe', function () {
      assert.isUndefined(check.not.maybe);
    });

    test('not modifier is not applied to assert', function () {
      assert.isUndefined(check.not.assert);
    });

    test('not modifier has correct number of keys', function () {
      assert.lengthOf(Object.keys(check.not), 38);
    });

    test('not modifier returns true when predicate returns false', function () {
      assert.isTrue(check.not.object(undefined));
    });

    test('not modifier returns false when predicate returns true', function () {
      assert.isFalse(check.not.nonEmptyString('1'));
    });

    test('not modifier runs standalone', function () {
      assert.isFalse(check.not(true));
      assert.isTrue(check.not(false));
    });

    test('not modifier returns true for multi-argument predicates', function () {
      assert.isTrue(check.not.between(1, 2, 1));
    });

    test('not modifier returns false for multi-argument predicates', function () {
      assert.isFalse(check.not.between(1, 2, 0));
    });

    test('maybe modifier is defined', function () {
      assert.isFunction(check.maybe);
    });

    test('maybe modifier is not applied to itself', function () {
      assert.isUndefined(check.maybe.maybe);
    });

    test('maybe modifier is not applied to not', function () {
      assert.isUndefined(check.maybe.not);
    });

    test('maybe modifier is not applied to assert', function () {
      assert.isUndefined(check.maybe.assert);
    });

    test('maybe modifier has correct number of keys', function () {
      assert.lengthOf(Object.keys(check.maybe), 38);
    });

    test('maybe modifier returns true when value is undefined', function () {
      assert.isTrue(check.maybe.object(undefined));
    });

    test('maybe modifier returns true when value is null', function () {
      assert.isTrue(check.maybe.object(null));
    });

    test('maybe modifier returns predicate result on value', function () {
      assert.isFalse(check.maybe.odd(2));
      assert.isTrue(check.maybe.odd(1));
    });

    test('maybe modifier with falsey values evaluates predicate', function () {
      assert.isFalse(check.maybe.positive(0));
    });

    test('maybe modifier runs standalone', function () {
      assert.isTrue(check.maybe(null));
      assert.isTrue(check.maybe(undefined));
      assert.isFalse(check.maybe(false));
    });

    test('maybe modifier shortcuts for multi-argument predicates', function () {
      assert.isTrue(check.maybe.instance(null, Error));
    });

    test('assert modifier with not throws when value is correct', function () {
      assert.throws(function () {
        check.assert.not.between(1, 2, 0);
      });
    });

    test('assert modifier with not does not throw when value is wrong', function () {
      assert.doesNotThrow(function () {
        check.assert.not.between(1, 2, 1);
      });
    });

    test('assert modifier with maybe does not throw when value is correct', function () {
      assert.doesNotThrow(function () {
        check.assert.maybe.between(1, 2, 0);
      });
    });

    test('assert modifier with maybe does not throw when value is null', function () {
      assert.doesNotThrow(function () {
        check.assert.maybe.between(null, 2, 1);
      });
    });

    test('assert modifier with maybe throws when value is wrong', function () {
      assert.throws(function () {
        check.assert.maybe.between(1, 2, 1);
      });
    });

    test('array.of modifier is defined', function () {
      assert.isObject(check.array.of);
    });

    test('array.of has predicates defined', function () {
      assert.lengthOf(Object.keys(check.array.of), 38);
      assert.isFunction(check.array.of.equal);
      assert.isFunction(check.array.of.undefined);
      assert.isFunction(check.array.of.null);
      assert.isFunction(check.array.of.assigned);
      assert.isFunction(check.array.of.zero);
      assert.isFunction(check.array.of.infinity);
      assert.isFunction(check.array.of.number);
      assert.isFunction(check.array.of.integer);
      assert.isFunction(check.array.of.even);
      assert.isFunction(check.array.of.odd);
      assert.isFunction(check.array.of.greater);
      assert.isFunction(check.array.of.less);
      assert.isFunction(check.array.of.between);
      assert.isFunction(check.array.of.greaterOrEqual);
      assert.isFunction(check.array.of.lessOrEqual);
      assert.isFunction(check.array.of.inRange);
      assert.isFunction(check.array.of.positive);
      assert.isFunction(check.array.of.negative);
      assert.isFunction(check.array.of.string);
      assert.isFunction(check.array.of.emptyString);
      assert.isFunction(check.array.of.nonEmptyString);
      assert.isFunction(check.array.of.contains);
      assert.isFunction(check.array.of.match);
      assert.isFunction(check.array.of.boolean);
      assert.isFunction(check.array.of.object);
      assert.isFunction(check.array.of.emptyObject);
      assert.isFunction(check.array.of.instance);
      assert.isFunction(check.array.of.builtIn);
      assert.isFunction(check.array.of.userDefined);
      assert.isFunction(check.array.of.like);
      assert.isFunction(check.array.of.array);
      assert.isFunction(check.array.of.emptyArray);
      assert.isFunction(check.array.of.arrayLike);
      assert.isFunction(check.array.of.iterable);
      assert.isFunction(check.array.of.includes);
      assert.isFunction(check.array.of.hasLength);
      assert.isFunction(check.array.of.date);
      assert.isFunction(check.array.of.function);
    });

    test('array.of returns true when predicate is true for all items', function () {
      assert.isTrue(check.array.of.nonEmptyString([ 'foo', 'bar', 'baz' ]));
    });

    test('array.of returns false when predicate is false for one item', function () {
      assert.isFalse(check.array.of.positive([ 1, 0, 2 ]));
    });

    test('array.of returns true for multi-argument predicates', function () {
      assert.isTrue(check.array.of.between([ 1, 0, -1 ], 2, -2));
    });

    test('array.of returns false for multi-argument predicates', function () {
      assert.isFalse(check.array.of.greater([ 1, 2, 3 ], 4));
    });

    test('assert.array.of does not throw', function () {
      assert.doesNotThrow(function () {
        check.assert.array.of.instance([ new Error(), new Error() ], Error);
      });
    });

    test('assert.array.of throws', function () {
      assert.throws(function () {
        check.assert.array.of.instance([ new Error(), {} ], Error);
      });
    });

    test('maybe.array.of returns true with null array', function () {
      assert.isTrue(check.maybe.array.of.instance(null, Error));
    });

    test('maybe.array.of returns true with null values', function () {
      assert.isTrue(check.maybe.array.of.instance([ new Error(), null ], Error));
    });

    test('maybe.array.of returns false', function () {
      assert.isFalse(check.maybe.array.of.instance([ new Error(), {} ], Error));
    });

    test('not.array.of returns true', function () {
      assert.isTrue(check.not.array.of.instance([ new Error(), null ], Error));
    });

    test('not.array.of returns false', function () {
      assert.isFalse(check.not.array.of.instance([ new Error() ], Error));
    });

    test('assert.maybe.array.of does not throw with null array', function () {
      assert.doesNotThrow(function () {
        check.assert.maybe.array.of.instance(null, Error);
      });
    });

    test('assert.maybe.array.of does not throw with null values', function () {
      assert.doesNotThrow(function () {
        check.assert.maybe.array.of.instance([ new Error(), null ], Error);
      });
    });

    test('assert.maybe.array.of throws', function () {
      assert.throws(function () {
        check.assert.maybe.array.of.instance([ new Error(), {} ], Error);
      });
    });

    test('assert.not.array.of does not throw', function () {
      assert.doesNotThrow(function () {
        check.assert.not.array.of.instance([ {} ], Error);
      });
    });

    test('assert.not.array.of throws', function () {
      assert.throws(function () {
        check.assert.not.array.of.instance([ new Error(), new Error() ], Error);
      });
    });

    test('array.of returns false for array-like objects', function () {
      assert.isFalse(check.array.of.nonEmptyString({ 1: 'foo', 2: 'bar', length: 2 }));
    });

    if (typeof Set !== 'undefined') {
      test('array.of returns false for iterables', function () {
        assert.isFalse(check.array.of.nonEmptyString(new Set([ 'foo', 'bar' ])));
      });
    }

    test('array.of returns false for objects', function () {
      assert.isFalse(check.array.of.nonEmptyString({ 'foo': 'bar', 'baz': 'qux' }));
    });

    test('arrayLike.of modifier is defined', function () {
      assert.isObject(check.arrayLike.of);
    });

    test('arrayLike.of has predicates defined', function () {
      assert.lengthOf(Object.keys(check.arrayLike.of), 38);
    });

    test('arrayLike.of returns true when predicate is true for all items', function () {
      assert.isTrue(check.arrayLike.of.nonEmptyString({ 0: 'foo', 1: 'bar', length: 2 }));
    });

    test('arrayLike.of returns false when predicate is false for one item', function () {
      assert.isFalse(check.arrayLike.of.nonEmptyString({ 0: 'foo', 1: '', length: 2 }));
    });

    test('arrayLike.of returns true for multi-argument predicates', function () {
      assert.isTrue(check.arrayLike.of.between({ 0: 1, 1: 0, length: 2 }, 2, -1));
    });

    test('arrayLike.of returns false for multi-argument predicates', function () {
      assert.isFalse(check.arrayLike.of.greater({ 0: 1, 1: 2, length: 2 }, 2));
    });

    test('assert.arrayLike.of does not throw', function () {
      assert.doesNotThrow(function () {
        check.assert.arrayLike.of.instance({ 0: new Error(), 1: new Error(), length: 2 }, Error);
      });
    });

    test('assert.arrayLike.of throws', function () {
      assert.throws(function () {
        check.assert.arrayLike.of.instance({ 0: new Error(), 1: {}, length: 2 }, Error);
      });
    });

    test('maybe.arrayLike.of returns true with null array-like', function () {
      assert.isTrue(check.maybe.arrayLike.of.instance(null, Error));
    });

    test('maybe.arrayLike.of returns true with null values', function () {
      assert.isTrue(check.maybe.arrayLike.of.instance({ 0: new Error(), 1: null, length: 2 }, Error));
    });

    test('maybe.arrayLike.of returns false', function () {
      assert.isFalse(check.maybe.arrayLike.of.instance({ 0: new Error(), 1: {}, length: 2 }, Error));
    });

    test('not.arrayLike.of returns true', function () {
      assert.isTrue(check.not.arrayLike.of.instance({ 0: new Error(), 1: null, length: 2 }, Error));
    });

    test('not.arrayLike.of returns false', function () {
      assert.isFalse(check.not.arrayLike.of.instance({ 0: new Error(), length: 1 }, Error));
    });

    test('assert.maybe.arrayLike.of does not throw with null array-like', function () {
      assert.doesNotThrow(function () {
        check.assert.maybe.arrayLike.of.instance(null, Error);
      });
    });

    test('assert.maybe.arrayLike.of does not throw with null values', function () {
      assert.doesNotThrow(function () {
        check.assert.maybe.arrayLike.of.instance({ 0: new Error(), 1: null, length: 2 }, Error);
      });
    });

    test('assert.maybe.arrayLike.of throws', function () {
      assert.throws(function () {
        check.assert.maybe.arrayLike.of.instance({ 0: new Error(), 1: {}, length: 2 }, Error);
      });
    });

    test('assert.not.arrayLike.of does not throw', function () {
      assert.doesNotThrow(function () {
        check.assert.not.arrayLike.of.instance({ 0: {}, length: 1 }, Error);
      });
    });

    test('assert.not.arrayLike.of throws', function () {
      assert.throws(function () {
        check.assert.not.arrayLike.of.instance({ 0: new Error(), 1: new Error(), length: 2 }, Error);
      });
    });

    test('arrayLike.of returns true for arrays', function () {
      assert.isTrue(check.arrayLike.of.nonEmptyString([ 'foo', 'bar' ]));
    });

    if (typeof Set !== 'undefined') {
      test('arrayLike.of returns false for iterables', function () {
        assert.isFalse(check.arrayLike.of.nonEmptyString(new Set([ 'foo', 'bar' ])));
      });
    }

    test('arrayLike.of returns false for objects', function () {
      assert.isFalse(check.arrayLike.of.nonEmptyString({ 'foo': 'bar', 'baz': 'qux' }));
    });

    test('iterable.of modifier is defined', function () {
      assert.isObject(check.iterable.of);
    });

    test('iterable.of has predicates defined', function () {
      assert.lengthOf(Object.keys(check.iterable.of), 38);
    });

    if (typeof Set !== 'undefined') {
      test('iterable.of returns true when predicate is true for all items', function () {
        assert.isTrue(check.iterable.of.nonEmptyString(new Set([ 'foo', 'bar' ])));
      });

      test('iterable.of returns false when predicate is false for one item', function () {
        assert.isFalse(check.iterable.of.nonEmptyString(new Set([ 'foo', '' ])));
      });

      test('iterable.of returns true for multi-argument predicates', function () {
        assert.isTrue(check.iterable.of.between(new Map([['foo', 1], ['bar', 0]]), 2, -1));
      });

      test('iterable.of returns false for multi-argument predicates', function () {
        assert.isFalse(check.iterable.of.less(new Map([['foo', 1], ['bar', 2]]), 2));
      });

      test('assert.iterable.of does not throw', function () {
        assert.doesNotThrow(function () {
          check.assert.iterable.of.instance(new Set([ new Error(), new Error() ]), Error);
        });
      });

      test('assert.iterable.of throws', function () {
        assert.throws(function () {
          check.assert.iterable.of.instance(new Set([ new Error(), {} ]), Error);
        });
      });

      test('maybe.iterable.of returns true with null iterable', function () {
        assert.isTrue(check.maybe.iterable.of.instance(null, Error));
      });

      test('maybe.iterable.of returns true with null values', function () {
        assert.isTrue(check.maybe.iterable.of.instance(new Set([ new Error(), null ]), Error));
      });

      test('maybe.iterable.of returns false', function () {
        assert.isFalse(check.maybe.iterable.of.instance(new Set([ new Error(), {} ]), Error));
      });

      test('not.iterable.of returns true', function () {
        assert.isTrue(check.not.iterable.of.instance(new Set([ new Error(), null ]), Error));
      });

      test('not.iterable.of returns false', function () {
        assert.isFalse(check.not.iterable.of.instance(new Set([ new Error() ]), Error));
      });

      test('assert.maybe.iterable.of does not throw with null iterable', function () {
        assert.doesNotThrow(function () {
          check.assert.maybe.iterable.of.instance(null, Error);
        });
      });

      test('assert.maybe.iterable.of does not throw with null values', function () {
        assert.doesNotThrow(function () {
          check.assert.maybe.iterable.of.instance(new Set([ new Error(), null ]), Error);
        });
      });

      test('assert.maybe.iterable.of throws', function () {
        assert.throws(function () {
          check.assert.maybe.iterable.of.instance(new Set([ new Error(), {} ]), Error);
        });
      });

      test('assert.not.iterable.of does not throw', function () {
        assert.doesNotThrow(function () {
          check.assert.not.iterable.of.instance(new Set([ new Error(), {} ]), Error);
        });
      });

      test('assert.not.iterable.of throws', function () {
        assert.throws(function () {
          check.assert.not.iterable.of.instance(new Set([ new Error(), new Error() ]), Error);
        });
      });

      test('iterable.of returns true for arrays', function () {
        assert.isTrue(check.iterable.of.nonEmptyString([ 'foo', 'bar' ]));
      });

      test('iterable.of returns false for array-like objects', function () {
        assert.isFalse(check.iterable.of.nonEmptyString({ 0: 'foo', 1: 'bar', length: 2 }));
      });

      test('iterable.of returns false for objects', function () {
        assert.isFalse(check.iterable.of.nonEmptyString({ 'foo': 'bar', 'baz': 'qux' }));
      });
    }

    test('object.of modifier is defined', function () {
      assert.isObject(check.object.of);
    });

    test('object.of has predicates defined', function () {
      assert.lengthOf(Object.keys(check.object.of), 38);
    });

    test('object.of returns true when predicate is true for all items', function () {
      assert.isTrue(check.object.of.nonEmptyString({ 'foo': 'bar', 'baz': 'qux' }));
    });

    test('object.of returns false when predicate is false for one item', function () {
      assert.isFalse(check.object.of.nonEmptyString({ 'foo': 'bar', 'baz': '' }));
    });

    test('object.of returns true for multi-argument predicates', function () {
      assert.isTrue(check.object.of.between({ 'foo': 1, 'bar': 0 }, 2, -1));
    });

    test('object.of returns false for multi-argument predicates', function () {
      assert.isFalse(check.object.of.greater({ 'foo': 1, 'bar': 2 }, 2));
    });

    test('assert.object.of does not throw', function () {
      assert.doesNotThrow(function () {
        check.assert.object.of.instance({ 'foo': new Error(), 'bar': new Error() }, Error);
      });
    });

    test('assert.object.of throws', function () {
      assert.throws(function () {
        check.assert.object.of.instance({ 'foo': new Error(), 'bar': {} }, Error);
      });
    });

    test('maybe.object.of returns true with null object', function () {
      assert.isTrue(check.maybe.object.of.instance(null, Error));
    });

    test('maybe.object.of returns true with null values', function () {
      assert.isTrue(check.maybe.object.of.instance({ 'foo': new Error(), 'bar': null }, Error));
    });

    test('maybe.object.of returns false', function () {
      assert.isFalse(check.maybe.object.of.instance({ 'foo': new Error(), 'bar': {} }, Error));
    });

    test('not.object.of returns true', function () {
      assert.isTrue(check.not.object.of.instance({ 'foo': new Error(), 'bar': null }, Error));
    });

    test('not.object.of returns false', function () {
      assert.isFalse(check.not.object.of.instance({ 'foo': new Error() }, Error));
    });

    test('assert.maybe.object.of does not throw with null object', function () {
      assert.doesNotThrow(function () {
        check.assert.maybe.object.of.instance(null, Error);
      });
    });

    test('assert.maybe.object.of does not throw with null values', function () {
      assert.doesNotThrow(function () {
        check.assert.maybe.object.of.instance({ 'foo': new Error(), 'bar': null }, Error);
      });
    });

    test('assert.maybe.object.of throws', function () {
      assert.throws(function () {
        check.assert.maybe.object.of.instance({ 'foo': new Error(), 'bar': {} }, Error);
      });
    });

    test('assert.not.object.of does not throw', function () {
      assert.doesNotThrow(function () {
        check.assert.not.object.of.instance({ 'foo': {} }, Error);
      });
    });

    test('assert.not.object.of throws', function () {
      assert.throws(function () {
        check.assert.not.object.of.instance({ 'foo': new Error(), 'bar': new Error() }, Error);
      });
    });

    test('object.of returns false for arrays', function () {
      assert.isFalse(check.object.of.nonEmptyString([ 'foo', 'bar' ]));
    });

    test('object.of returns false for array-likes', function () {
      assert.isFalse(check.object.of.nonEmptyString({ 0: 'foo', 1: 'bar', length: 2 }));
    });

    if (typeof Set !== 'undefined') {
      test('object.of returns false for iterables', function () {
        assert.isFalse(check.object.of.nonEmptyString(new Set([ 'foo', 'bar' ])));
      });
    }
  });
}(typeof require === 'function' ? require : undefined));

