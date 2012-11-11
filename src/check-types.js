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
        verifyArray: verifyArray,
        isArray: isArray,
        verifyFunction: verifyFunction,
        isFunction: isFunction,
        verifyUnemptyString: verifyUnemptyString,
        isUnemptyString:isUnemptyString,
        verifyString: verifyString,
        isString: isString,
        verifyNumber: verifyNumber,
        isNumber: isNumber
    };

    if (module && module.exports) {
        module.exports = functions;
    } else {
        window.check = functions;
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
        if (typeof thing === 'object' && thing !== null && isArray(thing) === false) {
            return true;
        }

        return false;
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
        if (Object.prototype.toString.call(thing) === '[object Array]') {
            return true;
        }

        return false;
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
        if (typeof thing === 'function') {
            return true;
        }

        return false;
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
        if (isString(thing) && thing !== '') {
            return true;
        }

        return false;
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
        if (typeof thing === 'string') {
            return true;
        }

        return false;
    }

    /**
     * Public function `verifyNumber`.
     *
     * Throws an exception unless something is a number (also excluding NaN).
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
     * Returns `true` if something a number other than NaN, `false` otherwise.
     *
     * @param thing          The thing to test.
     */
    function isNumber (thing) {
        if (isNaN(thing) === true) {
            return false;
        }

        if (typeof thing === 'number') {
            return true;
        }

        return false;
    }
}());

