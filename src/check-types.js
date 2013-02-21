/**
 * This module exports functions for checking types
 * and throwing exceptions.
 */

/*globals window, module */

(function () {
    'use strict';

    var functions = {
        verifyQuack: verifyQuack,
        quacksLike: quacksLike,
        verifyInstance: verifyInstance,
        isInstance: isInstance,
        verifyObject: verifyObject,
        isObject: isObject,
        isEmptyObject: isEmptyObject,
        verifyLength: verifyLength,
        isLength: isLength,
        verifyArray: verifyArray,
        isArray: isArray,
        verifyFunction: verifyFunction,
        isFunction: isFunction,
        verifyUnemptyString: verifyUnemptyString,
        isUnemptyString:isUnemptyString,
        verifyString: verifyString,
        isString: isString,
        verifyPositiveNumber: verifyPositiveNumber,
        isPositiveNumber: isPositiveNumber,
        verifyNegativeNumber: verifyNegativeNumber,
        isNegativeNumber: isNegativeNumber,
        verifyNumber: verifyNumber,
        isNumber: isNumber
    };

    if (typeof module === 'undefined' || module === null) {
        window.check = functions;
    } else {
        module.exports = functions;
    }

    /**
     * Public function `verifyQuack`.
     *
     * Throws an exception if an object does not share
     * the properties of a second, archetypal object
     * (i.e. doesn't 'quack like a duck').
     *
     * @param thing {object}     The object to test.
     * @param duck {object}      The archetypal object,
     *                           or 'duck', that the test
     *                           is against.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyQuack (thing, duck, message) {
        if (quacksLike(thing, duck) === false) {
            throw new Error(message || 'Invalid type');
        }
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

        verifyObject(thing);
        verifyObject(duck);

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
     * Public function `verifyInstance`.
     *
     * Throws an exception if an object is not an instance
     * of a prototype.
     *
     * @param thing {object}       The object to test.
     * @param prototype {function} The prototype that the
     *                             test is against.
     * @param [message] {string}   An optional error message
     *                             to set on the thrown Error.
     */
    function verifyInstance (thing, prototype, message) {
        if (isInstance(thing, prototype) === false) {
            throw new Error(message || 'Invalid type');
        }
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
     * Public function `verifyObject`.
     *
     * Throws an exception unless something is a non-null,
     * non-array object.
     *
     * @param thing              The thing to test.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyObject (thing, message) {
        if (isObject(thing) === false) {
            throw new Error(message || 'Invalid object');
        }
    }

    /**
     * Public function `isObject`.
     *
     * Returns `true` if something is a non-null, non-array
     * object, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isObject (thing) {
        return typeof thing === 'object' && thing !== null && isArray(thing) === false;
    }

    /**
     * Public function `isEmptyObject`.
     *
     * Returns `true` if something is an object and is {}, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isEmptyObject (thing) {
        return functions.isObject (thing) === true && Object.keys(thing).length === 0;
    }

    /**
     * Public function `verifyLength`.
     *
     * Throws an exception unless something is a non-null,
     * non-array object.
     *
     * @param thing              The thing to test.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyLength (thing, length, message) {
        if (isLength(thing, length) === false) {
            throw new Error(message || 'Invalid length');
        }
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
     * Public function `verifyArray`.
     *
     * Throws an exception unless something is an array.
     *
     * @param thing              The thing to test.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyArray (thing, message) {
        if (isArray(thing) === false) {
            throw new Error(message || 'Invalid array');
        }
    }

    /**
     * Public function `isArray`.
     *
     * Returns `true` something is an array, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isArray (thing) {
        return Object.prototype.toString.call(thing) === '[object Array]';
    }

    /**
     * Public function `verifyFunction`.
     *
     * Throws an exception unless something is function.
     *
     * @param thing              The thing to test.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyFunction (thing, message) {
        if (isFunction(thing) === false) {
            throw new Error(message || 'Invalid function');
        }
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
     * Public function `verifyUnemptyString`.
     *
     * Throws an exception unless something is a non-empty string.
     *
     * @param thing              The thing to test.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyUnemptyString (thing, message) {
        if (isUnemptyString(thing) === false) {
            throw new Error(message || 'Invalid string');
        }
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
     * Public function `verifyString`.
     *
     * Throws an exception unless something is a string.
     *
     * @param thing              The thing to test.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyString (thing, message) {
        if (isString(thing) === false) {
            throw new Error(message || 'Invalid string');
        }
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
     * Public function `verifyPositiveNumber`.
     *
     * Throws an exception unless something is a positive number.
     *
     * @param thing              The thing to test.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyPositiveNumber (thing, message) {
        if (isPositiveNumber(thing) === false) {
            throw new Error(message || 'Invalid number');
        }
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
     * Public function `verifyNegativeNumber`.
     *
     * Throws an exception unless something is a positive number.
     *
     * @param thing              The thing to test.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyNegativeNumber (thing, message) {
        if (isNegativeNumber(thing) === false) {
            throw new Error(message || 'Invalid number');
        }
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
     * Public function `verifyNumber`.
     *
     * Throws an exception unless something is a number, excluding NaN.
     *
     * @param thing              The thing to test.
     * @param [message] {string} An optional error message
     *                           to set on the thrown Error.
     */
    function verifyNumber (thing, message) {
        if (isNumber(thing) === false) {
            throw new Error(message || 'Invalid number');
        }
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
}());

