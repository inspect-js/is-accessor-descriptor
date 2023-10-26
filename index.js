'use strict';

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
	) {
		return false;
	}

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
		}
	}
	return true;
};
