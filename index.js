/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

// accessor descriptor properties
var accessor = {
  get: 'function',
  set: 'function',
  configurable: 'boolean',
  enumerable: 'boolean'
};

function isAccessorDescriptor(obj) {
  if (utils.typeOf(obj) !== 'object') {
    return false;
  }

  var accessorKeys = Object.keys(accessor);
  var keys = getKeys(obj);

  if (obj.hasOwnProperty('set')) {
    if (utils.typeOf(obj.set) !== 'function') {
      return false;
    }
  }

  if (obj.hasOwnProperty('get')) {
    if (utils.typeOf(obj.get) !== 'function') {
      return false;
    }
  }

  if (utils.diff(keys, accessorKeys).length !== 0) {
    return false;
  }

  for (var key in obj) {
    if (key === 'value') continue;
    if (utils.typeOf(obj[key]) !== accessor[key]) {
      return false;
    }
  }
  return true;
}

/**
 * Get object keys. `Object.keys()` only gets
 * enumerable properties.
 */

function getKeys(obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

/**
 * Expose `isAccessorDescriptor`
 */

module.exports = isAccessorDescriptor;
