/**
 * This module exports functions for checking types
 * and throwing exceptions.
 */

/*globals define, module */

(function (globals) {
    'use strict';

    var messages, predicates, functions, assert, not, maybe, either;

    messages = {
        like: 'Invalid type',
        instance: 'Invalid type',
        emptyObject: 'Invalid object',
        object: 'Invalid object',
        assigned: 'Invalid value',
        undefined: 'Invalid value',
        null: 'Invalid value',
        hasLength: 'Invalid length',
        emptyArray: 'Invalid array',
        array: 'Invalid array',
        date: 'Invalid date',
        error: 'Invalid error',
        fn: 'Invalid function',
        match: 'Invalid string',
        contains: 'Invalid string',
        unemptyString: 'Invalid string',
        string: 'Invalid string',
        odd: 'Invalid number',
        even: 'Invalid number',
        between: 'Invalid number',
        greater: 'Invalid number',
        less: 'Invalid number',
        positive: 'Invalid number',
        negative: 'Invalid number',
        integer: 'Invalid number',
        zero: 'Invalid number',
        number: 'Invalid number',
        boolean: 'Invalid boolean'
    };

    predicates = {
        like: like,
        instance: instance,
        emptyObject: emptyObject,
        object: object,
        assigned: assigned,
        undefined: isUndefined,
        null: isNull,
        hasLength: hasLength,
        emptyArray: emptyArray,
        array: array,
        date: date,
        error: error,
        function: isFunction,
        match: match,
        contains: contains,
        unemptyString: unemptyString,
        string: string,
        odd: odd,
        even: even,
        between: between,
        greater: greater,
        less: less,
        positive: positive,
        negative: negative,
        integer : integer,
        zero: zero,
        number: number,
        boolean: boolean
    };

    functions = {
        apply: apply,
        map: map,
        all: all,
        any: any
    };

    functions = mixin(functions, predicates);
    assert = createModifiedPredicates(assertModifier, assertImpl);
    not = createModifiedPredicates(notModifier, notImpl);
    maybe = createModifiedPredicates(maybeModifier, maybeImpl);
    either = createModifiedPredicates(eitherModifier);
    assert.not = createModifiedFunctions(assertModifier, not);
    assert.maybe = createModifiedFunctions(assertModifier, maybe);
    assert.either = createModifiedFunctions(assertEitherModifier, predicates);

    exportFunctions(mixin(functions, {
        assert: assert,
        not: not,
        maybe: maybe,
        either: either
    }));

    /**
     * Public function `like`.
     *
     * Tests whether an object 'quacks like a duck'.
     * Returns `true` if the first argument has all of
     * the properties of the second, archetypal argument
     * (the 'duck'). Returns `false` otherwise.
     *
     */
    function like (data, duck) {
        var name;

        for (name in duck) {
            if (duck.hasOwnProperty(name)) {
                if (data.hasOwnProperty(name) === false || typeof data[name] !== typeof duck[name]) {
                    return false;
                }

                if (object(data[name]) && like(data[name], duck[name]) === false) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Public function `instance`.
     *
     * Returns `true` if an object is an instance of a prototype,
     * `false` otherwise.
     *
     */
    function instance (data, prototype) {
        if (data && isFunction(prototype) && data instanceof prototype) {
            return true;
        }

        return false;
    }

    /**
     * Public function `emptyObject`.
     *
     * Returns `true` if something is an empty object,
     * `false` otherwise.
     *
     */
    function emptyObject (data) {
        return object(data) && Object.keys(data).length === 0;
    }

    /**
     * Public function `object`.
     *
     * Returns `true` if something is a plain-old JS object,
     * `false` otherwise.
     *
     */
    function object (data) {
        return Object.prototype.toString.call(data) === '[object Object]';
    }

    /**
     * Public function `assigned`.
     *
     * Returns `true` if something is not null or undefined,
     * `false` otherwise.
     *
     */
    function assigned (data) {
        return !isUndefined(data) && !isNull(data);
    }

    /**
     * Public function `undefined`.
     *
     * Returns `true` if something is undefined,
     * `false` otherwise.
     *
     */
    function isUndefined (data) {
        return data === undefined;
    }

    /**
     * Public function `null`.
     *
     * Returns `true` if something is null,
     * `false` otherwise.
     *
     */
    function isNull (data) {
        return data === null;
    }

    /**
     * Public function `hasLength`.
     *
     * Returns `true` if something is has a length property
     * that equals `value`, `false` otherwise.
     *
     */
    function hasLength (data, value) {
        return assigned(data) && data.length === value;
    }

    /**
     * Public function `emptyArray`.
     *
     * Returns `true` if something is an empty array,
     * `false` otherwise.
     *
     */
    function emptyArray (data) {
        return array(data) && data.length === 0;
    }

    /**
     * Public function `array`.
     *
     * Returns `true` something is an array,
     * `false` otherwise.
     *
     */
    function array (data) {
        return Array.isArray(data);
    }

    /**
     * Public function `date`.
     *
     * Returns `true` something is a valid date,
     * `false` otherwise.
     *
     */
    function date (data) {
        return Object.prototype.toString.call(data) === '[object Date]' &&
            !isNaN(data.getTime());
    }

    /**
     * Public function `error`.
     *
     * Returns `true` if something is a plain-old JS object,
     * `false` otherwise.
     *
     */
    function error (data) {
        return Object.prototype.toString.call(data) === '[object Error]';
    }

    /**
     * Public function `function`.
     *
     * Returns `true` if something is function,
     * `false` otherwise.
     *
     */
    function isFunction (data) {
        return typeof data === 'function';
    }

    /**
     * Public function `match`.
     *
     * Returns `true` if something is a string
     * that matches `regex`, `false` otherwise.
     *
     */
    function match (data, regex) {
        return string(data) && !!data.match(regex);
    }

    /**
     * Public function `contains`.
     *
     * Returns `true` if something is a string
     * that contains `substring`, `false` otherwise.
     *
     */
    function contains (data, substring) {
        return string(data) && data.indexOf(substring) !== -1;
    }

    /**
     * Public function `unemptyString`.
     *
     * Returns `true` if something is a non-empty string,
     * `false` otherwise.
     *
     */
    function unemptyString (data) {
        return string(data) && data !== '';
    }

    /**
     * Public function `string`.
     *
     * Returns `true` if something is a string, `false` otherwise.
     *
     */
    function string (data) {
        return typeof data === 'string';
    }

    /**
     * Public function `odd`.
     *
     * Returns `true` if something is an odd number,
     * `false` otherwise.
     *
     */
    function odd (data) {
        return integer(data) && !even(data);
    }

    /**
     * Public function `even`.
     *
     * Returns `true` if something is an even number,
     * `false` otherwise.
     *
     */
    function even (data) {
        return number(data) && data % 2 === 0;
    }

    /**
     * Public function `integer`.
     *
     * Returns `true` if something is an integer,
     * `false` otherwise.
     *
     */
    function integer (data) {
        return number(data) && data % 1 === 0;
    }

    /**
     * Public function `between`.
     *
     * Returns `true` if something is a number
     * between `a` and `b`, `false` otherwise.
     *
     */
    function between (data, a, b) {
        if (a < b) {
            return greater(data, a) && less(data, b);
        }

        return less(data, a) && greater(data, b);
    }

    /**
     * Public function `greater`.
     *
     * Returns `true` if something is a number
     * greater than `value`, `false` otherwise.
     *
     */
    function greater (data, value) {
        return number(data) && data > value;
    }

    /**
     * Public function `less`.
     *
     * Returns `true` if something is a number
     * less than `value`, `false` otherwise.
     *
     */
    function less (data, value) {
        return number(data) && data < value;
    }

    /**
     * Public function `positive`.
     *
     * Returns `true` if something is a positive number,
     * `false` otherwise.
     *
     */
    function positive (data) {
        return greater(data, 0);
    }

    /**
     * Public function `negative`.
     *
     * Returns `true` if something is a negative number,
     * `false` otherwise.
     *
     * @param data          The thing to test.
     */
    function negative (data) {
        return less(data, 0);
    }

    /**
     * Public function `number`.
     *
     * Returns `true` if data is a number,
     * `false` otherwise.
     *
     */
    function number (data) {
        return typeof data === 'number' && isNaN(data) === false &&
               data !== Number.POSITIVE_INFINITY &&
               data !== Number.NEGATIVE_INFINITY;
    }

    /**
     * Public function `zero`.
     *
     * Returns `true` if something is zero,
     * `false` otherwise.
     *
     * @param data          The thing to test.
     */
    function zero (data) {
        return data === 0;
    }

    /**
     * Public function `boolean`.
     *
     * Returns `true` if data is a boolean value,
     * `false` otherwise.
     *
     */
    function boolean (data) {
        return data === false || data === true;
    }

    /**
     * Public function `apply`.
     *
     * Maps each value from the data to the corresponding predicate and returns
     * the result array. If the same function is to be applied across all of the
     * data, a single predicate function may be passed in.
     *
     */
    function apply (data, predicates) {
        assert.array(data);

        if (isFunction(predicates)) {
            return data.map(function (value) {
                return predicates(value);
            });
        }

        assert.array(predicates);
        assert.hasLength(data, predicates.length);

        return data.map(function (value, index) {
            return predicates[index](value);
        });
    }

    /**
     * Public function `map`.
     *
     * Maps each value from the data to the corresponding predicate and returns
     * the result object. Supports nested objects. If the data is not nested and
     * the same function is to be applied across all of it, a single predicate
     * function may be passed in.
     *
     */
    function map (data, predicates) {
        assert.object(data);

        if (isFunction(predicates)) {
            return mapSimple(data, predicates);
        }

        assert.object(predicates);

        return mapComplex(data, predicates);
    }

    function mapSimple (data, predicate) {
        var result = {};

        Object.keys(data).forEach(function (key) {
            result[key] = predicate(data[key]);
        });

        return result;
    }

    function mapComplex (data, predicates) {
        var result = {};

        Object.keys(predicates).forEach(function (key) {
            var predicate = predicates[key];

            if (isFunction(predicate)) {
                result[key] = predicate(data[key]);
            } else if (object(predicate)) {
                result[key] = mapComplex(data[key], predicate);
            }
        });

        return result;
    }

    /**
     * Public function `all`
     *
     * Check that all boolean values are true
     * in an array (returned from `apply`)
     * or object (returned from `map`).
     *
     */
    function all (data) {
        if (array(data)) {
            return testArray(data, false);
        }

        assert.object(data);

        return testObject(data, false);
    }

    function testArray (data, result) {
        var i;

        for (i = 0; i < data.length; i += 1) {
            if (data[i] === result) {
                return result;
            }
        }

        return !result;
    }

    function testObject (data, result) {
        var key, value;

        for (key in data) {
            if (data.hasOwnProperty(key)) {
                value = data[key];

                if (object(value) && testObject(value, result) === result) {
                    return result;
                }

                if (value === result) {
                    return result;
                }
            }
        }

        return !result;
    }

    /**
     * Public function `any`
     *
     * Check that at least one boolean value is true
     * in an array (returned from `apply`)
     * or object (returned from `map`).
     *
     */
    function any (data) {
        if (array(data)) {
            return testArray(data, true);
        }

        assert.object(data);

        return testObject(data, true);
    }

    function mixin (target, source) {
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });

        return target;
    }

    /**
     * Public modifier `assert`.
     *
     * Throws if `predicate` returns `false`.
     */
    function assertModifier (predicate, defaultMessage) {
        return function () {
            assertPredicate(predicate, arguments, defaultMessage);
        };
    }

    function assertPredicate (predicate, args, defaultMessage) {
        var message = args[args.length - 1];
        assertImpl(predicate.apply(null, args), unemptyString(message) ? message : defaultMessage);
    }

    function assertImpl (value, message) {
        if (value === false) {
            throw new Error(message || 'Assertion failed');
        }
    }

    function assertEitherModifier (predicate, defaultMessage) {
        return function () {
            var error;

            try {
                assertPredicate(predicate, arguments, defaultMessage);
            } catch (e) {
                error = e;
            }

            return {
                or: Object.keys(predicates).reduce(delayedAssert, {})
            };

            function delayedAssert (result, key) {
                result[key] = function () {
                    if (error && !predicates[key].apply(null, arguments)) {
                        throw error;
                    }
                };

                return result;
            }
        };
    }

    /**
     * Public modifier `not`.
     *
     * Negates `predicate`.
     */
    function notModifier (predicate) {
        return function () {
            return notImpl(predicate.apply(null, arguments));
        };
    }

    function notImpl (value) {
        return !value;
    }

    /**
     * Public modifier `maybe`.
     *
     * Returns `true` if predicate argument is  `null` or `undefined`,
     * otherwise propagates the return value from `predicate`.
     */
    function maybeModifier (predicate) {
        return function () {
            if (!assigned(arguments[0])) {
                return true;
            }

            return predicate.apply(null, arguments);
        };
    }

    function maybeImpl (value) {
        if (assigned(value) === false) {
            return true;
        }

        return value;
    }

    /**
     * Public modifier `either`.
     *
     * Returns `true` if either predicate is true.
     */
    function eitherModifier (predicate) {
        return function () {
            var shortcut = predicate.apply(null, arguments);

            return {
                or: Object.keys(predicates).reduce(nopOrPredicate, {})
            };

            function nopOrPredicate (result, key) {
                result[key] = shortcut ? nop : predicates[key];
                return result;
            }
        };

        function nop () {
            return true;
        }
    }

    function createModifiedPredicates (modifier, object) {
        return createModifiedFunctions(modifier, predicates, object);
    }

    function createModifiedFunctions (modifier, functions, object) {
        var result = object || {};

        Object.keys(functions).forEach(function (key) {
            Object.defineProperty(result, key, {
                configurable: false,
                enumerable: true,
                writable: false,
                value: modifier(functions[key], messages[key])
            });
        });

        return result;
    }

    function exportFunctions (functions) {
        if (typeof define === 'function' && define.amd) {
            define(function () {
                return functions;
            });
        } else if (typeof module !== 'undefined' && module !== null && module.exports) {
            module.exports = functions;
        } else {
            globals.check = functions;
        }
    }
}(this));
