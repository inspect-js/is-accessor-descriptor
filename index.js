'use strict';

var typeOf = require('kind-of');
var hasOwn = require('hasown');

// accessor descriptor properties
var accessor = {
	__proto__: null,
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

	if (hasOwn(obj, 'value') || hasOwn(obj, 'writable')) {
		return false;
	}

	if (!hasOwn(obj, 'get') || typeof obj.get !== 'function') {
		return false;
	}

	/*
	 * tldr: it's valid to have "set" be undefined
	 * "set" might be undefined if `Object.getOwnPropertyDescriptor`
	 * was used to get the value, and only `get` was defined by the user
	 */
	if (hasOwn(obj, 'set') && typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined') {
		return false;
	}

	for (var key in obj) { // eslint-disable-line no-restricted-syntax
		if (hasOwn(obj, key)) {
			if (!hasOwn(accessor, key)) {
				continue; // eslint-disable-line no-restricted-syntax, no-continue
			}

			if (typeOf(obj[key]) === accessor[key]) {
				continue; // eslint-disable-line no-restricted-syntax, no-continue
			}

			if (typeof obj[key] !== 'undefined') {
				return false;
			}
		}
	}
	return true;
};
