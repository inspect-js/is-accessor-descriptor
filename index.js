'use strict';

<<<<<<< .merge_file_ESYIpc
var hasOwn = require('hasown');
var isObject = function (val) {
	return val !== null && typeof val === 'object' && !Array.isArray(val);
};

module.exports = function isAccessorDescriptor(obj, key, checkProto) {
	if (!isObject(obj)) {
		return false;
	}

	var desc = arguments.length > 1 ? Object.getOwnPropertyDescriptor(obj, key) : obj;
	if (arguments.length > 1 && !desc && checkProto !== false) {
		obj = obj.constructor.prototype;
		desc = Object.getOwnPropertyDescriptor(obj, key);
	}

	if (!isObject(desc)) {
		return false;
	}

	if (
		!hasOwn(desc, 'get')
		|| !hasOwn(desc, 'set')
		|| !hasOwn(desc, 'enumerable')
		|| !hasOwn(desc, 'configurable')
=======
var gOPD = require('gopd');
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
		return gOPD ? isAccessorDescriptor(gOPD(obj, prop)) : hasOwn(obj, prop);
	}

	if (
		!obj
		|| typeof obj !== 'object'
		|| hasOwn(obj, 'value')
		|| hasOwn(obj, 'writable')
		|| (hasOwn(obj, 'get') && typeof obj.get !== 'function' && typeof obj.get !== 'undefined')
		|| (hasOwn(obj, 'set') && typeof obj.set !== 'function' && typeof obj.set !== 'undefined')
		|| !(
			(hasOwn(obj, 'get') && typeof obj.get === 'function')
			|| (hasOwn(obj, 'set') && typeof obj.set === 'function')
		)
>>>>>>> .merge_file_5gBVbH
	) {
		return false;
	}

<<<<<<< .merge_file_ESYIpc
	for (var descKey in desc) { // eslint-disable-line no-restricted-syntax
		if (hasOwn(desc, descKey)) {
			if (
				descKey !== 'get'
				&& descKey !== 'set'
				&& descKey !== 'enumerable'
				&& descKey !== 'configurable'
			) {
				return false;
			}

			var val = desc[descKey];
			if (descKey === 'get' || descKey === 'set') {
				if (typeof val !== 'undefined' && typeof val !== 'function') {
					return false;
				}
			} else if (typeof val !== 'boolean') {
				return false;
			}
=======
	for (var key in obj) { // eslint-disable-line no-restricted-syntax
		if (
			hasOwn(obj, key)
			&& hasOwn(accessor, key)
			&& typeof obj[key] !== accessor[key]
			&& typeof obj[key] !== 'undefined'
		) {
			return false;
>>>>>>> .merge_file_5gBVbH
		}
	}
	return true;
};
