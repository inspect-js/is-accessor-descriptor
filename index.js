'use strict';

var typeOf = require('kind-of');

var has = function hasOwn(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
};

// accessor descriptor properties
var accessor = {
	configurable: 'boolean',
	enumerable: 'boolean',
	get: 'function',
	set: 'function'
};

module.exports = function isAccessorDescriptor(obj, prop) {
	if (typeof prop === 'string') {
		var val = Object.getOwnPropertyDescriptor(obj, prop);
		return typeof val !== 'undefined';
	}

	if (typeOf(obj) !== 'object') {
		return false;
	}

	if (has(obj, 'value') || has(obj, 'writable')) {
		return false;
	}

	if (!has(obj, 'get') || typeof obj.get !== 'function') {
		return false;
	}

	/*
	 * tldr: it's valid to have "set" be undefined
	 * "set" might be undefined if `Object.getOwnPropertyDescriptor`
	 * was used to get the value, and only `get` was defined by the user
	 */
	if (has(obj, 'set') && typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined') {
		return false;
	}

	for (var key in obj) { // eslint-disable-line no-restricted-syntax
		if (
			has(accessor, key)
			&& typeOf(obj[key]) !== accessor[key]
			&& typeof obj[key] !== 'undefined'
		) {
			return false;
		}
	}
	return true;
};
