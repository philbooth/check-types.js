/**
 * This module exports functions for checking types
 * and throwing exceptions.
 */

/*globals define, module */

(function (globals) {
    'use strict';

    // Default messages when an Error is thrown for a failed predicate.
    var defaultMessages = {
        quacksLike: 'Invalid type',
        isInstance: 'Invalid type',
        isEmptyObject: 'Invalid object',
        isObject: 'Invalid lbject',
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

    // Predicate functions
    var predicates = {
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

    // Hash of exported functions
    var functions = {
        verifyQuack: verify(quacksLike, defaultMessages.quacksLike),
        quacksLike: quacksLike,
        verifyInstance: verify(isInstance, defaultMessages.isInstance),
        isInstance: isInstance,
        verifyEmptyObject: verify(isEmptyObject, defaultMessages.isEmptyObject),
        isEmptyObject: isEmptyObject,
        verifyObject: verify(isObject, defaultMessages.isObject),
        isObject: isObject,
        verifyLength: verify(isLength, defaultMessages.isLength),
        isLength: isLength,
        verifyArray: verify(isArray, defaultMessages.isArray),
        isArray: isArray,
        verifyDate: verify(isDate, defaultMessages.isDate),
        isDate: isDate,
        verifyFunction: verify(isFunction, defaultMessages.isFunction),
        isFunction: isFunction,
        verifyWebUrl: verify(isWebUrl, defaultMessages.isWebUrl),
        isWebUrl: isWebUrl,
        verifyUnemptyString: verify(isUnemptyString, defaultMessages.isUnemptyString),
        isUnemptyString:isUnemptyString,
        verifyString: verify(isString, defaultMessages.isString),
        isString: isString,
        verifyEvenNumber: verify(isEvenNumber, defaultMessages.isEvenNumber),
        isEvenNumber: isEvenNumber,
        verifyOddNumber: verify(isOddNumber, defaultMessages.isOddNumber),
        isOddNumber: isOddNumber,
        verifyPositiveNumber: verify(isPositiveNumber, defaultMessages.isPositiveNumber),
        isPositiveNumber: isPositiveNumber,
        verifyNegativeNumber: verify(isNegativeNumber, defaultMessages.isNegativeNumber),
        isNegativeNumber: isNegativeNumber,
        verifyNumber: verify(isNumber, defaultMessages.isNumber),
        isNumber: isNumber,
        map: map,
        every: every,
        any: any
    };

    // Add `check.verify.*` wrapped version of functions.
    functions.verify = verifyFunctions(predicates, defaultMessages);

    // Add `check.maybe.*` wrapped version of functions.
    functions.maybe  = maybeFunctions(functions);

    // Add `check.maybe.verify.*` wrapped version of functions.
    functions.maybe.verify = maybeFunctions(functions.verify);

    exportFunctions(functions);

    function maybe (predicate) {
        return function() {
            return arguments[0] === null || arguments[0] === undefined ?
                true :
                predicate.apply(null, arguments);
        };
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
        var property;

        verify(isObject)(thing);
        verify(isObject)(duck);

        for (property in duck) {
            if (duck.hasOwnProperty(property)) {
                if (thing.hasOwnProperty(property) === false) {
                    return false;
                }

                if (typeof thing[property] !== typeof duck[property]) {
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

    function verifyFunctions (predicates, defaultMessages) {
        var property, verifiedPredicates, predicate, message;
        verifiedPredicates = {};
        for (property in predicates) {
            if (predicates.hasOwnProperty(property)) {
                predicate = predicates[property];
                message = defaultMessages[property];
                verifiedPredicates[property] = verify(predicate, message);
            }
        }
        return verifiedPredicates;
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
