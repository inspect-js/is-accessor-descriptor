'use strict';

var hasOwn = function (obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
};
var isObject = function (val) {
	return val !== null && typeof val === 'object' && !Array.isArray(val);
};

module.exports = function isAccessorDescriptor(obj, key, checkProto) {
	if (!isObject(obj)) {
		return false;
	}

	var desc = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;
	if (key && !desc && checkProto !== false) {
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
