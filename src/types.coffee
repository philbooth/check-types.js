'use strict'

quacksLike = (thing, duck) ->
  verifyObject thing
  verifyObject duck
  for own property of duck
    if thing.hasOwnProperty(property) isnt true
      return false
    if typeof thing[property] isnt typeof duck[property]
      return false
  true

verifyInstance = (thing, prototype, msg) ->
  if isInstance(thing, prototype) is false
    throw new Error msg || 'Invalid type'

isInstance = (thing, prototype) ->
  if typeof thing is 'undefined' or thing is null
    return false
  if isFunction(prototype) and thing instanceof prototype
    return true
  false

verifyObject = (thing, msg) ->
  if isObject(thing) is false
    throw new Error msg || 'Invalid object'

isObject = (thing) ->
  if typeof thing is 'object' and thing isnt null and isArray(thing) is false
    return true
  false

verifyArray = (thing, msg) ->
  if isArray(thing) is false
    throw new Error msg || 'Invalid array'

isArray = (thing) ->
  if Object.prototype.toString.call(thing) is '[object Array]'
    return true
  false

verifyFunction = (thing, msg) ->
  if isFunction(thing) is false
    throw new Error msg || 'Invalid function'

isFunction = (thing) ->
  if typeof thing is 'function'
    return true
  false

verifyUnemptyString = (thing, msg) ->
  if isUnemptyString(thing) is false
    throw new Error msg || 'Invalid string'

isUnemptyString = (thing) ->
  if isString(thing) and thing isnt ''
    return true
  false

verifyString = (thing, msg) ->
  if isString(thing) is false
    throw new Error msg || 'Invalid string'

isString = (thing) ->
  if typeof thing is 'string'
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
}

