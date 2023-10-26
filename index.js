'use strict';

var typeOf = require('kind-of');

var has = function hasOwn(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
};

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

	if (
		typeOf(obj) !== 'object'
		|| has(obj, 'value')
		|| has(obj, 'writable')
		|| (has(obj, 'get') && typeof obj.get !== 'function' && typeof obj.get !== 'undefined')
		|| (has(obj, 'set') && typeof obj.set !== 'function' && typeof obj.set !== 'undefined')
		|| !(
			(has(obj, 'get') && typeof obj.get === 'function')
			|| (has(obj, 'set') && typeof obj.set === 'function')
		)
	) {
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
