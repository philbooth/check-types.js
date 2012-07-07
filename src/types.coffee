'use strict'

verifyUnemptyString = (arg, msg) ->
  if isUnemptyString(arg) is false
    throw new Error msg || 'Invalid string'

isUnemptyString = (arg) ->
  if isString(arg) and arg isnt ''
    return true
  false

verifyString = (arg, msg) ->
  if isString(arg) is false
    throw new Error msg || 'Invalid string'

isString = (arg) ->
  if typeof arg is 'string'
    return true
  false

verifyObject = (arg, msg) ->
  if isObject(arg) is false
    throw new Error msg || 'Invalid object'

isObject = (arg) ->
  if typeof arg is 'object' and arg isnt null and isArray(arg) is false
    return true
  false

verifyArray = (arg, msg) ->
  if isArray(arg) is false
    throw new Error msg || 'Invalid array'

isArray = (arg) ->
  if Object.prototype.toString.call(arg) is '[object Array]'
    return true
  false

verifyFunction = (arg, msg) ->
  if isFunction(arg) is false
    throw new Error msg || 'Invalid function'

isFunction = (arg) ->
  if typeof arg is 'function'
    return true
  false

verifyInstance = (arg, prototype, msg) ->
  if isInstance(arg, prototype) is false
    throw new Error msg || 'Invalid type'

isInstance = (arg, prototype) ->
  if typeof arg is 'undefined' or arg is null
    return false
  if isFunction(prototype) and arg instanceof prototype
    return true
  false

quacksLike = (arg, duck) ->
  verifyObject arg
  verifyObject duck
  for own property of duck
    if arg.hasOwnProperty(property) isnt true
      return false
    if typeof arg[property] isnt typeof duck[property]
      return false
  true

module.exports = {
  verifyUnemptyString
  isUnemptyString
  verifyString
  isString
  verifyObject
  isObject
  verifyArray
  isArray
  verifyFunction
  isFunction
  verifyInstance
  isInstance
  quacksLike
}

