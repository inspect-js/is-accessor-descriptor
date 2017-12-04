/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var typeOf = require('kind-of');

function isAccessorDescriptor(obj, prop, checkProto) {
  if (typeof prop === 'boolean') {
    checkProto = prop;
    prop = null;
  }
  if (typeof prop === 'string') {
    return isGetterSetter(obj, prop, checkProto);
  }
  return looksLikeGetterSetter(obj);
}

function isGetterSetter(obj, key, checkProto) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, key);
  if (descriptor) {
    return looksLikeGetterSetter(descriptor);
  }
  if (checkProto !== false && obj.constructor && obj.constructor.prototype) {
    return isGetterSetter(obj.constructor.prototype, key, false);
  }
  return false;
}

function looksLikeGetterSetter(descriptor) {
  if (typeOf(descriptor) !== 'object') {
    return false;
  }

  const keys = Object.keys(descriptor);
  const len = keys.length;

  const validKeys = {
    get: 'function',
    set: 'function',
    enumerable: 'boolean',
    configurable: 'boolean'
  };

  if (len !== 4) return false;
  for (let i = 0; i < len; i++) {
    const key = keys[i];
    if (!validKeys.hasOwnProperty(key)) {
      return false;
    }
    const val = descriptor[key];
    if (val != null && typeOf(val) !== validKeys[key]) {
      return false;
    }
  }
  return true;
}

function isValidType(obj, key) {
  return typeof obj[key] === 'function' || typeof obj[key] === 'undefined';
}

/**
 * Expose `isAccessorDescriptor`
 */

module.exports = isAccessorDescriptor;
