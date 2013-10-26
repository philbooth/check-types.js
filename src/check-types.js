/**
 * This module exports functions for checking types
 * and throwing exceptions.
 */

/*globals define, module */

(function (globals) {
    'use strict';

    var messages, predicates, verifies, functions;

    // Predicate functions
    predicates = {
        quacksLike: quacksLike,
        isInstance: isInstance,
        isEmptyObject: isEmptyObject,
        isObject: isObject,
        isLength: isLength,
        isArray: isArray,
        isDate: isDate,
        isFunction: isFunction,
        isWebUrl: isWebUrl,
        isUnemptyString: isUnemptyString,
        isString: isString,
        isEvenNumber: isEvenNumber,
        isOddNumber: isOddNumber,
        isPositiveNumber: isPositiveNumber,
        isNegativeNumber: isNegativeNumber,
        isNumber: isNumber
    };

    // Default messages when an Error is thrown for a failed predicate.
    messages = {
        quacksLike: 'Invalid type',
        isInstance: 'Invalid type',
        isEmptyObject: 'Invalid object',
        isObject: 'Invalid object',
        isLength: 'Invalid length',
        isArray: 'Invalid array',
        isDate: 'Invalid date',
        isFunction: 'Invalid function',
        isWebUrl: 'Invalid web Url',
        isUnemptyString: 'Invalid String',
        isString: 'Invalid String',
        isEvenNumber: 'Invalid Number',
        isOddNumber: 'Invalid Number',
        isPositiveNumber: 'Invalid Number',
        isNegativeNumber: 'Invalid Number',
        isNumber: 'Invalid Number'
    };

    // Thrower versions of predicate functions
    verifies = {
        verifyQuack: verify(quacksLike, messages.quacksLike),
        verifyInstance: verify(isInstance, messages.isInstance),
        verifyEmptyObject: verify(isEmptyObject, messages.isEmptyObject),
        verifyObject: verify(isObject, messages.isObject),
        verifyLength: verify(isLength, messages.isLength),
        verifyArray: verify(isArray, messages.isArray),
        verifyDate: verify(isDate, messages.isDate),
        verifyFunction: verify(isFunction, messages.isFunction),
        verifyWebUrl: verify(isWebUrl, messages.isWebUrl),
        verifyUnemptyString: verify(isUnemptyString, messages.isUnemptyString),
        verifyString: verify(isString, messages.isString),
        verifyEvenNumber: verify(isEvenNumber, messages.isEvenNumber),
        verifyOddNumber: verify(isOddNumber, messages.isOddNumber),
        verifyPositiveNumber: verify(isPositiveNumber, messages.isPositiveNumber),
        verifyNegativeNumber: verify(isNegativeNumber, messages.isNegativeNumber),
        verifyNumber: verify(isNumber, messages.isNumber)
    };

    functions = {
        map: map,
        every: every,
        any: any
    };

    // Add predicates to exported functions
    functions = mixin(functions, predicates);

    // Add thrower functions for backwards compatibility
    functions = mixin(functions, verifies);

    // Add `check.verify.*` wrapped version of functions.
    functions = mixin(functions, { verify: verifyFunctions(predicates, messages) });

    // Add `check.maybe.*` wrapped version of functions.
    functions = mixin(functions, { maybe: maybeFunctions(functions) });

    // Add `check.maybe.verify.*` wrapped version of functions.
    functions.maybe = mixin(functions.maybe, { verify: maybeFunctions(functions.verify) });

    exportFunctions(functions);

    /**
     * Public function `quacksLike`.
     *
     * Tests whether an object 'quacks like a duck'.
     * Returns `true` if the first argument has all of
     * the properties of the second, archetypal argument
     * (the 'duck'). Returns `false` otherwise. If either
     * argument is not an object, an exception is thrown.
     *
     * @param thing {object} The object to test.
     * @param duck {object}  The archetypal object, or
     *                       'duck', that the test is
     *                       against.
     */
    function quacksLike (thing, duck) {
        var property, thingVal, duckVal;

        verify(isObject)(thing);
        verify(isObject)(duck);

        for (property in duck) {
            if (duck.hasOwnProperty(property)) {
                thingVal = thing[property];
                duckVal  = duck[property];
                if (!thing.hasOwnProperty(property)    ||
                    typeof thingVal !== typeof duckVal ||
                    (isObject(thingVal) && !quacksLike(thingVal, duckVal))) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Public function `isInstance`.
     *
     * Returns `true` if an object is an instance of a prototype,
     * `false` otherwise.
     *
     * @param thing {object}       The object to test.
     * @param prototype {function} The prototype that the
     *                             test is against.
     */
    function isInstance (thing, prototype) {
        if (typeof thing === 'undefined' || thing === null) {
            return false;
        }

        if (isFunction(prototype) && thing instanceof prototype) {
            return true;
        }

        return false;
    }

    /**
     * Public function `isEmptyObject`.
     *
     * Returns `true` if something is an empty, non-null, non-array object, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isEmptyObject (thing) {
        var property;

        if (isObject(thing)) {
            for (property in thing) {
                if (thing.hasOwnProperty(property)) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    /**
     * Public function `isObject`.
     *
     * Returns `true` if something is a non-null, non-array,
     * non-date object, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isObject (thing) {
        return typeof thing === 'object' && thing !== null && isArray(thing) === false && isDate(thing) === false;
    }

    /**
     * Public function `isLength`.
     *
     * Returns `true` if something is has a length property
     * matching the specified value, `false` otherwise.
     *
     * @param thing  The thing to test.
     * @param length The required length to test against.
     */
    function isLength (thing, length) {
        return thing && thing.length === length;
    }

    /**
     * Public function `isArray`.
     *
     * Returns `true` something is an array, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isArray (thing) {
        if (Array.isArray) {
            return Array.isArray(thing);
        }

        return Object.prototype.toString.call(thing) === '[object Array]';
    }

    /**
     * Public function `isDate`.
     *
     * Returns `true` something is a date, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isDate (thing) {
        return Object.prototype.toString.call(thing) === '[object Date]';
    }

    /**
     * Public function `isFunction`.
     *
     * Returns `true` if something is function, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isFunction (thing) {
        return typeof thing === 'function';
    }

    /**
     * Public function `isWebUrl`.
     *
     * Returns `true` if something is an HTTP or HTTPS URL,
     * `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isWebUrl (thing) {
        return isUnemptyString(thing) && /^https?:\/\/.+/.test(thing);
    }

    /**
     * Public function `isUnemptyString`.
     *
     * Returns `true` if something is a non-empty string, `false`
     * otherwise.
     *
     * @param thing          The thing to test.
     */
    function isUnemptyString (thing) {
        return isString(thing) && thing !== '';
    }

    /**
     * Public function `isString`.
     *
     * Returns `true` if something is a string, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isString (thing) {
        return typeof thing === 'string';
    }

    /**
     * Public function `isOddNumber`.
     *
     * Returns `true` if something is an odd number,
     * `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isOddNumber (thing) {
        return isNumber(thing) && (thing % 2 === 1 || thing % 2 === -1);
    }

    /**
     * Public function `isEvenNumber`.
     *
     * Returns `true` if something is an even number,
     * `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isEvenNumber (thing) {
        return isNumber(thing) && thing % 2 === 0;
    }

    /**
     * Public function `isPositiveNumber`.
     *
     * Returns `true` if something is a positive number,
     * `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isPositiveNumber (thing) {
        return isNumber(thing) && thing > 0;
    }

    /**
     * Public function `isNegativeNumber`.
     *
     * Returns `true` if something is a positive number,
     * `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isNegativeNumber (thing) {
        return isNumber(thing) && thing < 0;
    }

    /**
     * Public function `isNumber`.
     *
     * Returns `true` if something is a number other than NaN,
     * `false` otherwise.
     *
     * @param thing The thing to test.
     */
    function isNumber (thing) {
        return typeof thing === 'number' && isNaN(thing) === false;
    }

    /**
     * Public function `map`.
     *
     * Returns the results hash of mapping each predicate to the
     * corresponding thing's property. Similar to `quacksLike` but
     * with functions instead of values.
     *
     * @param things {object}     The things to test.
     * @param predicates {object} The map of functions to call against
     *                            the corresponding properties from `things`.
     */
    function map (things, predicates) {
        var property, result = {}, predicate;
        verify(isObject)(things);
        verify(isObject)(predicates);

        for (property in predicates) {
            if (predicates.hasOwnProperty(property)) {
                predicate = predicates[property];
                if (isFunction(predicate)) {
                    result[property] = things.hasOwnProperty(property) ?
                        predicate(things[property]) :
                        undefined;
                } else if (isObject(predicate)) {
                    result[property] = things.hasOwnProperty(property) ?
                        map(things[property], predicate) :
                        undefined;
                }
            }
        }

        return result;
    }

    /**
     * Public function `every`
     *
     * Returns the conjunction of all booleans in a hash.
     *
     * @param predicateResults {object} The hash of evaluated predicates.
     */
    function every (predicateResults) {
        var property, value;
        verify(isObject)(predicateResults);

        for (property in predicateResults) {
            if (predicateResults.hasOwnProperty(property)) {
                value = predicateResults[property];
                if (isObject(value) && !every(value)) {
                    return false;
                } else if (!value) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Public function `any`
     *
     * Returns the disjunction of all booleans in a hash.
     *
     * @param predicateResults {object} The hash of evaluated predicates.
     */
    function any (predicateResults) {
        var property, value;
        verify(isObject)(predicateResults);

        for (property in predicateResults) {
            if (predicateResults.hasOwnProperty(property)) {
                value = predicateResults[property];
                if (isObject(value) && any(value)) {
                    return true;
                } else if (value === true) {
                    return true;
                }
            }
        }
        return false;
    }

    function maybeFunctions (predicates) {
        var property, fn, functions;
        functions = {};
        for (property in predicates) {
            if (predicates.hasOwnProperty(property)) {
                fn = predicates[property];
                functions[property] = maybe(fn);
            }
        }
        return functions;
    }

    function mixin (target, source) {
        var property;
        for (property in source) {
            if (source.hasOwnProperty(property)) {
                target[property] = source[property];
            }
        }
        return target;
    }

    function verify (fn, defaultMessage) {
        return function() {
            var message = arguments[arguments.length-1];
            message = isString(message) ? message : null;
            if (!fn.apply(null, arguments)) {
                throw new Error(message || defaultMessage);
            }
        };
    }

    function maybe (predicate) {
        return function() {
            return arguments[0] === null || arguments[0] === undefined ?
                true :
                predicate.apply(null, arguments);
        };
    }

    function verifyFunctions (predicates, messages) {
        var property, functions, fn, message;
        functions = {};
        for (property in predicates) {
            if (predicates.hasOwnProperty(property)) {
                fn = predicates[property];
                message = messages[property];
                functions[property] = verify(fn, message);
            }
        }
        return functions;
    }


    function exportFunctions (functions) {
        if (typeof define === 'function' && define.amd) {
            define(function () {
                return functions;
            });
        } else if (typeof module !== 'undefined' && module !== null) {
            module.exports = functions;
        } else {
            globals.check = functions;
        }
    }
}(this));
