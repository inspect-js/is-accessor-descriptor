'use strict';

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
	) {
		return false;
	}

	for (var key in obj) { // eslint-disable-line no-restricted-syntax
		if (
			hasOwn(obj, key)
			&& hasOwn(accessor, key)
			&& typeof obj[key] !== accessor[key]
			&& typeof obj[key] !== 'undefined'
		) {
			return false;
		}
	}
	return true;
};
