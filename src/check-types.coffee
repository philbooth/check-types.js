'use strict'

##
# Public function `quacksLike`.
#
# Tests whether an object 'quacks like a duck'.
# Returns `true` if the first argument has all of
# the properties of the second, archetypal argument
# (the 'duck'). Returns `false` otherwise. If either
# argument is not an object, an exception is thrown.
#
# @param thing {object} The object to test.
# @param duck {object}  The archetypal object, or 'duck'
#                       that the test is against.
#
quacksLike = (thing, duck) ->
  verifyObject thing
  verifyObject duck
  for own property of duck
    if thing.hasOwnProperty(property) isnt true
      return false
    if typeof thing[property] isnt typeof duck[property]
      return false
  true

##
# Public function `verifyInstance`.
#
# Throws an exception if an object is not an instance
# of a prototype.
#
# @param thing {object}       The object to test.
# @param prototype {function} The prototype that the
#                             test is against.
# @param [message] {string}   An optional error message
#                             to set on the thrown Error.
#
verifyInstance = (thing, prototype, message) ->
  if isInstance(thing, prototype) is false
    throw new Error message || 'Invalid type'

##
# Public function `isInstance`.
#
# Returns `true` if an object is an instance of a prototype,
# `false` otherwise.
#
# @param thing {object}       The object to test.
# @param prototype {function} The prototype that the
#                             test is against.
#
isInstance = (thing, prototype) ->
  if typeof thing is 'undefined' or thing is null
    return false
  if isFunction(prototype) and thing instanceof prototype
    return true
  false

##
# Public function `verifyObject`.
#
# Throws an exception unless something is a non-null,
# non-array object.
#
# @param thing              The thing to test.
# @param [message] {string} An optional error message
#                           to set on the thrown Error.
#
verifyObject = (thing, message) ->
  if isObject(thing) is false
    throw new Error message || 'Invalid object'

##
# Public function `isObject`.
#
# Returns `true` if something is a non-null, non-array
# object, `false` otherwise.
#
# @param thing          The thing to test.
#
isObject = (thing) ->
  if typeof thing is 'object' and thing isnt null and isArray(thing) is false
    return true
  false

##
# Public function `verifyArray`.
#
# Throws an exception unless something is an array.
#
# @param thing              The thing to test.
# @param [message] {string} An optional error message
#                           to set on the thrown Error.
#
verifyArray = (thing, message) ->
  if isArray(thing) is false
    throw new Error message || 'Invalid array'

##
# Public function `isArray`.
#
# Returns `true` something is an array, `false` otherwise.
#
# @param thing          The thing to test.
#
isArray = (thing) ->
  if Object.prototype.toString.call(thing) is '[object Array]'
    return true
  false

##
# Public function `verifyFunction`.
#
# Throws an exception unless something is function.
#
# @param thing              The thing to test.
# @param [message] {string} An optional error message
#                           to set on the thrown Error.
#
verifyFunction = (thing, message) ->
  if isFunction(thing) is false
    throw new Error message || 'Invalid function'

##
# Public function `isFunction`.
#
# Returns `true` if something is function, `false` otherwise.
#
# @param thing          The thing to test.
#
isFunction = (thing) ->
  if typeof thing is 'function'
    return true
  false

##
# Public function `verifyUnemptyString`.
#
# Throws an exception unless something is a non-empty string.
#
# @param thing              The thing to test.
# @param [message] {string} An optional error message
#                           to set on the thrown Error.
#
verifyUnemptyString = (thing, message) ->
  if isUnemptyString(thing) is false
    throw new Error message || 'Invalid string'

##
# Public function `isUnemptyString`.
#
# Returns `true` if something is a non-empty string, `false`
# otherwise.
#
# @param thing          The thing to test.
#
isUnemptyString = (thing) ->
  if isString(thing) and thing isnt ''
    return true
  false

##
# Public function `verifyString`.
#
# Throws an exception unless something is a string.
#
# @param thing              The thing to test.
# @param [message] {string} An optional error message
#                           to set on the thrown Error.
#
verifyString = (thing, message) ->
  if isString(thing) is false
    throw new Error message || 'Invalid string'

##
# Public function `isString`.
#
# Returns `true` if something is a string, `false` otherwise.
#
# @param thing          The thing to test.
#
isString = (thing) ->
  if typeof thing is 'string'
    return true
  false

##
# Public function `verifyNumber`.
#
# Throws an exception unless something is a number (also excluding NaN).
#
# @param thing              The thing to test.
# @param [message] {string} An optional error message
#                           to set on the thrown Error.
#
verifyNumber = (thing, message) ->
  if isNumber(thing) is false
    throw new Error message || 'Invalid number'

##
# Public function `isNumber`.
#
# Returns `true` if something a number other than NaN, `false` otherwise.
#
# @param thing          The thing to test.
#
isNumber = (thing) ->
  if isNaN(thing) is true
    return false
  if typeof thing is 'number'
    return true
  false

module.exports = {
  quacksLike
  verifyInstance
  isInstance
  verifyObject
  isObject
  verifyArray
  isArray
  verifyFunction
  isFunction
  verifyUnemptyString
  isUnemptyString
  verifyString
  isString
  verifyNumber
  isNumber
}

